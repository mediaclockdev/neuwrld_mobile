import {
  ImageBackground,
  Animated,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import axios from 'axios';

import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomHeader from '../../../components/CustomHeader';
import {hp, ms, rr, s, vs, wp} from '../../../utils/responsive';
import Header from '../../../components/Header';
import CustomTextInput from '../../../components/CustomTextInput';
import {useTheme} from '../../../context/ThemeContext';
import {ICONS} from '../../../theme/colors';
import DashboardCarousel from '../components/DashboardCarousel';
import {fontFamily, fontSizes} from '../../../theme/typography';
import {categories, products} from '../../../utils/globalJson';
import {navigate} from '../../../utils/rootNavigation';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {
  addToWishlistRequest,
  getCustomerDashRequest,
  getProductDetailsRequest,
  getProductRequest,
  setWishlistOverride,
} from '../appReducer';
import {IMG_URL} from '../../../api/apiClient';
import DashboardPlaceholder from '../Skeleton/DashboardPlaceholder';
import AppImage from '../components/AppImage';
import {optimizedImage} from '../../../utils/ImageUtils';
// import {
//   animateItemAppear,
//   animateItemPress,
//   animateScreenEnter,
// } from '../../../utils/animations';
import {updateUserAuthTogle} from '../../auth/authReducer';
import {usePopup} from '../../../context/PopupContext';
const Dashboard = () => {
  const {theme} = useTheme();
  const styles = createStyles(theme);

  const {customerDash, wishlistOverride, isLoading, productDetails} =
    useSelector(state => state.App);
  const dispatch = useDispatch();
  const {isGuest} = useSelector(state => state.Auth);
  const [isAuthAction, serIsAuthAction] = useState(false);

  useFocusEffect(
    useCallback(() => {
      dispatch(getCustomerDashRequest());
    }, []),
  );

  const {showPopup} = usePopup();
  useEffect(() => {
    if (isGuest && isAuthAction) {
      showPopup({
        type: 'warning',
        title: 'Hey There!',
        message:
          'Please sing up to use this amazing feature ,and experience the world of fashion   🎉',
        confirmText: 'Sign up to explore',
        cancelText: 'cancel',
        showCancel: true,
        onConfirm: () => (navigate('Signup'), serIsAuthAction(false)),
        onCancel: () => serIsAuthAction(false),
      });
    }
  }, [isAuthAction]);

  const _handleProductClick = item => {
    console.log(item);
    dispatch(getProductDetailsRequest(item?.product_sku));
  };

  const handleCategory = item => {
    const id = item?.slug;
    dispatch(getProductRequest(id));
  };

  const handleWishlist = item => {
    if (isGuest) {
      serIsAuthAction(true);
      return;
    } else {
      const isWishlisted = !(wishlistOverride[item.id] ?? item.is_in_wishlist);
    
      // 🔥 Instant UI update
      dispatch(
        setWishlistOverride({
          productId: item.id,
          isWishlisted,
        }),
      );

      const payload = {
        product_variant_id: item.id,
        action: isWishlisted ? 'add' : 'remove',
        quantity: 1,
      };

      dispatch(addToWishlistRequest({payload, screen: 'dashboard'}));
    }
  };

  const ProductCard = ({item, index}) => {
    const isWishlisted = wishlistOverride[item.id] ?? item.is_in_wishlist;

    // useEffect(() => {
    //   const timer = setTimeout(() => {
    //     animateItemAppear();
    //   }, index * 50); // Stagger animation

    //   return () => clearTimeout(timer);
    // }, [index]);

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={() => {
          // animateItemPress();
          _handleProductClick(item);
        }}>
        {/* PRODUCT IMAGE */}
        <View style={styles.imageBox}>
          <TouchableOpacity
            onPress={() => {
              handleWishlist(item);
            }}
            style={styles.heart}>
            <Image
              source={
                isWishlisted ? ICONS.adedWishlist : ICONS.wishlistList
                // item?.is_in_wishlist ? ICONS.adedWishlist : ICONS.wishlistList
              }
              style={styles.wishlistListIcon}
            />
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
        <View style={styles.bottomRow}>
          {item?.avg_rating && (
            <View style={styles.ratingBox}>
              <Text style={styles.rate}>⭐ </Text>
              <Text style={styles.ratingText}>{item?.avg_rating}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return <DashboardPlaceholder />;
  }

  return (
    <View style={styles.parent}>
      <Header isDashboard={true} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <DashboardCarousel data={customerDash?.home_banner} />

        {/* container */}
        <View
          style={[
            styles.headerRow,
            {
              marginBottom: ms(15),
              marginTop: ms(-20),
            },
          ]}>
          <Text style={styles.headerText}>Featured Category</Text>
          <TouchableOpacity
            onPress={() => {
              navigate('Categories');
            }}>
            <Text style={styles.subheaderText}>Show All</Text>
          </TouchableOpacity>
        </View>
        {/* category */}
        <View
          style={[
            styles.headerRow,
            {
              marginVertical: ms(10),
            },
          ]}>
          {customerDash?.trending_categories?.map(item => (
            <View key={item.id} style={{alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => handleCategory(item)}
                style={styles.categoriesCircle}>
                <Image
                  source={{uri: item?.image}}
                  style={[styles.categoriesIcon]}
                />
              </TouchableOpacity>
              <Text
                style={[
                  styles.subheaderText,
                  {
                    paddingTop: ms(10),
                  },
                ]}>
                {item?.name}
              </Text>
            </View>
          ))}
        </View>
        {customerDash?.latest_products && (
          <FlatList
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View
                style={[
                  styles.headerRow,
                  {
                    marginVertical: ms(10),
                  },
                ]}>
                <Text style={styles.headerText}>Most Popular</Text>
              </View>
            }
            style={{marginTop: vs(6)}}
            data={customerDash?.latest_products}
            keyExtractor={({item, index}) => String(index)}
            renderItem={({item, index}) => (
              <ProductCard item={item} index={index} />
            )}
            // renderItem={_renderproduct}
            numColumns={2}
            scrollEnabled={false}
            ListFooterComponent={<View style={styles.devider} />}
          />
        )}

        <FlatList
          ListHeaderComponent={
            <View
              style={[
                styles.headerRow,
                {
                  marginVertical: ms(10),
                },
              ]}>
              <Text style={styles.headerText}>Recommended Product</Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
          style={{marginTop: vs(6)}}
          data={customerDash?.recommended_products}
          keyExtractor={({item, index}) => String(index)}
          renderItem={({item, index}) => (
            <ProductCard item={item} index={index} />
          )}
          numColumns={2}
          scrollEnabled={false}
          ListFooterComponent={<View style={styles.devider} />}
        />
      </ScrollView>
    </View>
  );
};

export default Dashboard;

const createStyles = theme =>
  StyleSheet.create({
    parent: {
      flex: 1,
      // backgroundColor: '#2C2C2C',
      backgroundColor: theme?.background,
    },
    container: {
      paddingHorizontal: ms(15),
    },
    searchIcon: {
      width: ms(25),
      height: ms(25),
      resizeMode: 'contain',
    },
    wishlistListIcon: {
      width: '80%',
      height: '80%',
      resizeMode: 'contain',
      tintColor: theme?.primary_color,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerText: {
      fontSize: fontSizes.xl,
      color: theme.primary_color,
      fontFamily: fontFamily.playfair_medium,
      letterSpacing: 0.5,
    },
    subheaderText: {
      fontSize: fontSizes.sm,
      // color: '#FAFAFA',
      color: theme.gray,
      fontFamily: fontFamily.playfair_medium,
      textAlign: 'center',
    },
    categoriesCircle: {
      width: ms(70),
      height: ms(70),
      borderRadius: rr(100),
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      backgroundColor: theme.primary_shade,

      shadowColor: '#000',
      shadowOpacity: 0.06,
      shadowRadius: 5,
      shadowOffset: {width: 0, height: 4},
      elevation: 4,
    },
    categoriesIcon: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },

    productImage: {
      width: '100%',
      aspectRatio: 3 / 5, // portrait orientation // safe, scalable, responsive
      borderRadius: rr(10),
    },

    old_price: {
      fontSize: fontSizes.xs,
      color: theme.gray,
      fontFamily: fontFamily.poppins_medium,
      textAlign: 'left',
      textDecorationLine: 'line-through',
    },

    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    devider: {
      height: hp(12),
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
      aspectRatio: 3 / 3.8,
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
      backgroundColor: theme?.primary_shade,
      borderRadius: rr(30),
      width: ms(32),
      height: ms(32),
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 2,
      zIndex: +100,
      padding: ms(2),
    },
  });
