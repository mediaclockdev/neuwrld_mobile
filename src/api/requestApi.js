import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import { API_BASE_URL } from './apiClient';
import { ToastService } from '../utils/toastService';
import { showToast } from '../utils/customToast';
import { getToken } from '../utils/authStorage';

// -------------------------------------------------------------
// ✅ Create reusable axios instance
// -------------------------------------------------------------
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
  headers: { 'Content-Type': 'application/json' },
});

// -------------------------------------------------------------
// ✅ Safe Toast Helper
// -------------------------------------------------------------
function safeToast(type, title, message) {
  try {
    showToast({ type, title, message });
  } catch (_) {
    try {
      ToastService.error(title, message);
    } catch (err) {
      console.warn("⚠️ Toast error ignored:", err);
    }
  }
}

// -------------------------------------------------------------
// ✅ Network Check
// -------------------------------------------------------------
async function ensureOnline() {
  const state = await NetInfo.fetch();
  return !!state.isConnected;
}

// -------------------------------------------------------------
// ✅ Attach Token Before Request
// -------------------------------------------------------------
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      console.warn("⚠️ Token fetch failed:", err);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// -------------------------------------------------------------
// ✅ Universal Axios Error Handler (NEVER breaks)
// -------------------------------------------------------------
function handleAxiosError(error, method, url) {
  console.log(`\n🔴 [${method}] Error at ${url}`);
  console.log("FULL ERROR:", JSON.stringify(error, null, 2));

  let message = "Unexpected error occurred.";

  if (error.code === 'ECONNABORTED') {
    message = "Request timed out.";
    safeToast("error", "Timeout", message);
  }

  // Server responded with error
  else if (error.response) {
    const status = error.response.status;
    const dataMsg = error.response.data?.message;

    switch (status) {
      case 400:
        message = dataMsg || "Bad request.";
        break;
      case 401:
        message = "Session expired. Please login again.";
        break;
      case 403:
        message = "Forbidden request.";
        break;
      case 404:
        message = "URL not found on server.";
        break;
      case 500:
      case 502:
      case 503:
        message = "Server error. Try later.";
        break;
      default:
        message = dataMsg || "Something went wrong.";
    }

    safeToast("error", "Error", message);
  }

  // Request was sent but no response
  else if (error.request) {
    message = "No response from server.";
    safeToast("error", "No Response", message);
  }

  // Something else
  else {
    message = error.message || "Unknown Error.";
    safeToast("error", "Error", message);
  }

  throw error; // important for saga
}

// -------------------------------------------------------------
// 🔁 Auto Retry (1 retry max)
// -------------------------------------------------------------
async function autoRetry(fn, retries = 1, delay = 2000) {
  let lastErr;

  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;

      const retryAllowed =
        !err.response || err.code === 'ECONNABORTED';

      if (!retryAllowed || i === retries) break;

      console.log("🔄 Retrying request in", delay, "ms...");
      await new Promise((res) => setTimeout(res, delay));
    }
  }

  throw lastErr;
}

// -------------------------------------------------------------
// 📌 POST API
// -------------------------------------------------------------
export async function postApi(url, body = {}, isForm = false) {
  if (!url || typeof url !== "string") {
    throw new Error("Invalid URL passed to postApi");
  }

  const isOnline = await ensureOnline();
  if (!isOnline) {
    safeToast("error", "Offline", "No Internet connection.");
    throw new Error("Offline");
  }

  const headers = {
    ...(isForm
      ? { "Content-Type": "multipart/form-data" }
      : { "Content-Type": "application/json" }),
  };

  const call = () => axiosInstance.post(url, body, { headers });

  try {
    const response = await autoRetry(call, 1);
    return response?.data;
  } catch (err) {
    handleAxiosError(err, "POST", url);
  }
}

// -------------------------------------------------------------
// 📌 GET API
// -------------------------------------------------------------
export async function getApi(url, params = {}) {
  if (!url || typeof url !== "string") {
    throw new Error("Invalid URL passed to getApi");
  }

  const isOnline = await ensureOnline();
  if (!isOnline) {
    safeToast("error", "Offline", "No Internet connection.");
    throw new Error("Offline");
  }

  const call = () => axiosInstance.get(url, { params });

  try {
    const response = await autoRetry(call, 1);
    return response?.data;
  } catch (err) {
    handleAxiosError(err, "GET", url);
  }
}

// -------------------------------------------------------------
// 🟢 Network Listener (Optional Debug)
// -------------------------------------------------------------
NetInfo.addEventListener((state) => {
  if (state.isConnected) {
    console.log("📶 Network restored – API ready.");
  }
});
