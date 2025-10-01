import {StyleSheet, Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {s, vs} from '../../../utils/responsive';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ICONS} from '../../../theme/colors';
import {BlurView} from '@react-native-community/blur'; // use 'expo-blur' if Expo
import {fontFamily, fontSizes} from '../../../theme/typography';
import {useTheme} from '../../../context/ThemeContext';
import {useNavigation} from '@react-navigation/native';

const HeaderGoBack = ({
    onPress
}) => {
  const nav = useNavigation();
  const {theme} = useTheme();
  return (
      <View style={styles.header}>
        <TouchableOpacity style={styles.content} onPress={() => onPress ? onPress() : nav.goBack()}>
          <Image source={ICONS.back} style={styles.icon} />
          <Text style={[styles.title, {color: theme?.text_color || 'black'}]}>
            Back
          </Text>
        </TouchableOpacity>
      </View>
  );
};

export default HeaderGoBack;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    backgroundColor: '#fff',
    height: vs(40),
    justifyContent: 'center',
    paddingHorizontal: s(10), // only left-right padding
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  icon: {
    width: s(20),
    height: vs(20),
    resizeMode: 'contain',
    tintColor: 'black',
  },
  title: {
    fontSize: fontSizes.base,
    fontFamily: fontFamily.poppins_medium,
    paddingLeft: s(5),
  },
});
