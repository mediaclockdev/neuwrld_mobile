import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {getItem} from '../../../utils/storage';
import CartPlaceholder from '../Skeleton/CartPlaceholder';
import {useTheme} from '../../../context/ThemeContext';
import {hp, ms, s, vs, wp} from '../../../utils/responsive';
import {fontFamily, fontSizes} from '../../../theme/typography';
import CustomButton from '../../../components/CustomButton';
import {goBack, navigate} from '../../../utils/rootNavigation';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAddressRequest,
  getCartRequest,
  getCouponRequest,
  handleCartRemoveRequest,
} from '../appReducer';
import {postApi} from '../../../api/requestApi';
import {usePopup} from '../../../context/PopupContext';
import {ToastService} from '../../../utils/toastService';
import {IMAGES} from '../../../theme/colors';

const Cart = () => {
  const {customerDash, isLoading, removeProduct, appliedCoupon, cartData} =
    useSelector(state => state.App);

  const {isGuest} = useSelector(state => state.Auth);
  const [showPopupVisible, setShowPopupVisible] = useState(true);

  const dispatch = useDispatch();
  const [btnLoader, setBtnLoader] = useState(false); // null = loading state
  const [showModal, setShowModal] = useState({
    visible: false,
    item: null,
  }); // null = loading state
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const {showPopup} = usePopup();
  const [promocode, setPromocode] = useState(appliedCoupon?.code ?? '');

  const _handleQuantity = (item, isIncrement) => {
    let prevQty = isIncrement
      ? Number(item?.quantity) + 1
      : Number(item?.quantity) - 1;
    let payload = {
      product_variant_id: item?.product_variant_id,
      quantity: prevQty,
    };
    if (prevQty < 1) {
      setShowModal({
        ...showModal,
        visible: true,
        item: item,
      });
      return;
    } else {
      setBtnLoader(true);
      postApi('update-quantity', payload)
        .then(res => {
          console.log('pa', payload, res);
          if (res?.data) {
            dispatch(getCartRequest());
          }
          setBtnLoader(false);
        })
        .catch(err => {
          console.log('er =>>>', err?.response), setBtnLoader(false);
        });
    }
  };

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
        dispatch(getCartRequest(appliedCoupon?.code || ''));
        dispatch(getAddressRequest());
      }
    }, [appliedCoupon, removeProduct]),
  );

  useEffect(() => {
    if (showModal?.visible) {
      showPopup({
        type: 'warning',
        title: 'Hey There!',
        message: 'Are you sure to remove this item from your cart?',
        confirmText: 'Remove from cart',
        cancelText: 'Cancel',
        showCancel: true,
        onConfirm: () => {
          let payload = {
            product_variant_id: showModal?.item?.product_variant_id,
          };
          let screen = {
            isCart: true,
          };
          dispatch(handleCartRemoveRequest({payload, screen}));

          setShowModal({visible: false, item: null});
        },
        onCancel: () => {
          setShowModal({visible: false, item: null});
        },
      });
    }
  }, [showModal.visible]);

  const _renderItem = ({item, index}) => {
    return (
      <View key={item?.product_variant_id} style={styles.cardRow}>
        <View style={styles.row}>
          <Image source={{uri: item?.image}} style={styles.productImage} />
          <View style={{marginLeft: ms(10), maxWidth: '60%'}}>
            <Text style={styles.title}>{item?.product_name}</Text>
            <Text style={styles.size}>
              Size : {item?.attributes?.Size ?? 'free size'} ,
              <Text style={styles.qty}> Qty : {item?.quantity}</Text>
            </Text>
            <Text style={styles.size}> </Text>

            <Text style={styles.amount}>{item?.price}</Text>
          </View>
        </View>
        <View style={styles.qtyBtn}>
          <TouchableOpacity
            onPress={() => {
              _handleQuantity(item, false);
            }}
            style={styles.decBtn}>
            <Text style={styles.qtyText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyText}>{item?.quantity}</Text>

          <TouchableOpacity
            onPress={() => {
              _handleQuantity(item, true);
            }}
            style={styles.incBtn}>
            <Text
              style={[
                styles.qtyText,
                {
                  color: theme?.background,
                },
              ]}>
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (isLoading) {
    return <CartPlaceholder />;
  } else {
    return (
      <View style={styles.parent}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}>
          <Text style={styles.headerText}>🛍️ Your Cart</Text>
          <Text style={styles.SubheaderText}>
            All the good stuff you picked ✨
          </Text>

          <FlatList
            data={cartData?.cart_items}
            keyExtractor={(item, index) => item?.product_variant_id}
            renderItem={_renderItem}
            scrollEnabled={false}
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
                      navigate('Categories');
                    }}
                    btnStyle={{width: ms(140)}}
                    title={'Explore Trends'}
                  />
                </View>
              );
            }}
          />
          {cartData?.cart_items?.length > 0 && (
            <View
              style={{
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                marginTop: vs(10),
              }}>
              <CustomButton
                onPress={() => navigate('Checkout', {})}
                title={'Continue To Checkout'}
                loading={btnLoader}
                btnStyle={styles.checkoutBtn}
              />
            </View>
          )}
          <View style={styles.devider} />
        </ScrollView>
      </View>
    );
  }
};

export default Cart;

const createStyles = theme =>
  StyleSheet.create({
    parent: {
      flex: 1,
      backgroundColor: theme?.background,
    },
    container: {
      padding: ms(15),
    },
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

    emptyText: {
      fontSize: fontSizes.base,
      color: theme.primary_color,
      fontFamily: fontFamily.playfair_mediumItalic,
      textAlign: 'center',
      lineHeight: vs(25),
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    cardRow: {
      width: '100%',
      minHeight: ms(80),
      borderBottomWidth: 0.6,
      borderBottomColor: theme?.primary_shade,
      marginTop: vs(10),
      borderRadius: ms(12),
      paddingVertical: vs(10),
      flexDirection: 'row',
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingRight: ms(10),
    },
    productImage: {
      width: ms(80),
      height: ms(90),
      resizeMode: 'stretch',
      borderRadius: ms(12),
    },
    title: {
      fontSize: fontSizes.sm,
      color: theme.text,
      fontFamily: fontFamily.playfair_medium,
      lineHeight: ms(20),
    },
    couponcode: {
      fontSize: fontSizes.sm,
      color: theme.primary_color,
      textDecorationLine: 'underline',

      fontFamily: fontFamily.playfair_boldItalic,
      paddingVertical: ms(10),
      textAlign: 'right',
    },
    amount: {
      fontSize: fontSizes.sm,
      color: theme.text,
      fontFamily: fontFamily.poppins_medium,
    },
    totalAmount: {
      fontSize: fontSizes.lg,
      color: theme.primary_color,
      fontFamily: fontFamily.poppins_medium,
    },
    size: {
      fontSize: fontSizes.xs,
      color: theme.gray,
      fontFamily: fontFamily.playfair_regular,
    },
    qty: {
      fontSize: fontSizes.xs,
      color: theme.gray,
      fontFamily: fontFamily.playfair_regular,
      marginLeft: ms(8),
      lineHeight: ms(20),
    },
    qtyBtn: {
      minWidth: ms(60),
      height: ms(30),
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
    },
    incBtn: {
      width: ms(20),
      height: ms(20),
      justifyContent: 'center',
      backgroundColor: theme?.primary_color,
      borderRadius: ms(2),
      alignItems: 'center',
    },
    decBtn: {
      width: ms(20),
      height: ms(20),
      justifyContent: 'center',
      backgroundColor: theme?.primary_shade,
      borderRadius: ms(2),
      alignItems: 'center',
    },
    qtyText: {
      fontSize: fontSizes.base,
      fontFamily: fontFamily.poppins_medium,
      color: theme?.text,
    },
    bottomCont: {
      width: '100%',
      minHeight: s(100),
      borderTopWidth: 0.6,
      borderColor: theme?.primary_shade,
      padding: ms(5),
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      // position: 'absolute',
      // bottom: ms(70),
    },
    amountCont: {
      width: '100%',
      minHeight: s(60),
      marginVertical: vs(15),
      borderColor: theme?.primary_shade,
      justifyContent: 'space-between',

      // alignItems: 'center',
    },
    promocodeinputwrapper: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 0.6,
      borderRadius: ms(30),
      backgroundColor: theme?.primary_color,
      height: s(40),
    },
    inputs: {
      width: '80%',
      height: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 0.6,
      borderRadius: ms(30),
      paddingLeft: ms(15),
      backgroundColor: theme?.background,
    },
    rowamount: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: ms(10),
      backgroundColor: theme?.background,
    },
    applyBtn: {
      width: ms(70),
      padding: ms(10),
    },
    apply: {
      color: theme?.background,
      fontFamily: fontFamily.playfair_medium,
    },
    checkoutBtn: {
      width: ms(170),
    },
    devider: {
      height: hp(10),
    },
    lable: {
      fontSize: fontSizes.base,
      fontFamily: fontFamily.playfair_medium,
      color: theme?.gray,
    },
    value: {
      fontSize: fontSizes.base,
      fontFamily: fontFamily.poppins_medium,
      color: theme?.text,
    },
  });
