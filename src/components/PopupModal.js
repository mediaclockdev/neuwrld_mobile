import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Modal from 'react-native-modal';
import {rr, s, vs} from '../utils/responsive'; // your responsive helpers
import {fontFamily, fontSizes} from '../theme/typography';
import {useTheme} from '../context/ThemeContext';
import { ICONS } from '../theme/colors';

// Example icons (replace with your own assets)
const ALL_ICONS = {
  success: ICONS.success,
  error: ICONS.error,
  warning: ICONS.warning,
  info: ICONS.info,
};

const PopupModal = ({
  isVisible,
  type = 'info', // success | error | warning | info
  title = '',
  message = '',
  onConfirm,
  hidecancel,
  onCancel,
  confirmText = 'OK',
  cancelText = 'Cancel',
  showCancel = false,
  backdropPressToClose = true,
}) => {
  const {theme} = useTheme();

  const getIcon = () => {
    switch (type) {
      case 'success':
        return ALL_ICONS.success;
      case 'error':
        return ALL_ICONS.error;
      case 'warning':
        return ALL_ICONS.warning;
      default:
        return ALL_ICONS.info;
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={backdropPressToClose ? onCancel : undefined}
      useNativeDriver
      animationIn="zoomIn"
      animationOut="zoomOut"
      backdropOpacity={0.5}
    >
      <View style={[styles.container, {backgroundColor: theme.background}]}>
        <Image source={getIcon()} style={styles.icon} />

        {title ? <Text style={[styles.title, {color: theme.text_color}]}>{title}</Text> : null}

        {message ? (
          <Text style={[styles.message, {color: theme.sub_text}]}>{message}</Text>
        ) : null}

        <View style={styles.buttonRow}>
          {showCancel && (
            <TouchableOpacity style={[styles.button, styles.cancelBtn]} onPress={onCancel}>
              <Text style={styles.cancelText}>{cancelText}</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={[styles.button, {backgroundColor: theme?.buttonBackground}]} onPress={onConfirm}>
            <Text style={styles.confirmText}>{confirmText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PopupModal;

const styles = StyleSheet.create({
  container: {
    borderRadius: rr(12),
    padding: s(20),
    alignItems: 'center',
    
  },
  icon: {
    width: s(80),
    height: vs(80),
    marginBottom: vs(10),
    resizeMode: 'contain',
    borderRadius:100
  },
  title: {
    fontSize: fontSizes.lg,
    fontFamily: fontFamily.poppins_semiBold,
    marginBottom: vs(8),
    textAlign: 'center',
  },
  message: {
    fontSize: fontSizes.base,
    fontFamily: fontFamily.poppins_regular,
    textAlign: 'center',
    marginBottom: vs(20),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: s(12),
  },
  button: {
    paddingVertical: vs(10),
    paddingHorizontal: s(20),
    borderRadius: 10,
  },
  confirmBtn: {
    backgroundColor: '#4CAF50',
  },
  cancelBtn: {
    backgroundColor: '#F5F5F5',
  },
  confirmText: {
    color: 'white',
    fontFamily: fontFamily.poppins_medium,
  },
  cancelText: {
    color: '#333',
    fontFamily: fontFamily.poppins_medium,
  },
});
