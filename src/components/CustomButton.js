import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import {useTheme} from '../context/ThemeContext';
import { ms, vs } from '../utils/responsive';
import { fontFamily, fontSizes } from '../theme/typography';

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
        <ActivityIndicator size={'small'} color={textColor} />
      ) : (
        <Text style={[styles.text, {color: textColor}]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: vs(40),
    borderRadius: ms(6),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  text: {
    fontSize: fontSizes.base,
    fontFamily:fontFamily.playfair_black,
  },
});

export default CustomButton;
