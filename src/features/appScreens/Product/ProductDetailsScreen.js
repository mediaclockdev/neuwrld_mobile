import React, {useState, useEffect, useRef} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import {IMG_URL} from '../../../api/apiClient';
import {getProductDetailsRequest} from '../appReducer';
import RenderHtml from 'react-native-render-html';

const ProductDetailsScreen = ({route, navigation}) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const {isLoading, productDetails} = useSelector(state => state.App);

  const dispatch = useDispatch();

  // const {productData} = route.params;
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedFebric, setSelectedFebric] = useState('');
  const [Cart, setCart] = useState([]);
  const [productImages, setProductsImages] = useState([]);

  const [galleryVisible, setGalleryVisible] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const openGallery = index => {
    setSelectedIndex(index);
    setGalleryVisible(true);
  };

  const scrollViewRef = useRef(null);

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({y: 0, animated: true});
  };

  const HTMLRenderContent = content => {
    return {html: content};
  };

  // Load cart on mount
  useEffect(() => {
    const prev = getItem('cart');
    if (prev) {
      setCart(prev);
    }
    if (productDetails?.images?.length > 0) {
      const img = productDetails?.images?.map(item => ({
        uri: IMG_URL + item,
      }));
      setProductsImages(img);
    }
  }, []);

  const _addToCart = item => {
    const updatedCart = [...Cart, item];
    setCart(updatedCart);
    setItem('cart', updatedCart);
    setAddedToCart(true);
  };
  const fetchProductDetails = (item, variables) => {
    console.log('item',item)
    dispatch(getProductDetailsRequest(variables?.sku));
    if (item?.id == 3) {
      setSelectedSize(variables);
      return;
    } else if (item?.id == 2) {
      setSelectedFebric(variables);
      return;
    } else if (item?.id == 1) {
      setSelectedColor(variables);
      return;
    }
    scrollToTop();
  };

  return (
    <View style={styles.container}>
      <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
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
            source={{uri: productDetails?.product?.image}}
            style={styles.mainImage}
          />
        </View>

        {/* --- Thumbnail Row --- */}
        <FlatList
          data={productDetails?.images}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.carousel}
          renderItem={({item, index}) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                if (index === productDetails?.images?.length - 1) {
                  // Open gallery on last item
                  openGallery(index);
                } else {
                  openGallery(index);
                }
              }}>
              <View style={styles.thumbnailWrapper}>
                <Image
                  source={{uri: IMG_URL + item}}
                  style={styles.thumbnail}
                />

                {index === productDetails?.images?.length - 1 &&
                  productDetails?.images?.length > 6 && (
                    <View style={styles.overlay}>
                      <Text style={styles.overlayText}>
                        +{productDetails?.images?.length}
                      </Text>
                    </View>
                  )}
              </View>
            </TouchableOpacity>
          )}
        />

        {/* Product Info */}
        <View style={styles.details}>
          <Text style={styles.category}>
            {productDetails?.product?.category}
          </Text>
          <Text style={styles.title}>{productDetails?.product?.name}</Text>

          <View style={styles.ratingRow}>
            <Text style={styles.star}>⭐</Text>
            <Text style={styles.rating}>
              {productDetails?.product?.total_rating}
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Product Details</Text>
          <RenderHtml
            contentWidth={'100%'}
            source={HTMLRenderContent(productDetails?.product?.product_details)}
          />
          <Text style={styles.sectionTitle}>Product Specifications</Text>

          <RenderHtml
            contentWidth={'100%'}
            source={HTMLRenderContent(productDetails?.product?.specifications)}
          />

          {productDetails?.attribute_options.map(item => (
            <View>
              <Text style={styles.sectionTitle}>Select {item?.name}</Text>
              <View style={styles.sizeRow}>
                {item?.options?.map(data => (
                  <TouchableOpacity
                    key={data?.sku}
                    style={[
                      styles.sizeButton,
                      selectedSize?.sku == data?.sku
                        ? styles.activeSize
                        : selectedColor?.sku == data?.sku
                        ? styles.activeSize
                        : selectedFebric?.sku == data?.sku
                        ? styles.activeSize
                        : styles.sizeButton,
                    ]}
                    onPress={() => fetchProductDetails(item, data)}>
                    <Text
                      style={[
                        styles.sizeText,
                        // selectedSize === size && styles.activeSizeText,
                      ]}>
                      {data?.value}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
          {/* Sizes */}

          <View style={styles.sizeRow}>
            {productDetails?.colors?.map(size => (
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
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <Text style={styles.price}>${productDetails?.discount_price}</Text>
        <CustomButton
          leftIcon={ICONS.add_to_cart}
          leftIconStyle={styles.cart}
          btnStyle={styles.addButton}
          title={addedToCart ? 'View Cart' : 'Add To Cart'}
          onPress={() => {
            addedToCart
              ? navigation.navigate('MyTabs', {screen: 'Cart'})
              : _addToCart(productDetails);
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
