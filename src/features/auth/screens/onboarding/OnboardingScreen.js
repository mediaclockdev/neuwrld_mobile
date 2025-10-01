// OnboardingScreen.tsx
import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Animated,
} from 'react-native';

import LottieView from 'lottie-react-native';
import {hp, ms, wp} from '../../../../utils/responsive';
import {useTheme} from '../../../../context/ThemeContext';
import {createStyles} from './styles';
import {setUser} from '../../../../utils/authStorage';

const slides = [
  {
    id: '1',
    title: 'Seamless Shopping Experience',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    highlight: 'Seamless ',
    // image: require("../../assets/images/mock_phone.png"), // phone mock
    animation: require('../../../../../assets/gif/shopping.json'), // free Lottie animation
  },
  {
    id: '2',
    title: 'And Discover New Collections',
    description:
      'Explore the latest arrivals tailored just for you with exclusive deals.',
    highlight: 'Wishlist ',
    // image: require("../../assets/images/mock_phone.png"),
    animation: require('../../../../../assets/gif/fashion.json'),
  },
  {
    id: '3',
    title: ' & Secure Payments With Swift Delivery',
    description:
      'Enjoy safe transactions with multiple payment options worldwide.',
    highlight: 'Secure Fast',
    // image: require("../../assets/images/mock_phone.png"),
    animation: require('../../../../../assets/gif/payment.json'),
  },
];

const OnboardingScreen = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  const {theme} = useTheme(); // 👈 hook works here
  const styles = createStyles(theme);

  // Auto slider
  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = (currentIndex + 1) % slides.length;
      flatListRef.current?.scrollToIndex({index: nextIndex, animated: true});
      setCurrentIndex(nextIndex);
    }, 4000); // auto slide every 4s
    return () => clearInterval(interval);
  }, [currentIndex]);

  const renderItem = ({item}) => (
    <View style={styles.slide}>
      {/* Phone image */}
      <View style={styles.phoneImage}>
        <LottieView
          source={item.animation}
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>

      {/* Bottom Card */}
      <View style={styles.card}>
        <Text style={styles.title}>
          <Text style={styles.highlight}>{item.highlight}</Text>
          <Text>{item.title.replace(item.highlight.trim(), '')}</Text>
        </Text>

        <Text style={styles.subtitle}>{item.description}</Text>

        {/* Pagination Dots */}
        <View style={styles.bottomWrapper}>
          {/* Prev Button */}
          {currentIndex > 0 && (
            <TouchableOpacity
              style={styles.nextBtn}
              onPress={() => {
                if (currentIndex > 0) {
                  flatListRef.current?.scrollToIndex({
                    index: currentIndex - 1,
                    animated: true,
                  });
                  setCurrentIndex(currentIndex - 1);
                }
              }}>
              <Text style={styles.nextArrow}>←</Text>
            </TouchableOpacity>
          )}

          <View style={styles.dotsWrapper}>
            {slides.map((_, i) => {
              const opacity = scrollX.interpolate({
                inputRange: [
                  (i - 1) * wp('100%'),
                  i * wp('100%'),
                  (i + 1) * wp('100%'),
                ],
                outputRange: [0.3, 1, 0.3],
                extrapolate: 'clamp',
              });
              return <Animated.View key={i} style={[styles.dot, {opacity}]} />;
            })}
          </View>

          {/* Next Button */}
          <TouchableOpacity
            style={styles.nextBtn}
            onPress={() => {
              if (currentIndex === slides.length - 1) {
                setUser({userType: 'guest'});
              } else {
                flatListRef.current?.scrollToIndex({
                  index: currentIndex + 1,
                  animated: true,
                });
                setCurrentIndex(currentIndex + 1);
              }
            }}>
            <Text style={styles.nextArrow}>→</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#fff'}
        translucent={false}
      />

      {/* Skip */}
      <TouchableOpacity
        style={styles.skipBtn}
        onPress={() => setUser({userType: 'guest'})}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* FlatList Slider */}
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        onMomentumScrollEnd={ev => {
          const index = Math.round(ev.nativeEvent.contentOffset.x / wp('100%'));
          setCurrentIndex(index);
        }}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
      />
    </View>
  );
};

export default OnboardingScreen;
