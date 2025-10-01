import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import { vs } from '../../../utils/responsive';

const {width} = Dimensions.get('window');
const ITEM_WIDTH = Math.round(width * 0.75);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 5 );

const data = [
  {
    title: 'First Slide',
    subtitle: 'This is the first slide description',
    illustration: 'https://plus.unsplash.com/premium_photo-1664202526559-e21e9c0fb46a?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Second Slide',
    subtitle: 'This is the second slide description',
    illustration: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Third Slide',
    subtitle: 'This is the third slide description',
    illustration: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

export default function AppCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef(null);

  const renderItem = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <Image source={{uri: item.illustration}} style={styles.image} />
      </View>
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
        layout={'default'} // options: 'default', 'stack', 'tinder'
        onSnapToItem={(index) => setActiveSlide(index)}
        autoplay={true}
        autoplayDelay={1000}
        autoplayInterval={3000}
        loop={true}
      />
      <Pagination
        dotsLength={data.length}
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
    // backgroundColor: '#2B2B2B',
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginTop:vs(10)
  },
  itemContainer: {
    backgroundColor: '#222',
    borderRadius: 12,
    height: ITEM_HEIGHT ,
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
    // backgroundColor: '#C28840', // gold highlight¿
    backgroundColor: '#7B4B2A', // gold highlight¿
  },
});
