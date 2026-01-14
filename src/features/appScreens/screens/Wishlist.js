import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useTheme} from '../../../context/ThemeContext';
import {hp, ms, rr, s, vs, wp} from '../../../utils/responsive';
import {products} from '../../../utils/globalJson';
import {fontFamily, fontSizes} from '../../../theme/typography';
import {
  addToWishlistRequest,
  getProductDetailsRequest,
  getWishlistRequest,
  rempoveFromWishlistRequest,
  setWishlistOverride,
} from '../appReducer';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import DashboardPlaceholder from '../Skeleton/DashboardPlaceholder';
import {ICONS, IMAGES} from '../../../theme/colors';
import {goBack, navigate} from '../../../utils/rootNavigation';
import {usePopup} from '../../../context/PopupContext';
import AppImage from '../components/AppImage';
import CustomButton from '../../../components/CustomButton';

const Wishlist = () => {
  const {customerDash, isLoading, wishlist_load, wishlist_data} = useSelector(
    state => state.App,
  );
  const {isGuest} = useSelector(state => state.Auth);
  const [showPopupVisible, setShowPopupVisible] = useState(true);
  const {theme} = useTheme();
  const [current_id, setCurrent_id] = useState(null);

  const styles = createStyles(theme);
  const dispatch = useDispatch();
  const {showPopup} = usePopup();

  useFocusEffect(
    useCallback(() => {
      if (isGuest && showPopupVisible) {
        showPopup({
          type: 'warning',
          title: 'Hey There!',
          message:
            'Please sing up to use this amazing feature ,and experience the world of fashion   🎉',
          confirmText: 'Sign up to explore',
          cancelText: 'cancel',
          showCancel: true,
          onConfirm: () => (navigate('Signup'), setShowPopupVisible(false)),
          onCancel: () => goBack(),
        });
      } else {
        dispatch(getWishlistRequest());
      }
    }, []),
  );

  const _handleProductClick = item => {
    dispatch(getProductDetailsRequest(item?.sku));
  };
  const handleWishlist = item => {
    if (isGuest) {
      serIsAuthAction(true);
      return;
    } else {
      const payload = {
        product_variant_id: item.product_variant_id,
        action: 'remove',
        quantity: 1,
      };

      dispatch(addToWishlistRequest({payload}));
    }
  };
  const renderProduct = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={() => {
          _handleProductClick(item);
        }}>
        {/* PRODUCT IMAGE */}
        <View style={styles.imageBox}>
          <TouchableOpacity
            onPress={() => {
              setCurrent_id(item?.id);

              handleWishlist(item);
            }}
            style={styles.heart}>
            <Image
              source={ICONS.adedWishlist}
              style={styles.wishlistListIcon}
            />
          </TouchableOpacity>

          {wishlist_load && current_id == item?.id && (
            <View style={styles.overlayCart}>
              <ActivityIndicator size="small" color="#fff" />
            </View>
          )}

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
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>💖 Faves</Text>
        <Text style={styles.SubheaderText}>
          The stuff you’re loving right now ✨
        </Text>

        {/* Product Grid */}
        <FlatList
          data={wishlist_data?.saved_for_later_items ?? wishlist_data}
          keyExtractor={item => item.id}
          renderItem={renderProduct}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{height: hp(5)}} />}
          contentContainerStyle={{paddingBottom: 20}}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  width: wp(90),
                  height: hp(70),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    width: ms(200),
                    height: ms(200),
                    resizeMode: 'contain',
                  }}
                  source={IMAGES.noData}
                />
                <Text style={styles.emptyText}>
                  Oops! Nothing here yet 👀{'\n'}Let’s find something you’ll
                  love.
                </Text>
                <CustomButton
                  onPress={() => {
                    navigate('Home');
                  }}
                  btnStyle={{width: ms(140)}}
                  title={'Explore Trends'}
                />
              </View>
            );
          }}
        />
      </View>
    );
  }
};

export default Wishlist;

const createStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme?.background,
      paddingHorizontal: ms(10),
    },
    container: {flex: 1, backgroundColor: '#fff', padding: 16},

    headerText: {
      fontSize: fontSizes.xl,
      color: theme.primary_color,
      fontFamily: fontFamily.playfair_medium,
      letterSpacing: 0.5,
    },
    SubheaderText: {
      fontSize: fontSizes.base,
      color: theme.gray,
      lineHeight: ms(25),
      fontFamily: fontFamily.playfair_italic,
      marginBottom: vs(20),
      letterSpacing: 0.5,
    },

    categoryContainer: {
      flexDirection: 'row',
      marginBottom: 16,
      gap: 10,
      flexWrap: 'wrap',
    },
    categoryButton: {
      paddingHorizontal: ms(14),
      paddingVertical: vs(6),
      borderRadius: rr(20),
      backgroundColor: '#f0f0f0',
      // marginHorizontal: ms(2),
    },
    activeCategory: {backgroundColor: '#6b4226'},
    categoryText: {color: '#444'},
    activeCategoryText: {color: '#fff', fontWeight: '600'},

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

    image: {
      width: '100%',
      height: s(150),
      borderRadius: rr(10),
      marginBottom: vs(8),
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
    wishlistListIcon: {
      width: '80%',
      height: '80%',
      resizeMode: 'contain',
      tintColor: theme?.primary_color,
    },
    title: {fontSize: 14, fontWeight: '500', marginTop: 4},
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 6,
    },
    price: {fontSize: 14, fontWeight: '600', color: '#333'},
    rating: {fontSize: 12, color: '#888'},
    overlayCart: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: 16,
      backgroundColor: 'rgba(0,0,0,0.4)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: +100000,
    },
  });
