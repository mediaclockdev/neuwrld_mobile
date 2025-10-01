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

        {/* <TouchableOpacity
          style={styles.signInRow}
          onPress={() => {
            navigate('Login');
          }}>
          <Text style={styles.signInText}>
            Already have an account?{' '}
            <Text style={styles.signInLink}>Sign In</Text>
          </Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}

const PRIMARY = '#7B4B2A'; // warm brown
const CHARCOAL = '#1E1E1E';
const CREAM = '#FAF7F3';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: CREAM,
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//   },
//   topImagesRow: {
//     width: width - 32,
//     marginTop: 12,
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//   },
//   leftTallImageWrapper: {
//     flex: 1,
//     marginRight: 12,
//     borderRadius: 40,
//     overflow: 'hidden',
//     height: IMAGE_LEFT_HEIGHT,
//     backgroundColor: '#e9e5e2',
//   },
//   leftTallImage: {
//     width: '100%',
//     height: '100%',
//   },
//   rightColumn: {
//     width: IMAGE_RIGHT_SIZE,
//     alignItems: 'center',
//   },
//   rightCircleWrapper: {
//     width: IMAGE_RIGHT_SIZE,
//     height: IMAGE_RIGHT_SIZE,
//     borderRadius: IMAGE_RIGHT_SIZE / 2,
//     overflow: 'hidden',
//     backgroundColor: '#e9e5e2',
//   },
//   rightCircleImage: {
//     width: '100%',
//     height: '100%',
//   },
//   contentArea: {
//     width: width - 48,
//     marginTop: 18,
//     alignItems: 'center',
//     paddingBottom: 32,
//   },
//   headline: {
//     textAlign: 'center',
//     fontSize: 28,
//     lineHeight: 36,
//     marginBottom: 12,
//     fontFamily: 'PlayfairDisplay_700Bold',
//     color: CHARCOAL,
//   },
//   headlineBase: {
//     color: CHARCOAL,
//     fontFamily: 'PlayfairDisplay_700Bold',
//   },
//   headlineAccent: {
//     color: PRIMARY,
//     fontFamily: 'PlayfairDisplay_700Bold',
//   },
//   subtext: {
//     textAlign: 'center',
//     fontSize: 14,
//     lineHeight: 20,
//     color: '#646464',
//     fontFamily: 'Poppins_400Regular',
//     marginBottom: 20,
//   },
//   ctaButton: {
//     width: '100%',
//     backgroundColor: PRIMARY,
//     paddingVertical: 16,
//     borderRadius: 30,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: CHARCOAL,
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.12,
//     shadowRadius: 12,
//     elevation: 6,
//     marginBottom: 14,
//   },
//   ctaText: {
//     color: CREAM,
//     fontSize: 16,
//     fontFamily: 'Poppins_600SemiBold',
//   },
//   signInRow: {
//     marginTop: 4,
//   },
//   signInText: {
//     fontFamily: 'Poppins_400Regular',
//     color: CHARCOAL,
//     fontSize: 14,
//   },
//   signInLink: {
//     color: PRIMARY,
//     textDecorationLine: 'underline',
//     fontFamily: 'Poppins_500Medium',
//   },
// });
