// typography.js
import {StyleSheet} from 'react-native';
import {wp, hp, rfs, s, ms, mvs, vs, rr} from '../utils/responsive';
const FONT_FAMILY = {
  // Poppins
  poppins_black: "Poppins-Black",
  poppins_blackItalic: "Poppins-BlackItalic",
  poppins_bold: "Poppins-Bold",
  poppins_boldItalic: "Poppins-BoldItalic",
  poppins_extraBold: "Poppins-ExtraBold",
  poppins_extraBoldItalic: "Poppins-ExtraBoldItalic",
  poppins_extraLight: "Poppins-ExtraLight",
  poppins_extraLightItalic: "Poppins-ExtraLightItalic",
  poppins_italic: "Poppins-Italic",
  poppins_light: "Poppins-Light",
  poppins_lightItalic: "Poppins-LightItalic",
  poppins_medium: "Poppins-Medium",
  poppins_mediumItalic: "Poppins-MediumItalic",
  poppins_regular: "Poppins-Regular",
  poppins_semiBold: "Poppins-SemiBold",
  poppins_semiBoldItalic: "Poppins-SemiBoldItalic",
  poppins_thin: "Poppins-Thin",
  poppins_thinItalic: "Poppins-ThinItalic",

  // Playfair Display
  playfair_black: "PlayfairDisplay-Black",
  playfair_blackItalic: "PlayfairDisplay-BlackItalic",
  playfair_bold: "PlayfairDisplay-Bold",
  playfair_boldItalic: "PlayfairDisplay-BoldItalic",
  playfair_extraBold: "PlayfairDisplay-ExtraBold",
  playfair_extraBoldItalic: "PlayfairDisplay-ExtraBoldItalic",
  playfair_italic: "PlayfairDisplay-Italic",
  playfair_medium: "PlayfairDisplay-Medium",
  playfair_mediumItalic: "PlayfairDisplay-MediumItalic",
  playfair_regular: "PlayfairDisplay-Regular",
  playfair_semiBold: "PlayfairDisplay-SemiBold",
  playfair_semiBoldItalic: "PlayfairDisplay-SemiBoldItalic",
};


const FONT_SIZE = {
  xs: rfs(10),
  sm: rfs(12),
  base: rfs(14),
  lg: rfs(16),
  xl: rfs(20),
  xxl: rfs(24),
};

// Optional: export constants if you want to use inline
export const fontSizes = FONT_SIZE;
export const fontFamily = FONT_FAMILY;
