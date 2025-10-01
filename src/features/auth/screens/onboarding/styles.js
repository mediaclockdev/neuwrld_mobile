import {Dimensions, StyleSheet} from 'react-native';
import {wp, hp, rfs, s, ms, mvs, vs, rr} from '../../../../utils/responsive';
import {fontFamily, fontSizes} from '../../../../theme/typography';
import {colors} from '../../../../theme/colors';


export const createStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    skipBtn: {
      position: 'absolute',
      top: hp('2%'),
      right: wp('6%'),
      zIndex: 10,
    },
    skipText: {
      fontFamily: fontFamily.poppins_medium,
      fontSize: ms(14),
      color: theme.primary_color,
      
    },
    slide: {
      width: wp('100%'),
      alignItems: 'center',
      justifyContent: 'center',
    },
    phoneImage: {
      width: wp('70%'),
      height: hp('40%'),
      marginTop: hp('8%'),
      backgroundColor: colors.cream,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:rr(20)
    },
    lottie: {
      width: wp('80%'),
      height: hp('30%'),
      marginVertical: ms(10),
    },
    card: {
      width: wp('99%'),
      backgroundColor: '#fff',
      borderRadius: ms(20),
      padding: ms(20),
      alignItems: 'center',
      marginTop: hp('2%'),
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: {width: 0, height: 4},
      shadowRadius: 10,
      elevation: 5,
      height: hp(40),
    },
    title: {
      fontSize: fontSizes.xxl,
      textAlign: 'center',
      marginVertical: vs(12),
      width: wp(70),
      fontFamily: fontFamily.playfair_semiBold,
      color: theme?.text,
    },
    highlight: {
      fontFamily: fontFamily.playfair_semiBold,
      color: theme.primary_color,
    },
    titleText: {
      // fontFamily: FONT_FAMILY.poppins_semiBold,
      // color: colors.secondary,
    },
    subtitle: {
      fontFamily: fontFamily.poppins_regular,
      fontSize: fontSizes.sm,
      color: theme.gray,
      textAlign: 'center',
      marginVertical: ms(15),
    },
    dotsWrapper: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    dot: {
      width: ms(8),
      height: ms(8),
      borderRadius: ms(4),
      backgroundColor: theme.primary_color,
      marginHorizontal: ms(5),
    },
    nextBtn: {
      backgroundColor: theme.primary_color,
      width: ms(50),
      height: ms(50),
      borderRadius: ms(25),
      justifyContent: 'center',
      alignItems: 'center',
    },
    nextArrow: {
      fontSize: ms(22),
      color: theme.background,
      fontFamily: fontFamily.poppins_bold,
    },

    bottomWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'absolute',
      bottom: hp('1%'),
      width:'100%'
    },
  });
