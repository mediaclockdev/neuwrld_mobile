import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import {useTheme} from '../context/ThemeContext';

const CustomButton = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  backgroundColor, // Orange shade
  textColor = '#fff',
  btnStyle,
  leftIcon,
  leftIconStyle,
}) => {
  const {theme} = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        btnStyle,
        {
          backgroundColor: disabled
            ? '#ccc'
            : backgroundColor
            ? backgroundColor
            : theme.buttonBackground,
        },
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}>
      {leftIcon ? <Image source={leftIcon} style={leftIconStyle} /> : null}

      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text style={[styles.text, {color: textColor}]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CustomButton;
