


import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {s} from '../utils/responsive';
import {fontFamily, fontSizes} from '../theme/typography';
import {ICONS, IMAGES} from '../theme/colors';

const HEADER_MAX_HEIGHT = s(120);
const HEADER_MIN_HEIGHT = s(70);

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
const AnimatedImage = Animated.createAnimatedComponent(Image);

export default function CustomHeader({ scrollY, onNotificationPress }) {
  // ✅ Animate header height
  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: "clamp",
  });

  // ✅ Animate logo scale
  const logoScale = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [1, 0.7],
    extrapolate: "clamp",
  });

  // ✅ Animate tagline fade
  const taglineOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <AnimatedBlurView
      style={[styles.header, { height: headerHeight }]}
      blurType="light"
      blurAmount={20}
      reducedTransparencyFallbackColor="white"
    >
      {/* Row: Logo + Notification */}
      <View style={styles.row}>
        <AnimatedImage
          source={IMAGES.logo}
          style={{
            width: s(120),
            height: s(40),
            resizeMode: "contain",
            transform: [{ scale: logoScale }], // ✅ now defined
          }}
        />
        <TouchableOpacity onPress={onNotificationPress}>
          <Image
          source={ICONS.bell}
            style={{ width: s(28), height: s(28), tintColor: "#000" }}
          />
        </TouchableOpacity>
      </View>

      {/* Tagline */}
      <Animated.Text style={[styles.tagline, { opacity: taglineOpacity }]}>
        Your Smart Home, Simplified
      </Animated.Text>
    </AnimatedBlurView>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
    paddingHorizontal: s(16),
    paddingTop: s(20),
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tagline: {
    marginTop: s(8),
    fontSize: s(14),
    color: "#666",
    textAlign: "center",
  },
});


// usecase example 
// const HEADER_MAX_HEIGHT = s(120);

// const Dashboard = () => {
//   const scrollY = useRef(new Animated.Value(0)).current;

//   return (
//     <SafeAreaView style={{flex: 1}}>
     
//         <View >
//           <CustomHeader
//             scrollY={scrollY}
//             // onNotificationPress={() => alert('Notifications')}
//           />

//           <Animated.ScrollView
//             onScroll={Animated.event(
//               [{nativeEvent: {contentOffset: {y: scrollY}}}],
//               {useNativeDriver: false},
//             )}
//             scrollEventThrottle={16} // smoother scroll updates
//             contentContainerStyle={{paddingTop: HEADER_MAX_HEIGHT}}>
//             {Array.from({length: 30}).map((_, index) => (
//               <View
//                 key={index}
//                 style={{
//                   padding: 20,
//                   borderBottomWidth: 1,
//                   borderBottomColor: '#ddd',
//                 }}>
//                 <Text>Item {index + 1}</Text>
//               </View>
//             ))}
//           </Animated.ScrollView>
//         </View>
//     </SafeAreaView>
//   );
// };
