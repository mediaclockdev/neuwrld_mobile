import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
} from 'react-native';
import {ms, rr, s, vs} from '../../../utils/responsive';
import ImageView from 'react-native-image-viewing';
import Header from '../../../components/Header';
import SubHeader from '../components/SubHeader';
import {ICONS} from '../../../theme/colors';
import {goBack, navigate} from '../../../utils/rootNavigation';
import {useTheme} from '../../../context/ThemeContext';
import CustomButton from '../../../components/CustomButton';
import {getItem, setItem} from '../../../utils/storage';

const ProductDetailsScreen = ({route, navigation}) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);

  const {productData} = route.params;
  const [selectedSize, setSelectedSize] = useState('S');
  const [Cart, setCart] = useState([]);

  const [galleryVisible, setGalleryVisible] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const openGallery = index => {
    setSelectedIndex(index);
    setGalleryVisible(true);
  };

 const productImages = [
    {uri: 'https://picsum.photos/400/500?random=1'},
    {uri: 'https://picsum.photos/400/500?random=2'},
    {uri: 'https://picsum.photos/400/500?random=3'},
    {uri: 'https://picsum.photos/400/500?random=4'},
    {uri: 'https://picsum.photos/400/500?random=5'},
  ];

  const product = {
    id: '1',
    category: 'Female’s Style',
    title: 'Light Brown Jacket',
    price: 83.97,
    rating: productData.rate,
    color: 'Brown',
    sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
    selectedSize: selectedSize,
    images: [
      'https://picsum.photos/400/500?random=1',
      'https://picsum.photos/400/500?random=2',
      'https://picsum.photos/400/500?random=3',
      'https://picsum.photos/400/500?random=4',
      'https://picsum.photos/400/500?random=5',
    ],

    extraImages: 10,
    productImage: productData.image,
    title: productData.title,

    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  };
  // Load cart on mount
  useEffect(() => {
    const prev = getItem('cart');
    if (prev) {
      setCart(prev);
    }
  }, []);

  const _addToCart = item => {
    const updatedCart = [...Cart, item];
    setCart(updatedCart);
    setItem('cart', updatedCart);
    setAddedToCart(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SubHeader
          onPressLeftIcon={() => {
            goBack();
          }}
          centerlabel={'Product Details'}
          onPressRightIcon={() => {
            console.log('roght');
          }}
          rightIcon={ICONS.wishlistList}
        />
        {/* Product Main Image */}
        <View style={styles.mainImageCont}>
          <Image
            source={{uri: product.productImage}}
            style={styles.mainImage}
          />
        </View>

        {/* --- Thumbnail Row --- */}
        <FlatList
          data={product.images}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.carousel}
          renderItem={({item, index}) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                if (index === product.images.length - 1) {
                  // Open gallery on last item
                  openGallery(index);
                } else {
                  openGallery(index);
                }
              }}>
              <View style={styles.thumbnailWrapper}>
                <Image source={{uri: item}} style={styles.thumbnail} />
                {index === product.images.length - 1 && (
                  <View style={styles.overlay}>
                    <Text style={styles.overlayText}>
                      +{product.extraImages}
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          )}
        />

        {/* Product Info */}
        <View style={styles.details}>
          <Text style={styles.category}>{product.category}</Text>
          <Text style={styles.title}>{product.title}</Text>

          <View style={styles.ratingRow}>
            <Text style={styles.star}>⭐</Text>
            <Text style={styles.rating}>{product.rating}</Text>
          </View>

          <Text style={styles.sectionTitle}>Product Details</Text>
          <Text style={styles.description}>
            {product.description} <Text style={styles.readMore}>Read more</Text>
          </Text>

          {/* Sizes */}
          <Text style={styles.sectionTitle}>Select Size</Text>
          <View style={styles.sizeRow}>
            {product.sizes.map(size => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.sizeButton,
                  selectedSize === size && styles.activeSize,
                ]}
                onPress={() => setSelectedSize(size)}>
                <Text
                  style={[
                    styles.sizeText,
                    selectedSize === size && styles.activeSizeText,
                  ]}>
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Color */}
          <Text style={styles.sectionTitle}>
            Select Color : <Text style={styles.bold}>{product.color}</Text>
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <CustomButton
          leftIcon={ICONS.add_to_cart}
          leftIconStyle={styles.cart}
          btnStyle={styles.addButton}
          title={addedToCart ? 'View Cart' : 'Add To Cart'}
          onPress={() => {
            addedToCart
              ? navigation.navigate('MyTabs', {screen: 'Cart'})
              : _addToCart(product);
          }}
        />
      </View>

      <ImageView
        images={productImages}
        imageIndex={selectedIndex}
        visible={galleryVisible}
        onRequestClose={() => setGalleryVisible(false)}
      />
    </View>
  );
};

export default ProductDetailsScreen;
const createStyles = theme =>
  StyleSheet.create({
    container: {flex: 1, backgroundColor: theme?.background},
    cart: {
      width: ms(30),
      height: ms(30),
      resizeMode: 'contain',
      tintColor: theme?.buttonText,
      marginRight: ms(5),
    },
    mainImageCont: {
      width: '100%',
      height: s(400),
      borderRadius: rr(8),
      overflow: 'hidden',
    },
    mainImage: {width: '100%', height: '100%', resizeMode: 'contain'},
    carousel: {marginVertical: 10, paddingHorizontal: 10},
    thumbnailWrapper: {marginRight: 8, position: 'relative'},
    thumbnail: {width: 70, height: 90, borderRadius: 10},
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.4)',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    overlayText: {color: '#fff', fontWeight: 'bold'},
    details: {paddingHorizontal: 15},
    category: {color: '#777', fontSize: 14, marginVertical: 5},
    title: {fontSize: 20, fontWeight: 'bold', marginBottom: 5},
    ratingRow: {flexDirection: 'row', alignItems: 'center', marginBottom: 10},
    star: {fontSize: 18, color: 'gold'},
    rating: {marginLeft: 5, fontSize: 16, fontWeight: '600'},
    sectionTitle: {fontSize: 16, fontWeight: '600', marginVertical: 10},
    description: {fontSize: 14, color: '#444'},
    readMore: {color: '#c47c3b', fontWeight: '600'},
    sizeRow: {flexDirection: 'row', flexWrap: 'wrap', marginVertical: 5},
    sizeButton: {
      borderWidth: 1,
      borderColor: '#ddd',
      paddingVertical: 6,
      paddingHorizontal: 14,
      borderRadius: 8,
      marginRight: 10,
      marginBottom: 10,
    },
    activeSize: {backgroundColor: '#c47c3b', borderColor: '#c47c3b'},
    sizeText: {fontSize: 14, color: '#333'},
    activeSizeText: {color: '#fff', fontWeight: 'bold'},
    bold: {fontWeight: 'bold'},
    bottomBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
      borderTopWidth: 1,
      borderColor: '#eee',
      backgroundColor: '#fff',
    },
    price: {fontSize: 18, fontWeight: 'bold'},
    addButton: {
      backgroundColor: theme.primary_color,
      paddingVertical: vs(10),
      paddingHorizontal: ms(15),
      borderRadius: rr(22),
      flexDirection: 'row',
      alignItems: 'center',
    },
    addButtonText: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
  });
