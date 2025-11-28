// FashionOnboardingScreen.js
// React Native (Expo) single-file screen that matches the provided design.
// Colors used (from your request):
// Charcoal Black: #1E1E1E
// Warm Brown (Primary): #7B4B2A
// Cream White (Background): #FAF7F3

/*
Instructions:
1. This file is written for Expo-managed workflow.
2. Install dependencies:
   expo install expo-font @expo-google-fonts/playfair-display @expo-google-fonts/poppins
   npm install --save react-native-safe-area-context

3. Place this file as App.js (or import into your navigation) and run with `expo start`.
4. Replace the sample image URIs with your own assets or local images.
*/

import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  Dimensions,
} from 'react-native';
import {createStyles, styles} from './styles';
import {useTheme} from '../../../../context/ThemeContext';
import {navigate} from '../../../../utils/rootNavigation';

export default function Intro() {
  const {theme} = useTheme(); // 👈 hook works here
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.topImagesRow}>
        <View style={styles.leftTallImageWrapper}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
            }}
            style={styles.leftTallImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.rightColumn}>
          <View style={[styles.rightCircleWrapper, {marginBottom: 18}]}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
              }}
              style={styles.rightCircleImage}
              resizeMode="cover"
            />
          </View>

          <View style={styles.rightCircleWrapper}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
              }}
              style={styles.rightCircleImage}
              resizeMode="cover"
            />
          </View>
        </View>
      </View>

      <View style={styles.contentArea}>
        <Text style={styles.headline}>
          <Text style={styles.headlineBase}>The </Text>
          <Text style={styles.headlineAccent}>Fashion App </Text>
          <Text style={styles.headlineBase}>
            That{'\n'}Makes You Look Your Best
          </Text>
        </Text>

        <Text style={styles.subtext}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt
        </Text>

        <TouchableOpacity
          style={styles.ctaButton}
          activeOpacity={0.85}
          onPress={() => {
            navigate('OnboardingScreen');
          }}>
          <Text style={styles.ctaText}>Let’s Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


