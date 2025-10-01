// utils/responsive.js
import { Dimensions, PixelRatio, Platform } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Device dimensions
const { width, height } = Dimensions.get('window');

// Base guideline sizes (iPhone 11)
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

// Width & Height scale
const scale = (size) => (width / guidelineBaseWidth) * size;
const verticalScale = (size) => (height / guidelineBaseHeight) * size;

// Moderate scale (adjustable)
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const moderateVerticalScale = (size, factor = 0.5) =>
  size + (verticalScale(size) - size) * factor;

// Responsive font size (based on width)
const responsiveFontSize = (size, factor = 0.5) =>
  size + (PixelRatio.getFontScale() * (scale(size) - size)) * factor;

// Responsive radius
const responsiveRadius = (size, factor = 0.5) => moderateScale(size, factor);

// Export aliases
export const s = scale; // width, horizontal padding, margin, border radius
export const vs = verticalScale; // height, vertical padding/margin
export const ms = moderateScale; // font size, moderate width
export const mvs = moderateVerticalScale; // moderate height
export const rfs = responsiveFontSize; // font sizes
export const rr = responsiveRadius; // border radius
export { wp, hp }; // ✅ Exporting from the library


export default {
  s,
  vs,
  ms,
  mvs,
  rfs,
  rr,
  wp,
  hp,
};


// | Function | Use Case                                        |
// | -------- | ----------------------------------------------- |
// | `s()`    | width, horizontal padding/margin, border radius |
// | `vs()`   | height, vertical padding/margin                 |
// | `ms()`   | font size, component width with smoothing       |
// | `mvs()`  | component height with smoothing                 |
// | `rfs()`  | responsive font size with font scale support    |
// | `rr()`   | responsive border radius                        |
// | `wp()`   | width in percentage of screen                   |
// | `hp()`   | height in percentage of screen                  |
