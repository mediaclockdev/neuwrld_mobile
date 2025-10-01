import React, {createContext, useContext, useState, useCallback} from 'react';
import PopupModal from '../components/PopupModal';

const PopupContext = createContext();

export const PopupProvider = ({children}) => {
  const [popup, setPopup] = useState({
    isVisible: false,
    type: 'info',
    title: '',
    message: '',
    confirmText: 'OK',
    cancelText: 'Cancel',
    showCancel: false,
    onConfirm: () => {},
    onCancel: () => {},
  });

  const showPopup = useCallback((options) => {
    setPopup({
      ...popup,
      ...options,
      isVisible: true,
    });
  }, [popup]);

  const hidePopup = useCallback(() => {
    setPopup((prev) => ({...prev, isVisible: false}));
  }, []);

  return (
    <PopupContext.Provider value={{showPopup, hidePopup}}>
      {children}

      {/* Global Popup */}
      <PopupModal
        isVisible={popup.isVisible}
        type={popup.type}
        title={popup.title}
        message={popup.message}
        confirmText={popup.confirmText}
        cancelText={popup.cancelText}
        showCancel={popup.showCancel}
        onConfirm={() => {
          popup?.onConfirm?.();
          hidePopup();
        }}
        onCancel={() => {
          popup?.onCancel?.();
          hidePopup();
        }}
      />
    </PopupContext.Provider>
  );
};

export const usePopup = () => useContext(PopupContext);
