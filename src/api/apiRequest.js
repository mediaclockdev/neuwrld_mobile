// services/apiRequest.js
import api from './apiClient';
import NetInfo from '@react-native-community/netinfo';
import { enqueueRequest } from './offlineQueue';
import { ApiError } from './errors'; // small helper below

const DEFAULT_RETRIES = 3;
const DEFAULT_RETRY_DELAY = 1000;
const RETRYABLE_STATUS = [408, 429, 500, 502, 503, 504];

function sleep(ms) { return new Promise(res => setTimeout(res, ms)); }
function jitteredDelay(base, attempt) {
  const exp = base * Math.pow(2, attempt - 1);
  const jitter = Math.floor(Math.random() * 300);
  return exp + jitter;
}

const isNetworkError = (err) => !!(err && (!err.response || err.code === 'ENOTFOUND' || err.message?.toLowerCase().includes('network')) );
const isRetryable = (err) => {
  if (!err) return false;
  if (isNetworkError(err)) return true;
  const status = err.response?.status;
  return RETRYABLE_STATUS.includes(status);
};

/**
 * options:
 *  method, url, data, headers, isFormData, onProgress,
 *  retries, queueIfOffline, allowRetryNonIdempotent, signal (AbortController.signal)
 */
export const apiRequest = async (options = {}) => {
  const {
    method = 'GET',
    url,
    data = null,
    headers = {},
    isFormData = false,
    onProgress = null,
    retries = DEFAULT_RETRIES,
    queueIfOffline = false,
    allowRetryNonIdempotent = false,
    signal = null,
    timeout = 60000,
  } = options;

  if (!url) throw new ApiError({ message: 'Missing URL' });

  const net = await NetInfo.fetch();
  if (!net.isConnected) {
    if (queueIfOffline) {
      await enqueueRequest({ method, url, data, headers, isFormData, timeout });
      throw new ApiError({ message: 'No internet. Request queued.', code: 'QUEUED_OFFLINE' });
    } else {
      throw new ApiError({ message: 'No internet connection', code: 'NO_INTERNET' });
    }
  }

  // Do not set Content-Type for FormData; axios will handle boundary
  const config = {
    method,
    url,
    data,
    headers: { ...headers },
    timeout,
    signal,
  };

  if (onProgress) {
    config.onUploadProgress = (ev) => {
      if (!ev || !ev.total) return;
      const percent = Math.round((ev.loaded * 100) / ev.total);
      onProgress(percent);
    };
  }

  // Cancel early if signal is already aborted
  if (signal && signal.aborted) throw new ApiError({ message: 'Request cancelled', code: 'CANCELLED' });

  const idempotentMethods = ['GET', 'HEAD', 'OPTIONS', 'PUT', 'DELETE'];
  const isIdempotent = idempotentMethods.includes(method.toUpperCase());

  let attempt = 0;
  let lastErr = null;
  while (attempt <= retries) {
    attempt++;
    try {
      const resp = await api(config);
      return resp; // callers can use resp.data
    } catch (err) {
      lastErr = err;

      if (err.name === 'CanceledError' || err.code === 'ERR_CANCELED' || (signal && signal.aborted)) {
        throw new ApiError({ message: 'Request cancelled', code: 'CANCELLED', original: err });
      }

      // 429 - respect Retry-After header
      const status = err.response?.status;
      if (status === 429) {
        const ra = err.response?.headers?.['retry-after'];
        let waitMs = DEFAULT_RETRY_DELAY;
        if (ra) {
          const parsed = parseInt(ra, 10);
          if (!isNaN(parsed)) waitMs = parsed * 1000;
        } else {
          waitMs = jitteredDelay(DEFAULT_RETRY_DELAY, attempt);
        }
        if (attempt > retries) break;
        await sleep(waitMs);
        continue;
      }

      if (!isRetryable(err)) break;
      if (!isIdempotent && !allowRetryNonIdempotent) break;

      if (attempt > retries) break;
      await sleep(jitteredDelay(DEFAULT_RETRY_DELAY, attempt));
    }
  }

  // convert axios error -> ApiError
  const message = lastErr?.response?.data?.message || lastErr?.message || 'Request failed';
  const status = lastErr?.response?.status;
  throw new ApiError({ message, status, original: lastErr });
};
