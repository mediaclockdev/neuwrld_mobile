import React, {useState, useEffect, useRef, useCallback, useMemo} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import {
  addToWishlistRequest,
  getProductDetailsRequest,
  handleCartRemoveRequest,
  handleCartRequest,
} from '../appReducer';
import RenderHtml from 'react-native-render-html';
import AppImage from '../components/AppImage';
import {fontFamily, fontSizes} from '../../../theme/typography';
import {usePopup} from '../../../context/PopupContext';
import {ToastService} from '../../../utils/toastService';
import RatingsContainer from '../../../components/RatingsContainer';
import {postApi} from '../../../api/requestApi';

const ProductDetailsScreen = ({route, navigation}) => {
  const {width: contentWidth} = useWindowDimensions();
  const [imgRatio, setImgRatio] = useState(4 / 5.8);

  const {theme} = useTheme();
  const styles = createStyles(theme);
  const {removeProduct, addedToCart, cart_load, productDetails} = useSelector(
    state => state.App,
  );
  const {isGuest} = useSelector(state => state.Auth);
  const [isAuthAction, serIsAuthAction] = useState(false);
  const dispatch = useDispatch();
  const [btnLoader, setBtnLoader] = useState(false); // null = loading state

  const [productImages, setProductsImages] = useState([]);
  const [productSKU, setProductSKU] = useState(
    productDetails?.product?.product_sku,
  );
  const [quantity, setQuantity] = useState(1);

  const [price, setPrice] = useState(
    Number(productDetails?.product?.price) || 0,
  );

  const formatedPrice = useMemo(() => {
    if (!price) return 0;
    return Number(String(price).replace(/[^\d.]/g, ''));
  }, [price]);

  const totalPrice = useMemo(() => {
    return (quantity * price).toFixed(2);
  }, [quantity, price]);

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

  let rate = {
    success: true,
    message: 'Ratings fetched successfully',
    data: {
      average_rating: 4.3,
      total_reviews: 128,
      ratings: [
        {
          star: 5,
          totalCount: 78,
        },
        {
          star: 4,
          totalCount: 32,
        },
        {
          star: 3,
          totalCount: 10,
        },
        {
          star: 2,
          totalCount: 5,
        },
        {
          star: 1,
          totalCount: 3,
        },
      ],
    },
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
    if (productDetails?.product?.cart_quantity) {
      setQuantity(Number(productDetails?.product?.cart_quantity));
    }
  }, [isAuthAction, productDetails]);

  const increaseQty = () => {
    if (quantity >= 5) {
      ToastService.info('You may not add more then 5 quantity at a time');
      return;
    } else if (productDetails?.product?.is_in_cart) {
      setBtnLoader(true);
      let payload = {
        product_variant_id: productDetails?.product?.id,
        quantity: quantity + 1,
      };
      postApi('update-quantity', payload)
        .then(res => {
          console.log('pa', payload, res);
          if (res?.data) {
            setQuantity(prev => prev + 1);
            setPrice(formatedPrice);
          }
          setBtnLoader(false);
        })
        .catch(err => {
          console.log('er =>>>', err?.response), setBtnLoader(false);
        });
    } else {
      setPrice(formatedPrice);
      setQuantity(prev => prev + 1);
    }
  };

  const decreaseQty = () => {
    if (productDetails?.product?.is_in_cart && quantity >= 2) {
      setBtnLoader(true);
      let payload = {
        product_variant_id: productDetails?.product?.id,
        quantity: quantity - 1,
      };
      postApi('update-quantity', payload)
        .then(res => {
          console.log('pa', payload, res);
          if (res?.data) {
            setQuantity(prev => prev - 1);
            setPrice(formatedPrice);
          }
          setBtnLoader(false);
        })
        .catch(err => {
          console.log('er =>>>', err?.response), setBtnLoader(false);
        });
    } else if (productDetails?.product?.is_in_cart && quantity == 1) {
      let payload = {
        product_variant_id: productDetails?.product?.id,
      };
      let screen = {
        isCart: false,
      };
      dispatch(handleCartRemoveRequest(payload, screen));
      setQuantity(0);
      setPrice(formatedPrice);
    } else if (quantity == 1) {
      ToastService.info('Minimum quantity is 1');
      return;
    } else {
      if (quantity > 1) setQuantity(prev => prev - 1);
      else setQuantity(0); // back to Add To Cart mode
      setPrice(formatedPrice);
    }
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

  const fetchProductDetails = (item, variables) => {
    dispatch(
      getProductDetailsRequest(variables?.matched_sku ?? item?.product_sku),
    );
    setQuantity(0);
    scrollToTop();
  };

  useEffect(() => {
    if (removeProduct || addedToCart) {
      dispatch(getProductDetailsRequest(productSKU));
      setQuantity(0);
      scrollToTop();
    }
  }, [removeProduct, addedToCart]);

  useEffect(() => {
    if (productDetails?.images?.length > 0) {
      const img = productDetails?.images?.map(item => ({
        uri: item?.image,
      }));
      setProductsImages(img);
      setPrice(productDetails?.product?.price);
    }
  }, [productDetails]);

  const _renderproduct = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.card}
        activeOpacity={0.85}
        onPress={() => {
          fetchProductDetails(item, '');
          setProductSKU(item);
        }}>
        {/* PRODUCT IMAGE */}
        <View style={styles.imageBox}>
          <TouchableOpacity
            onPress={() => {
              handleWishlist(item);
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
          {item?.product_name}
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
        {item?.avg_rating > 0 ? (
          <View style={styles.ratingBox}>
            <Text style={styles.rate}>⭐ </Text>
            <Text style={styles.ratingText}>{item?.avg_rating}</Text>
          </View>
        ) : null}
        <View style={styles.bottomRow}></View>
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
        <View style={[styles.mainImageCont, {aspectRatio: imgRatio}]}>
          <Image
            source={{uri: productDetails?.product?.image}}
            style={styles.mainImage}
            resizeMode="contain"
            onLoad={({nativeEvent}) => {
              const {width, height} = nativeEvent.source;
              if (width && height) {
                setImgRatio(width / height);
              }
            }}
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
          <Text style={styles.headerText}>
            {productDetails?.product?.product_name}
          </Text>
          {productDetails?.product?.total_rating > 0 && (
            <View style={styles.ratingRow}>
              <Text style={styles.star}>⭐</Text>
              <Text style={styles.rating}>
                {productDetails?.product?.total_rating}
              </Text>
            </View>
          )}

          <View style={{alignItems: 'flex-end', marginTop: vs(15)}}>
            {productDetails?.product?.out_of_stock ? (
              <Text
                style={{
                  fontSize: fontSizes.base,
                  color: theme?.error,
                  fontFamily: fontFamily.playfair_mediumItalic,
                }}>
                Out Of Stock!
              </Text>
            ) : (
              <View style={styles.qtyContainer}>
                <TouchableOpacity style={styles.qtyBtn} onPress={decreaseQty}>
                  <Text style={styles.qtyText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.qtyNumber}>{quantity}</Text>
                <TouchableOpacity style={styles.qtyBtn} onPress={increaseQty}>
                  <Text style={styles.qtyText}>+</Text>
                </TouchableOpacity>
              </View>
            )}
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
                    onPress={() => {
                      fetchProductDetails('', data), setProductSKU(data);
                    }}>
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
            ListFooterComponent={
              <View style={[styles.devider, {height: hp(1.5)}]} />
            }
          />
          <View style={{alignItems: 'flex-start'}}>
            <Text
              style={{
                fontSize: fontSizes.base,
                fontFamily: fontFamily.playfair_medium,
                color: theme?.gray,
                lineHeight: ms(25),
                paddingBottom: vs(10),
              }}>
              Review & Ratings Of Product
            </Text>
            <RatingsContainer productRate={rate?.data} theme={theme} />
          </View>
          <View style={styles.devider} />
        </View>
      </ScrollView>

      {/* Bottom Bar */}

      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.old_price}>
            {productDetails?.product?.old_price}
          </Text>
          <Text style={styles.price}>
            {totalPrice > 0
              ? `$ ${totalPrice}`
              : productDetails?.product?.price || '$ 0.00'}
          </Text>

          {/* <Text style={styles.price}>{productDetails?.product?.price}</Text> */}
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <CustomButton
            leftIcon={ICONS.add_to_cart}
            disabled={
              quantity == 0 && productDetails?.product?.is_in_cart == false
                ? true
                : false
            }
            leftIconStyle={styles.cart}
            btnStyle={styles.addButton}
            loading={cart_load || btnLoader}
            title={
              addedToCart || productDetails?.product?.is_in_cart
                ? 'View Cart'
                : 'Add To Cart'
            }
            onPress={() => {
              addedToCart || productDetails?.product?.is_in_cart
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
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },

    mainImage: {
      width: '100%',
      height: '100%',
    },
    carousel: {margin: ms(10), paddingHorizontal: ms(5)},
    thumbnailWrapper: {
      marginRight: ms(10),
      position: 'relative',
      padding: ms(2),
    },
    thumbnail: {
      width: ms(70),
      height: vs(90),
      borderRadius: ms(5),
      resizeMode: 'stretch',
    },
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
      paddingHorizontal: ms(10),
      borderTopWidth: 1,
      borderColor: '#eee',
      backgroundColor: '#fff',
    },
    addButton: {
      backgroundColor: theme.primary_color,
      height: ms(40),
      width: ms(140),
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
      width: ms(100),
    },
    qtyBtn: {
      width: ms(20),
      height: ms(20),
      borderRadius: 30,
      backgroundColor: '#D4B183',
      alignItems: 'center',
      justifyContent: 'center',
    },
    qtyText: {
      color: '#fff',
      fontSize: ms(12),
      fontWeight: '600',
    },

    qtyNumber: {
      fontSize: 18,
      fontWeight: '700',
      color: '#805A36',
      marginHorizontal: 12,
    },
  });
