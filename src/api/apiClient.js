// // services/apiClient.js
// import axios from 'axios';
// import { getToken, refreshAuthToken } from './tokenManager';

// // replace with your base URL
// export const API_BASE_URL = 'https://maroon-crane-692077.hostingersite.com/nuworld_v3/api/v1/';
// export const IMG_URL = 'https://maroon-crane-692077.hostingersite.com/';
// const api = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 60000,
// });

// // Add token to requests
// api.interceptors.request.use(async (config) => {
//   try {
//     const token = await getToken();
//     if (token) {
//       config.headers = config.headers || {};
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//   } catch (e) {
//     // ignore
//   }
//   return config;
// });

// // Add response interceptor to handle 401 and refresh
// api.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     const originalRequest = error.config;
//     if (!originalRequest) return Promise.reject(error);

//     // handle 401 only once per request
//     if (error.response && error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         // you must replace this with your actual refresh call (see notes)
//         const newToken = await refreshAuthToken(async (refreshToken) => {
//           // default refresh call - replace path/payload as needed
//           const r = await axios.post(`${API_BASE_URL}/auth/refresh`, { refreshToken });
//           return { token: r.data?.token, refreshToken: r.data?.refreshToken };
//         });

//         if (newToken) {
//           originalRequest.headers.Authorization = `Bearer ${newToken}`;
//           return api(originalRequest);
//         }
//       } catch (e) {
//         // refresh failed -> fall through to logout flow (caller should handle 401)
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;

// services/apiClient.js
import axios from 'axios';
import {getToken, refreshAuthToken} from './tokenManager';

// replace with your base URL
export const API_BASE_URL =
  'http://maroon-crane-692077.hostingersite.com/nuworld_v3/api/v1/';
export const IMG_URL = 'http://maroon-crane-692077.hostingersite.com/';
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
});

// Add token to requests
api.interceptors.request.use(async config => {
  try {
    const token = await getToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
    // ignore
  }
  return config;
});

// Add response interceptor to handle 401 and refresh
api.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;
    if (!originalRequest) return Promise.reject(error);

    // handle 401 only once per request
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // you must replace this with your actual refresh call (see notes)
        const newToken = await refreshAuthToken(async refreshToken => {
          // default refresh call - replace path/payload as needed
          const r = await axios.post(`${API_BASE_URL}refresh-token`, {
            refreshToken,
          });
          return {token: r.data?.token, refreshToken: r.data?.refreshToken};
        });

        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        }
      } catch (e) {
        // refresh failed -> fall through to logout flow (caller should handle 401)
      }
    }

    return Promise.reject(error);
  },
);

export default api;
