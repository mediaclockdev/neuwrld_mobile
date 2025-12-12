import { setItem, getItem, removeItem, clearAll } from './storage'; // Your base MMKV or AsyncStorage wrapper

// Storage keys
const KEYS = {
  USER: 'user',
  TOKEN: 'authToken',
  REFRESH_TOKEN: 'refreshToken',
  IS_LOGGED_IN: 'isLoggedIn',
};

/* ==========================================================
   USER HANDLING
========================================================== */

// Save user object
export const setUser = (user) => {
  if (user) {
    setItem(KEYS.USER, JSON.stringify(user));
    setItem(KEYS.IS_LOGGED_IN, true);
  }
};

// Get user object
export const getUser = async () => {
    return await getItem(KEYS.USER);
};

// Remove user
export const removeUser = () => {
  removeItem(KEYS.USER);
  removeItem(KEYS.IS_LOGGED_IN);
};

/* ==========================================================
   TOKEN HANDLING
========================================================== */

// Save token
export const setToken = (token) => {
  if (token) setItem(KEYS.TOKEN, token);
};

// Get token
export const getToken = async () => {
  return await getItem(KEYS.TOKEN);
};

// Remove token
export const removeToken = () => {
  removeItem(KEYS.TOKEN);
};

// Save refresh token
export const setRefreshToken = (refreshToken) => {
  if (refreshToken) setItem(KEYS.REFRESH_TOKEN, refreshToken);
};

// Get refresh token
export const getRefreshToken = async () => {
  return await getItem(KEYS.REFRESH_TOKEN);
};

// Remove refresh token
export const removeRefreshToken = () => {
  removeItem(KEYS.REFRESH_TOKEN);
};

/* ==========================================================
   AUTH STATE MANAGEMENT
========================================================== */

// Clear only auth-related data
export const clearAuth = () => {
  removeUser();
  removeToken();
  removeRefreshToken();
  removeItem(KEYS.IS_LOGGED_IN);
};

// Check if user is logged in
export const isLoggedIn = async () => {
  const loggedIn = await getItem(KEYS.IS_LOGGED_IN);
  return loggedIn === true || loggedIn === 'true';
};

// Logout (clear all auth data)
export const logout = () => {
  clearAuth();
  console.log('🚪 Logged out successfully, auth cleared.');
};
