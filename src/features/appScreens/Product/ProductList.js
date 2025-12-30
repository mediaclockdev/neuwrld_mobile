import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Button,
} from 'react-native';
import {useTheme} from '../../../context/ThemeContext';
import {hp, ms, rr, s, vs} from '../../../utils/responsive';
import {fontFamily, fontSizes} from '../../../theme/typography';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAllCategoriesRequest,
  getProductDetailsRequest,
  getProductRequest,
  getSubcategoryByCategoriesIdRequest,
} from '../appReducer';
import {goBack, navigate} from '../../../utils/rootNavigation';
import {ICONS} from '../../../theme/colors';
import FilterByModule from '../components/FilterByModule';
import CategorisPlaceholder from '../Skeleton/CategorisPlaceholder';
import AppImage from '../components/AppImage';
import NoProducts from '../../../components/NoProducts';
import {usePopup} from '../../../context/PopupContext';
import {postApi} from '../../../api/requestApi';
import {ALL_APi_LIST} from '../../../utils/apis';
import BottomSheet from '../../../components/BottomSheet';
import SortSheet from './SortSheet';

const ProductList = () => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const {isLoading, products} = useSelector(state => state.App);
  const {isGuest} = useSelector(state => state.Auth);
  const [isAuthAction, serIsAuthAction] = useState(false);
  const [showFilterModle, setShowFilterModle] = useState(false);
  const dispatch = useDispatch();
  const [sortByVisible, setSortByVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState('TRENDING');
  const _handleProductClick = item => {
    dispatch(getProductDetailsRequest(item?.product_sku));
  };

  const handleWishlist = item => {
    if (isGuest) {
      serIsAuthAction(true);
      return;
    } else {
      let payload = {
        product_variant_id: item?.id,
        is_saved_for_later: 1,
        quantity: 1,
      };
      postApi(ALL_APi_LIST.wishlist, payload).then(res => {
        console.log(res, payload, item);
        if (res?.success == true) {
          dispatch(getProductRequest(products?.category?.slug));
        } else {
        }
      });
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

  const renderProduct = ({item, index}) => {
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
              handleWishlist(item);
            }}
            style={styles.heart}>
            <Image
              source={
                item?.is_in_wishlist ? ICONS.adedWishlist : ICONS.wishlistList
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
    return <CategorisPlaceholder />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              goBack();
            }}
            style={styles.backButton}>
            <Image source={ICONS.back} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Products</Text>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              setShowFilterModle(true);
            }}
            style={styles.backButton}>
            <Image source={ICONS.filter} style={styles.backIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSortByVisible(true);
            }}
            style={styles.backButton}>
            <Image source={ICONS.sortBy} style={styles.backIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Product Grid */}
      <FlatList
        data={products?.product_variants}
        keyExtractor={item => item.id}
        renderItem={renderProduct}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{height: hp(5)}} />}
        contentContainerStyle={{padding: ms(15)}}
        ListEmptyComponent={<NoProducts />}
      />

      <FilterByModule
        onClose={() => {
          setShowFilterModle(false);
        }}
        visible={showFilterModle}
      />

      <BottomSheet
        visible={sortByVisible}
        onBackdropPress={() => setSortByVisible(false)}
        renderChild={
          <SortSheet
            selected={selectedSort}
            isSorting={false}
            onClose={() => setSortByVisible(false)}
            onSelect={item => {
              setSelectedSort(item.key); // instant UI update
              setSortByVisible(false); // close sheet
              // dispatch(sortProductsRequest(item.key)); // saga call
            }}
          />
        }
      />
    </View>
  );
};

export default ProductList;

const createStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme?.background,
    },

    headerRow: {
      width: '100%',
      paddingHorizontal: ms(12),
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    backButton: {
      width: ms(25),
      height: ms(25),
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: ms(4),
    },
    backIcon: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
      tintColor: theme?.primary_color,
    },

    headerText: {
      fontSize: fontSizes.lg,
      color: theme.text,
      fontFamily: fontFamily.playfair_semiBold,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 6,
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

    old_price: {
      fontSize: fontSizes.xs,
      color: theme.gray,
      fontFamily: fontFamily.poppins_medium,
      textAlign: 'left',
      textDecorationLine: 'line-through',
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

    productImage: {
      width: '100%',
      aspectRatio: 3 / 4, // portrait orientation // safe, scalable, responsive
      borderRadius: rr(10),
    },
  });
