import { ToastService } from './toastService'; // ✅ correct path and case

export const errorHandler = (code, message = '', context = '') => {
  console.log(`🔴 API Error [${context || 'unknown'}]:`, { code, message });
  const msg = message?.trim() || '';

  switch (Number(code)) {
    case 0:
      return ToastService.error('Network Error', 'Please check your connection.');

    case 400:
      return ToastService.error('Bad Request', msg || 'Invalid request. Try again.');

    case 401:
      return ToastService.info('Session Expired', 'Please log in again.');

    case 403:
      return ToastService.error('Access Denied', "You don't have permission.");

    case 404:
      return ToastService.error('Not Found', msg || 'Resource unavailable.');

    case 422:
      return ToastService.error('Invalid Data', msg || 'Please check your inputs.');

    case 500:
      return ToastService.error('Server Error', msg || 'Please try again later.');

    case 503:
      return ToastService.error('Service Unavailable', 'Please try again shortly.');

    default:
      return ToastService.error('Unexpected Error', msg || 'Something went wrong.');
  }
};