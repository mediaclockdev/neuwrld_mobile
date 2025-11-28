import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Animated,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {vs} from '../../../utils/responsive';
import FastImage from '@d11/react-native-fast-image';

const {width} = Dimensions.get('window');
const ITEM_WIDTH = Math.round(width * 0.95);
// const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 5);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 9) / 19); // 16:9 luxury ratio


export default function AppCarousel({data}) {
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef(null);

  const renderItem = ({item}) => {
    return (
      <Animated.View>
        <FastImage
          source={{uri: item?.settings?.image}}
          style={styles.image}
          resizeMode={FastImage.resizeMode.cover} // ⭐ FIT INSIDE BOX
        />
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Carousel
        ref={carouselRef}
        data={data}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={ITEM_WIDTH}
        layout={'tinder'} // options: 'default', 'stack', 'tinder'
        onSnapToItem={index => setActiveSlide(index)}
        autoplay={true}
        autoplayDelay={1000}
        autoplayInterval={3000}
        loop={true}
      />
      <Pagination
        dotsLength={data?.length}
        activeDotIndex={activeSlide}
        carouselRef={carouselRef}
        dotStyle={styles.dot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.8}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginTop: vs(10),
    alignItems:'center'
  },
  itemContainer: {
    backgroundColor: '#222',
    borderRadius: 12,
    height: ITEM_HEIGHT,
    alignItems: 'center',
  },
  image: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#7B4B2A', // gold highlight¿
  },

});

