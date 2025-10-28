// // services/postApi.js
// import { apiRequest } from './apiRequest';

// /**
//  * keep same signature: postApi(url, body, isForm)
//  * We return the axios response so existing code expecting response?.data continues to work.
//  *
//  * extraOptions can be provided via body.__apiOptions (optional) for retries, queueIfOffline etc.
//  */
// export async function postApi(url, body = {}, isForm = false) {
//   // allow callers to pass __apiOptions in body if needed
//   const apiOptions = body && body.__apiOptions ? body.__apiOptions : {};
//   // remove internal key before sending
//   if (body && body.__apiOptions) delete body.__apiOptions;

//   const res = await apiRequest({
//     method: 'POST',
//     url,
//     data: body,
//     isFormData: !!isForm,
//     ...apiOptions,
//   });

//   return res; // axios response
// }

// export async function getAPi(url, body = {}, isForm = false) {
//   // allow callers to pass __apiOptions in body if needed
//   const apiOptions = body && body.__apiOptions ? body.__apiOptions : {};
//   // remove internal key before sending
//   if (body && body.__apiOptions) delete body.__apiOptions;

//   const res = await apiRequest({
//     method: 'GET',
//     url,
//     data: body,
//     isFormData: !!isForm,
//     ...apiOptions,
//   });

//   return res; // axios response
// }

import axios from 'axios';
import api, {API_BASE_URL} from './apiClient';

export async function postApi(url, body, isForm) {
  const response = await axios({
    method: 'POST',
    baseURL: API_BASE_URL,
    url: url,
    data: body,
    headers: {
      'Content-Type': isForm ? 'multipart/form-data' : 'application/json',
      Authorization: 'Bearer ',
    },
  });

  return response;
}

export async function getApi(url) {
  console.log('urlurl',url)
  const response = await axios({
    method: 'GET',
    baseURL: API_BASE_URL,
    url: url,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ',
    },
  });
console.log("response",response)
  return response;
}
