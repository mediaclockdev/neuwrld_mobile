import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
  useWindowDimensions,
  LayoutAnimation,
} from 'react-native';
import {hp, ms, rr, s, vs} from '../../../utils/responsive';
import ImageView from 'react-native-image-viewing';
import SubHeader from '../components/SubHeader';
import {ICONS} from '../../../theme/colors';
import {goBack, navigate} from '../../../utils/rootNavigation';
import {useTheme} from '../../../context/ThemeContext';
import CustomButton from '../../../components/CustomButton';
import {getItem, setItem} from '../../../utils/storage';
import {useDispatch, useSelector} from 'react-redux';
import {IMG_URL} from '../../../api/apiClient';
import {
  addToWishlistRequest,
  getCouponRequest,
  getProductDetailsRequest,
  handleCartRequest,
} from '../appReducer';
import RenderHtml from 'react-native-render-html';
import AppImage from '../components/AppImage';
import {fontFamily, fontSizes} from '../../../theme/typography';
import {animateScreenEnter} from '../../../utils/animations';
import {useFocusEffect} from '@react-navigation/native';
import {usePopup} from '../../../context/PopupContext';

const ProductDetailsScreen = ({route, navigation}) => {
  const {width: contentWidth} = useWindowDimensions();

  const {theme} = useTheme();
  const styles = createStyles(theme);
  const {isLoading, addedToCart, cart_load, productDetails} = useSelector(
    state => state.App,
  );
  const {isGuest} = useSelector(state => state.Auth);
  const [isAuthAction, serIsAuthAction] = useState(false);
  const dispatch = useDispatch();

  const [Cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [productImages, setProductsImages] = useState([]);
  const [quantity, setQuantity] = useState(0);

  const [galleryVisible, setGalleryVisible] = useState(false);
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

  const handleWishlist = item => {
    if (isGuest) {
      serIsAuthAction(true);
    } else {
      let screen = 'ProductDetailsScreen';
      let sku = productDetails?.product?.product_sku;
      let payload = {
        product_variant_id: item?.id,
        is_saved_for_later: 1,
        quantity: 1,
      };
      dispatch(addToWishlistRequest({payload, screen, sku}));
    }
  };

  const {showPopup} = usePopup();
  useEffect(() => {
    if (isGuest && isAuthAction) {
      showPopup({
        type: 'warning',
        title: 'Hey There!',
        message:
          'Please sing up to use this ammezing feature ,and experience the world of fashion   🎉',
        confirmText: 'Sign up to explore',
        cancelText: 'Cancle',
        showCancel: true,
        onConfirm: () => (navigate('Signup'), serIsAuthAction(false)),
        onCancel: () => serIsAuthAction(false),
      });
    }
  }, [isAuthAction]);

  const increaseQty = () => setQuantity(prev => prev + 1);

  const decreaseQty = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
    else setQuantity(0); // back to Add To Cart mode
  };

  // Load cart on mount

  //   useFocusEffect(
  //     useCallback(() => {
  // dispatch(getCouponRequest())

  //       // const prev = getItem('cart');
  //       // const prevItems = getItem('wishlist');
  //       // prevItems ? setWishlist(prevItems) : setWishlist([]);
  //       // if (prev) {
  //       //   setCart(prev);
  //       // }
  //       // if (productDetails?.images?.length > 0) {
  //       //   const img = productDetails?.images?.map(item => ({
  //       //     uri: item?.image,
  //       //   }));
  //       //   setProductsImages(img);
  //       // }

  //       // animateScreenEnter();

  //       return () => {
  //         // Exit animation (triggers on unmount/focus loss)
  //         LayoutAnimation.configureNext({
  //           duration: 300,
  //           delete: {
  //             type: LayoutAnimation.Types.easeOut,
  //             property: LayoutAnimation.Properties.opacity,
  //           },
  //         });
  //       };

  //     }, []),
  //   );

  const _addToCart = item => {
    if (isGuest) {
      serIsAuthAction(true);
    } else {
      let payload = {
        product_variant_id: item?.id,
        is_saved_for_later: 0,
        quantity: quantity,
      };
      dispatch(handleCartRequest(payload));
    }
  };

  const _addToWishList = item => {
    let isPresent = wishlist?.find(data => data?.id == item.id);
    if (isPresent) {
    }
    const updatedCart = [...Cart, item];
    setCart(updatedCart);
    setItem('cart', updatedCart);
    setAddedToCart(true);
  };

  const fetchProductDetails = (item, variables) => {
    dispatch(getProductDetailsRequest(variables?.sku ?? item?.product_sku));
    scrollToTop();
  };

  const _renderproduct = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.card}
        activeOpacity={0.85}
        onPress={() => {
          fetchProductDetails(item, '');
        }}>
        {/* PRODUCT IMAGE */}
        <View style={styles.imageBox}>
          <TouchableOpacity
            onPress={() => {
              handleWishlist(item?.product);
            }}
            style={styles.heart}>
            <Text
              style={{
                color: item?.is_in_wishlist ? theme?.primary_color : '#aaa',
              }}>
              🤍
            </Text>
          </TouchableOpacity>
          <AppImage
            uri={item?.image}
            autoHeight={false}
            resizeMode="cover"
            style={styles.productImage}
            borderRadius={16}
          />
        </View>

        {/* TITLE */}
        <Text numberOfLines={1} style={styles.name}>
          {item?.name}
        </Text>

        {/* PRICE ROW */}
        <View style={styles.priceRow}>
          <View>
            <Text style={[styles.old_price]}>{item?.old_price}</Text>
            <Text style={styles.price}>{item?.price}</Text>
          </View>
          <Text style={styles.discountTag}>-{item?.discount}</Text>
        </View>

        {/* WISHLIST + RATING */}
        <View style={styles.bottomRow}>
          <View style={styles.ratingBox}>
            <Text style={styles.rate}>⭐ </Text>
            <Text style={styles.ratingText}>{item?.avg_rating}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
        <SubHeader
          onPressLeftIcon={() => {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut,
            );
            goBack();
          }}
          centerlabel={'Product Details'}
          onPressRightIcon={() => {
            handleWishlist(productDetails?.product);
          }}
          rightIcon={
            productDetails?.product?.is_in_wishlist
              ? ICONS?.adedWishlist
              : ICONS.wishlistList
          }
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
                <Image source={{uri: item?.image}} style={styles.thumbnail} />

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
          <Text style={styles.headerText}>{productDetails?.product?.name}</Text>

          <View style={styles.ratingRow}>
            <Text style={styles.star}>⭐</Text>
            <Text style={styles.rating}>
              {productDetails?.product?.total_rating}
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Product Details</Text>
          <RenderHtml
            contentWidth={contentWidth}
            source={HTMLRenderContent(productDetails?.product?.product_details)}
          />
          <Text style={styles.sectionTitle}>Product Specifications</Text>

          <RenderHtml
            contentWidth={contentWidth}
            source={HTMLRenderContent(productDetails?.product?.specifications)}
          />

          {productDetails?.attribute_options?.map(item => (
            <View>
              <Text style={styles.sectionTitle}>Select {item?.name}</Text>
              <View style={styles.sizeRow}>
                {item?.options?.map(data => (
                  <TouchableOpacity
                    key={data?.sku}
                    style={[
                      styles.sizeButton,
                      data?.is_current && styles.activeSize,
                    ]}
                    onPress={() => fetchProductDetails(item, data)}>
                    <Text
                      style={[
                        styles.sizeText,
                        data?.is_current && styles.activeSizeText,
                      ]}>
                      {data?.value}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}

          {/* recommended_products  */}
          <FlatList
            ListHeaderComponent={
              <View
                style={[
                  styles.headerRow,
                  {
                    marginVertical: ms(10),
                  },
                ]}>
                <Text style={styles.headerText}>Checkout Similar Propduct</Text>
              </View>
            }
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            style={{marginTop: vs(6)}}
            data={productDetails?.checkout_more_products}
            keyExtractor={({item, index}) => String(index)}
            renderItem={_renderproduct}
            numColumns={2}
            scrollEnabled={false}
            ListFooterComponent={<View style={styles.devider} />}
          />
        </View>
      </ScrollView>

      {/* Bottom Bar */}

      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.old_price}>
            {productDetails?.product?.old_price}
          </Text>
          <Text style={styles.price}>{productDetails?.product?.price}</Text>
        </View>
        <View>
          <View style={styles.qtyContainer}>
            <TouchableOpacity style={styles.qtyBtn} onPress={decreaseQty}>
              <Text style={styles.qtyText}>-</Text>
            </TouchableOpacity>

            <Text style={styles.qtyNumber}>{quantity}</Text>

            <TouchableOpacity style={styles.qtyBtn} onPress={increaseQty}>
              <Text style={styles.qtyText}>+</Text>
            </TouchableOpacity>
          </View>
          <CustomButton
            leftIcon={ICONS.add_to_cart}
            disabled={quantity == 0 ? true : false}
            leftIconStyle={styles.cart}
            btnStyle={styles.addButton}
            loading={cart_load}
            title={addedToCart ? 'View Cart' : 'Add To Cart'}
            onPress={() => {
              addedToCart
                ? navigation?.navigate('MyTabs', {screen: 'Cart'})
                : _addToCart(productDetails?.product);
            }}
          />
        </View>
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
    addButton: {
      backgroundColor: theme.primary_color,
      paddingVertical: vs(10),
      paddingHorizontal: ms(15),
      borderRadius: rr(22),
      flexDirection: 'row',
      alignItems: 'center',
    },
    addButtonText: {color: '#fff', fontSize: 16, fontWeight: 'bold'},

    // recommendedProduct

    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    devider: {
      height: hp(5),
    },

    card: {
      width: '46%',
      backgroundColor: '#fff',
      borderRadius: 18,
      overflow: 'hidden',
      margin: '2%',

      shadowColor: '#000',
      shadowOpacity: 0.06,
      shadowRadius: 5,
      shadowOffset: {width: 0, height: 4},
      elevation: 4,
    },

    imageBox: {
      width: '100%',
      aspectRatio: 3 / 3.5,
      borderRadius: 16,
      backgroundColor: '#f3f3f3',
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
    },

    name: {
      fontFamily: fontFamily.playfair_medium,
      fontSize: fontSizes.md,
      marginTop: 8,
      marginHorizontal: 10,
      color: '#222',
    },

    priceRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 6,
      marginHorizontal: 10,
      alignItems: 'center',
    },

    price: {
      fontFamily: fontFamily.playfair_semiBold,
      fontSize: fontSizes.lg,
      color: theme.primary_color,
    },

    discountTag: {
      backgroundColor: '#FFE8EC',
      paddingVertical: 3,
      paddingHorizontal: 8,
      borderRadius: 8,
      color: '#ff375f',
      fontWeight: '600',
    },
    bottomRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 12,
      paddingBottom: 12,
      marginTop: 10,
    },

    ratingBox: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    ratingText: {
      marginLeft: 4,
      color: '#444',
      fontSize: fontSizes.sm,
    },

    heart: {
      position: 'absolute',
      top: ms(6),
      right: ms(6),
      backgroundColor: theme?.background,
      borderRadius: rr(30),
      width: ms(30),
      height: ms(30),
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 2,
      zIndex: +100,
    },
    productImage: {
      width: '100%',
      aspectRatio: 3 / 4, // portrait orientation // safe, scalable, responsive
      borderRadius: rr(10),
    },

    headerText: {
      fontSize: fontSizes.lg,
      color: theme.text,
      fontFamily: fontFamily.playfair_semiBold,
    },
    subheaderText: {
      fontSize: fontSizes.sm,
      color: theme.gray,
      fontFamily: fontFamily.playfair_medium,
      textAlign: 'center',
    },
    old_price: {
      fontSize: fontSizes.xs,
      color: theme.gray,
      fontFamily: fontFamily.playfair_medium, // Use regular or test semi-bold later
      textAlign: 'left',
      textDecorationLine: 'line-through',
      textDecorationStyle: 'solid', // extra fix for iOS
    },
    qtyContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F4E3C4',
      borderRadius: 30,
      paddingHorizontal: 5,
      paddingVertical: 5,
      justifyContent: 'space-between',
    },
    qtyBtn: {
      width: 35,
      height: 35,
      borderRadius: 30,
      backgroundColor: '#D4B183',
      alignItems: 'center',
      justifyContent: 'center',
    },
    qtyText: {
      color: '#fff',
      fontSize: 20,
      fontWeight: '600',
    },

    qtyNumber: {
      fontSize: 18,
      fontWeight: '700',
      color: '#805A36',
      marginHorizontal: 12,
    },
  });
