import {setItem, getItem, removeItem, clearAll} from './storage';

// Keys for storage
const KEYS = {
  USER: 'user',
  TOKEN: 'authToken',
  REFRESH_TOKEN: 'refreshToken',
  IS_LOGGED_IN: 'isLoggedIn',
};

// Save user object
export const setUser = (user) => {
  setItem(KEYS.USER, user);
  setItem(KEYS.IS_LOGGED_IN, true);
};

// Get user object
export const getUser = () => {
  return getItem(KEYS.USER, null);
};

// Remove user
export const removeUser = () => {
  removeItem(KEYS.USER);
  removeItem(KEYS.IS_LOGGED_IN);
};

// Save token
export const setToken = (token) => {
  setItem(KEYS.TOKEN, token);
};

// Get token
export const getToken = () => {
  return getItem(KEYS.TOKEN, null);
};

// Save refresh token (optional)
export const setRefreshToken = (refreshToken) => {
  setItem(KEYS.REFRESH_TOKEN, refreshToken);
};

// Get refresh token
export const getRefreshToken = () => {
  return getItem(KEYS.REFRESH_TOKEN, null);
};

// Clear only auth-related data (not entire app storage)
export const clearAuth = () => {
  removeUser();
  removeItem(KEYS.TOKEN);
  removeItem(KEYS.REFRESH_TOKEN);
  removeItem(KEYS.IS_LOGGED_IN);
};

// Check if logged in
export const isLoggedIn = () => {
  return getItem(KEYS.IS_LOGGED_IN, false);
};

// Logout (clear everything)
export const logout = () => {
  clearAuth();
};


//example usage:
// import {
//   setUser,
//   getUser,
//   setToken,
//   getToken,
//   isLoggedIn,
//   logout,
// } from '../storage/AuthStorage';

// // Save user + token
// setUser({id: 1, name: 'Saurav'});
// setToken('abc123');

// // Get data
// const user = getUser();
// const token = getToken();
// console.log('User:', user);
// console.log('Token:', token);

// // Check login
// if (isLoggedIn()) {
//   console.log('User is logged in');
// }

// // Logout
// logout();

