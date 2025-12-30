import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import {fontFamily, fontSizes} from '../theme/typography';
import {vs} from '../utils/responsive';

const NoProducts = ({
  headerText = 'No Products Found',
  subHeaderText='Try adjusting the filters or check another category.'
}) => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/gif/Emptybox.json')}
        autoPlay
        loop
        style={styles.lottie}
      />

      <Text style={styles.title}>{headerText}</Text>
      <Text style={styles.subtitle}>{subHeaderText}
      </Text>
    </View>
  );
};

export default NoProducts;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: vs(60),
  },
  lottie: {
    width: 220,
    height: 220,
  },
  title: {
    fontSize: fontSizes.xl,
    fontFamily: fontFamily.playfair_bold,
    color: '#7B4B2A',
    marginTop: 16,
  },
  subtitle: {
    fontSize: fontSizes.md,
    marginTop: 6,
    color: '#777',
    fontFamily: fontFamily.playfair_medium,
    textAlign: 'center',
    paddingHorizontal: 30,
  },
});
