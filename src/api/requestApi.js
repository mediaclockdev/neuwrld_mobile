// services/postApi.js
import { apiRequest } from './apiRequest';

/**
 * keep same signature: postApi(url, body, isForm)
 * We return the axios response so existing code expecting response?.data continues to work.
 *
 * extraOptions can be provided via body.__apiOptions (optional) for retries, queueIfOffline etc.
 */
export async function postApi(url, body = {}, isForm = false) {
  // allow callers to pass __apiOptions in body if needed
  const apiOptions = body && body.__apiOptions ? body.__apiOptions : {};
  // remove internal key before sending
  if (body && body.__apiOptions) delete body.__apiOptions;

  const res = await apiRequest({
    method: 'POST',
    url,
    data: body,
    isFormData: !!isForm,
    ...apiOptions,
  });

  return res; // axios response
}
