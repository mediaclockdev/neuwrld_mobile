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
import {hp, ms, s, vs} from '../../../utils/responsive';
import {fontFamily, fontSizes} from '../../../theme/typography';
import CustomButton from '../../../components/CustomButton';
import {goBack, navigate} from '../../../utils/rootNavigation';
import {useDispatch, useSelector} from 'react-redux';
import {
  getCartRequest,
  getCouponRequest,
  handleCartRemoveRequest,
} from '../appReducer';
import {postApi} from '../../../api/requestApi';
import {usePopup} from '../../../context/PopupContext';

const Cart = () => {
  const {customerDash, isLoading, appliedCoupon, cartData} = useSelector(
    state => state.App,
  );

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
            'Please sing up to use this ammezing feature ,and experience the world of fashion   🎉',
          confirmText: 'Sign up to explore',
          cancelText: 'Cancle',
          showCancel: true,
          onConfirm: () => (navigate('Signup'), setShowPopupVisible(false)),
          onCancel: () => goBack(),
        });
      } else {
        dispatch(getCartRequest(appliedCoupon?.code || ''));
      }
    }, [appliedCoupon]),
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
          dispatch(
            handleCartRemoveRequest({
              product_variant_id: showModal?.item?.product_variant_id,
            }),
          );
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
            <Text style={styles.title}>{item?.name}</Text>
            <Text style={styles.size}>
              Size : {item?.selectedSize ?? 'free size'} ,
              <Text style={styles.qty}> Qty : {item?.quantity}</Text>
            </Text>
            <Text style={styles.amount}>${item?.price}</Text>
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

  const handlePromoCode = () => {};
  if (isLoading) {
    return <CartPlaceholder />;
  } else {
    return (
      <View style={styles.parent}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}>
          <Text style={styles.headerText}>My Cart</Text>

          <FlatList
            data={cartData?.cart_items}
            keyExtractor={(item, index) => item?.product_variant_id?.toString()}
            renderItem={_renderItem}
            scrollEnabled={false}
            ListEmptyComponent={() => {
              return (
                <Text style={{color: theme?.text}}>Your cart is empty</Text>
              );
            }}
          />

          {cartData?.cart_summary && (
            <View style={styles.amountCont}>
              <View style={styles.promocodeinputwrapper}>
                <TextInput
                  onChangeText={te => setPromocode(te)}
                  style={styles.inputs}
                  placeholder="promo code..."
                  value={promocode}
                />
                <TouchableOpacity
                  onPress={() => handlePromoCode()}
                  style={styles.applyBtn}>
                  <Text style={styles.apply}>
                    {appliedCoupon?.code ? 'Applied' : 'Apply'}
                  </Text>
                </TouchableOpacity>
              </View>
              <Text
                onPress={() => {
                  dispatch(getCouponRequest());
                  navigate('CouponList');
                }}
                style={styles.couponcode}>
                View available coupon code
              </Text>

              {/* // price breakup // */}
              <View style={styles.rowamount}>
                <Text style={styles.lable}>Total amount</Text>
                <Text style={styles.value}>
                  {cartData?.cart_summary?.raw_subtotal}
                </Text>
              </View>
              <View style={styles.rowamount}>
                <Text style={styles.lable}>Tax diduction</Text>
                <Text style={styles.value}>
                  {cartData?.cart_summary?.total_tax}
                </Text>
              </View>
              <View style={styles.rowamount}>
                <Text style={styles.lable}>Prpmo Code discound</Text>
                <Text style={styles.value}>
                  {cartData?.cart_summary?.coupon_discount}
                </Text>
              </View>
              <View style={styles.rowamount}>
                <Text style={styles.lable}>Payable amount</Text>
                <Text style={styles.value}>
                  {cartData?.cart_summary?.final_amount}
                </Text>
              </View>

              <View style={styles.bottomCont}>
                <View>
                  <Text style={styles.headerText}>Total Payable</Text>
                  <Text style={styles.totalAmount}>
                    {cartData?.cart_summary?.final_amount}
                  </Text>
                </View>
                <CustomButton
                  // onPress={() =>
                  //   navigate('Checkout', {
                  //     cartData: cart,
                  //   })
                  // }
                  title={'Checkout'}
                  loading={btnLoader}
                  btnStyle={styles.checkoutBtn}
                />
              </View>
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
      paddingHorizontal: ms(15),
    },
    headerText: {
      fontSize: fontSizes.lg,
      color: theme.text,
      fontFamily: fontFamily.playfair_semiBold,
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
      marginTop: vs(20),
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
      height: ms(80),
      resizeMode: 'cover',
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
      width: ms(100),
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
