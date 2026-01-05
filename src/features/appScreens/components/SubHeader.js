import {
  StyleSheet,
  Text,
  Image,
  View,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {ms, s} from '../../../utils/responsive';
import {useTheme} from '../../../context/ThemeContext';
import {ICONS, IMAGES} from '../../../theme/colors';
import {fontFamily, fontSizes} from '../../../theme/typography';
import {goBack} from '../../../utils/rootNavigation';

export default function SubHeader({
  onPressRightIcon,
  onPressLeftIcon,
  centerlabel,
  leftIcon,
  rightIcon,
  hideRigthIcon,
}) {
  const {theme} = useTheme();
  const styles = createStyle(theme);

  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        onPress={onPressLeftIcon ? onPressLeftIcon : () => goBack()}
        style={styles.backCircle}>
        <Image source={leftIcon ?? ICONS.back} style={styles.back} />
      </TouchableOpacity>
      <Text style={styles.headerText}>{centerlabel}</Text>
      {hideRigthIcon ? (
        <TouchableOpacity
          onPress={() => {}}
          style={styles.notiContPlaceholder}
        />
      ) : (
        <TouchableOpacity onPress={onPressRightIcon} style={styles.notiCont}>
          <Image source={rightIcon ?? ICONS.bell} style={styles.bell} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const createStyle = theme =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: s(10),
      paddingHorizontal: s(10),
      backgroundColor: '#fff',
      borderBottomWidth: 0,
      // borderBottomColor: '#ddd',
    },
    backCircle: {
      width: s(40),
      height: s(40),
      // marginRight: ms(10),
      backgroundColor: theme?.primary_shade,
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
    },

    back: {
      width: s(22),
      height: s(22),
      tintColor: theme?.primary_color,
      resizeMode: 'contain',
    },
    bell: {
      width: s(22),
      height: s(22),
      tintColor: theme?.primary_color,
      resizeMode: 'contain',
    },
    row: {
      flexDirection: 'row',
      width: '50%',
      alignItems: 'center',
    },
    // headerText: {
    //   fontSize: fontSizes.lg,
    //   fontFamily: fontFamily.playfair_semiBold,
    //   color: theme?.text,
    // },

     headerText: {
      fontSize: fontSizes.xl,
      color: theme.primary_color,
      fontFamily: fontFamily.playfair_medium,
      letterSpacing: 0.5,
    },

    userName: {
      fontSize: fontSizes.lg,
      fontFamily: fontFamily.playfair_medium,
      color: theme?.primary_color,
    },
    notiCont: {
      width: ms(40),
      height: ms(40),
      borderRadius: 100,
      backgroundColor: theme?.primary_shade,
      justifyContent: 'center',
      alignItems: 'center',
    },
    notiContPlaceholder: {
      width: ms(40),
      height: ms(40),
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
