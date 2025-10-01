import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {GIF, IMAGES} from '../theme/colors';
import {hp, wp} from '../utils/responsive';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={GIF.splash} style={styles.splash} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  splash: {
    width: wp(95),
    height: hp(100),
    resizeMode: 'contain',
  },
});
