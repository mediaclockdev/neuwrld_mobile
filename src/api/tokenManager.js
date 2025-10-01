// services/tokenManager.js
import { getRefreshToken, getToken, removeRefreshToken, removeToken, setRefreshToken, setToken } from '../utils/authStorage';

const TOKEN_KEY = 'authToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

let refreshPromise = null;

export const getUserToken = async () => {
  return getToken(TOKEN_KEY);
};

export const setUserToken = async (token) => {
  if (token) await setToken(TOKEN_KEY, token);
  else await removeToken(TOKEN_KEY);
};

export const getUserRefreshToken = async () => {
  return getRefreshToken(REFRESH_TOKEN_KEY);
};

export const setUserRefreshToken = async (rt) => {
  if (rt) await setRefreshToken(REFRESH_TOKEN_KEY, rt);
  else await removeRefreshToken(REFRESH_TOKEN_KEY);
};

/**
 * refreshFn is a function that accepts refreshToken and returns
 * { token, refreshToken? } by calling your backend.
 * Single-flight: concurrent callers get the same promise.
 */
export const refreshAuthToken = async (refreshFn) => {
  if (refreshPromise) return refreshPromise;
  refreshPromise = (async () => {
    try {
      const rt = await getUserRefreshToken();
      if (!rt) throw new Error('NO_REFRESH_TOKEN');

      const res = await refreshFn(rt);
      if (!res || !res.token) throw new Error('REFRESH_FAILED');

      await setUserToken(res.token);
      if (res.refreshToken) await setUserRefreshToken(res.refreshToken);
      return res.token;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};
