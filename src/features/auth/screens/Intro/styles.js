import {Dimensions, StyleSheet} from 'react-native';
import {wp, hp, rfs, s, ms, mvs, vs, rr} from '../../../../utils/responsive';
import {fontFamily, fontSizes} from '../../../../theme/typography';
import {colors} from '../../../../theme/colors';
const {width, height} = Dimensions.get('window');

const IMAGE_LEFT_HEIGHT = vs(380); // scales height responsively
const IMAGE_RIGHT_SIZE = ms(165); // scales width responsively

export const createStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme?.background,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },

    topImagesRow: {
      width: width - 32,
      marginTop: vs(40),
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    leftTallImageWrapper: {
      flex: 1,
      marginRight: ms(15),
      borderRadius: rr(30),
      overflow: 'hidden',
      height: IMAGE_LEFT_HEIGHT,
      backgroundColor: '#e9e5e2',
    },
    leftTallImage: {
      width: '100%',
      height: '100%',
    },
    rightColumn: {
      width: IMAGE_RIGHT_SIZE,
      alignItems: 'center',
    },
    rightCircleWrapper: {
      width: IMAGE_RIGHT_SIZE,
      height: IMAGE_RIGHT_SIZE,
      borderRadius: IMAGE_RIGHT_SIZE / 2,
      overflow: 'hidden',
      backgroundColor: '#e9e5e2',
    },
    rightCircleImage: {
      width: '100%',
      height: '100%',
    },
    contentArea: {
      width: width - 48,
      marginTop: vs(18),
      alignItems: 'center',
      paddingBottom: vs(32),
    },
    headline: {
      textAlign: 'center',
      fontSize: fontSizes.xxl,
      lineHeight: 36,
      marginVertical: vs(12),
      fontFamily: fontFamily.playfair_semiBold,
      color: theme.text,
    },
    headlineBase: {
      color: theme.text,
      fontFamily: fontFamily.playfair_semiBold,
    },
    headlineAccent: {
      color: theme.primary_color,
      fontFamily: fontFamily.playfair_semiBold,
    },
    subtext: {
      textAlign: 'center',
      fontSize: fontSizes.sm,
      lineHeight: 20,
      color: '#646464',
      fontFamily: fontFamily.poppins_regular,
      marginVertical: 20,
    },
    ctaButton: {
      width: '100%',
      backgroundColor: theme.primary_color,
      paddingVertical: 16,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: theme.text,
      shadowOffset: {width: 0, height: 6},
      shadowOpacity: 0.12,
      shadowRadius: 12,
      elevation: 6,
      marginBottom: 14,
    },
    ctaText: {
      color: colors.cream,
      fontSize: fontSizes.base,
      fontFamily: fontFamily.poppins_semiBold,
    },
    signInRow: {
      marginTop: 4,
    },
    signInText: {
      fontFamily: fontFamily.poppins_medium,
      color: theme.text,
      fontSize: 14,
    },
    signInLink: {
      color: theme.primary_color,
      textDecorationLine: 'underline',
      fontFamily: fontFamily.poppins_medium,
    },


  });
