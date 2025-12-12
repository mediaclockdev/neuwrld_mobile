import Toast from 'react-native-toast-message';

export const ToastService = {
  success: (title = 'Success', message = '') => {
    Toast.show({
      type: 'success',
      text1: title,
      text2: message,
      position: 'bottom',
      visibilityTime: 3000,
      autoHide: true,
    });
  },

  error: (title = 'Error', message = '') => {
    Toast.show({
      type: 'error',
      text1: title,
      text2: message,
      position: 'bottom',
      visibilityTime: 4000,
      autoHide: true,
    });
  },

  info: (title = 'Info', message = '') => {
    Toast.show({
      type: 'info',
      text1: title,
      text2: message,
      position: 'bottom',
      visibilityTime: 3500,
      autoHide: true,
    });
  },

  hide: () => Toast.hide(),
};
