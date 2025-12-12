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
} from 'react-native';
import {useTheme} from '../../../context/ThemeContext';
import {hp, ms, rr, s, vs} from '../../../utils/responsive';
import {products} from '../../../utils/globalJson';
import {fontFamily, fontSizes} from '../../../theme/typography';
import {getProductDetailsRequest, getWishlistRequest} from '../appReducer';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import DashboardPlaceholder from '../Skeleton/DashboardPlaceholder';
import {ICONS} from '../../../theme/colors';
import {goBack, navigate} from '../../../utils/rootNavigation';
import {usePopup} from '../../../context/PopupContext';

const Wishlist = () => {
  const {customerDash, isLoading, wishlist_data} = useSelector(
    state => state.App,
  );
  const {isGuest} = useSelector(state => state.Auth);
  const [showPopupVisible, setShowPopupVisible] = useState(true);
  const {theme} = useTheme();
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
            'Please sing up to use this ammezing feature ,and experience the world of fashion   🎉',
          confirmText: 'Sign up to explore',
          cancelText: 'Cancle',
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

  const renderProduct = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        _handleProductClick(item);
      }}
      style={styles.card}>
      <Image source={{uri: item?.image}} style={styles.image} />
      <TouchableOpacity style={styles.heart}>
        <Image source={ICONS.adedWishlist} style={styles.wishlistListIcon} />
      </TouchableOpacity>
      <Text style={styles.title}>{item?.name}</Text>
      <View style={styles.row}>
        <Text style={styles.price}>{item?.price}</Text>
        {/* <Text style={styles.rating}>⭐ {item.rating}</Text> */}
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return <DashboardPlaceholder />;
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>My Wishlist</Text>

        {/* Product Grid */}
        <FlatList
          data={wishlist_data?.saved_for_later_items}
          keyExtractor={item => item.id}
          renderItem={renderProduct}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{height: hp(5)}} />}
          contentContainerStyle={{paddingBottom: 20}}
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
      paddingHorizontal: ms(15),
    },
    container: {flex: 1, backgroundColor: '#fff', padding: 16},
    headerText: {
      fontSize: fontSizes.lg,
      color: theme.text,
      fontFamily: fontFamily.playfair_semiBold,
      marginBottom: vs(15),
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
      width: '48%',
      backgroundColor: '#fafafa',
      borderRadius: rr(10),
      padding: ms(5),
      marginBottom: vs(15),
      position: 'relative',
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
  });
