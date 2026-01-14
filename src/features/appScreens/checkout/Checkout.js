import {
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  View,
  FlatList,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useTheme} from '../../../context/ThemeContext';
import {fontFamily, fontSizes} from '../../../theme/typography';
import {hp, ms, rr, s, vs} from '../../../utils/responsive';
import SubHeader from '../components/SubHeader';
import {setting} from '../../../utils/globalJson';
import {ICONS} from '../../../theme/colors';
import {goBack, navigate} from '../../../utils/rootNavigation';
import CustomButton from '../../../components/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {ToastService} from '../../../utils/toastService';
import {TextInput} from 'react-native-gesture-handler';
import {
  getCartRequest,
  getCouponRequest,
  setAppliedCoupon,
} from '../appReducer';
import {useStripe} from '@stripe/stripe-react-native';
import {getApi, postApi} from '../../../api/requestApi';
import {usePopup} from '../../../context/PopupContext';
import {ALL_APi_LIST} from '../../../utils/apis';
import {parsePriceToNumber} from '../../../utils/StringToBNum';

const Checkout = ({route}) => {
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const orderRef = useRef(null); // idempotency anchor
  const payment_intent_id_ref = useRef(null); // idempotency anchor

  const {customerDash, isLoading, savedAddress, appliedCoupon, cartData} =
    useSelector(state => state.App);
  const [promocode, setPromocode] = useState('');
  const [btnLoader, setBtnLoader] = useState(false); // null = loading state

  const {theme} = useTheme();
  const styles = createStyles(theme);
  const dispatch = useDispatch();

  const [sheetReady, setSheetReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const {showPopup} = usePopup();

  console.log('appliedCoupon', appliedCoupon, promocode);

  const createOrder = async () => {
    if (orderRef.current) return orderRef.current; // 🔒 idempotent

    const payload = {
      payment_method: 1,
      shipping_address: cartData?.shipping_address?.id,
      billing_address: cartData?.billing_address?.id,
      coupon_id:
        appliedCoupon?.coupon_id ?? cartData?.cart_summary?.coupon_id ?? '',
      coupon_discount:
        appliedCoupon?.discount ??
        cartData?.cart_summary?.coupon_discount ??
        '',
    };
    console.log(
      "payload",payload
    )
    const res = await postApi('checkout/process', payload).catch(err => {
      console.log('error', err?.response);
    });
    const orderNumber = res?.data?.order_number;

    if (!orderNumber) {
      throw new Error('Order creation failed');
    }

    orderRef.current = orderNumber;
    return orderNumber;
  };

  const getStripeClientSecret = async orderNumber => {    
    const res = await postApi('checkout/stripe/init', {
      order_number: orderNumber,
    });

    const clientSecret = res?.data?.payment_intent_client_secret;
    // 🔐 store payment intent id
    payment_intent_id_ref.current = res?.data?.payment_intent_id;

    if (!clientSecret || !clientSecret.startsWith('pi_')) {
      throw new Error('Invalid Stripe client secret');
    }

    return clientSecret;
  };

  const initStripeSheet = async clientSecret => {
    setSheetReady(false);
    const {error} = await initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
      merchantDisplayName: 'Neuwrld Fashion Application',
    });

    if (error) {
      throw error;
    }

    setSheetReady(true);
  };

  const updateOrder = () => {
    postApi('checkout/stripe/confirm', {
      order_number: orderRef.current,
      payment_intent_id: payment_intent_id_ref.current,
    })
      .then(res => {
        handlePayment();
      })
      .catch(err => console.log('errrr', err));
  };

  const presentStripeSheet = async () => {
    const {error} = await presentPaymentSheet();

    if (error) {
      throw error;
    }
  };

  const startCheckout = async () => {
    if (loading) return;

    try {
      setLoading(true);

      if (!cartData?.shipping_address?.id) {
        Alert.alert('Address required', 'Please select shipping address');
        return;
      }

      const orderNumber = await createOrder();
      const clientSecret = await getStripeClientSecret(orderNumber);

      await initStripeSheet(clientSecret);
      await presentStripeSheet();

      // ⚠️ NOT marking PAID
      await updateOrder();
      ToastService.info(
        'Payment Processing',
        'We are confirming your payment. You will be notified shortly.',
      );
    } catch (err) {
      console.log('Stripe checkout error:', err);
      Alert.alert('Payment failed', err?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const resetCheckoutRefs = () => {
    orderRef.current = null;
    payment_intent_id_ref.current = null;
    setSheetReady(false);
  };

  useEffect(() => {
    if (appliedCoupon) {
      setPromocode(appliedCoupon?.coupon_code ?? appliedCoupon?.code ?? '');
    }

    return () => {
      resetCheckoutRefs();
    };
  }, [appliedCoupon]);

  const handlePayment = () => {
    showPopup({
      type: 'success',
      title: 'Order Placed!',
      message: 'Payment Success , thank you for shopping with us  🎉',
      confirmText: 'Continue to explore',
      onConfirm: () => navigate('MyTabs', {screen: 'Home'}),
    });
  };

  const renderItem = ({item}) => {
    let isDefault = item?.primary == true;
    if (isDefault) {
      return (
        <TouchableOpacity style={styles.addressRow} activeOpacity={0.8}>
          <View style={styles.addressLeft}>
            <Text style={styles.addressLabel}>{item.name}</Text>
            <Text style={styles.addressText}>
              {item?.city_name} , {item?.state_name} , {item?.country_name}
            </Text>
            <Text style={styles.addressText}>
              {item?.address_line_1} , {item?.pincode}
            </Text>
            <Text style={styles.addressText}>contact no : {item?.phone}</Text>
          </View>

          {/* Custom Radio Button */}
          <View style={[styles.radioOuter, styles.radioOuterSelected]}>
            <View style={styles.radioInner} />
          </View>
        </TouchableOpacity>
      );
    }
  };
  console.log(
    'cartData?.cart_summary?.coupon_discount',
    cartData?.cart_summary?.coupon_discount,
  );
  const _renderItem = ({item, index}) => {
    return (
      <View key={item?.product_variant_id} style={styles.cardRow}>
        <View style={styles.row}>
          <Image source={{uri: item?.image}} style={styles.productImage} />
          <View style={{marginLeft: ms(10), maxWidth: '80%'}}>
            <Text style={styles.title}>{item?.product_name}</Text>
            <Text style={styles.size}>
              Size : {item?.selectedSize ?? 'free size'} ,
              <Text style={styles.qty}> Qty : {item?.quantity}</Text>
            </Text>
            <Text style={styles.amount}>{item?.price}</Text>
          </View>
        </View>
      </View>
    );
  };

  const _applyCoupon = item => {
    const rawAmount = parsePriceToNumber(item?.final_amount);
    postApi('coupon/apply', {
      coupon_code: promocode,
      order_amount: rawAmount,
    }).then(res => {
      dispatch(setAppliedCoupon(res?.data));
      console.log('res coupon ', res?.data);
      if (res?.data?.discount) {
        dispatch(getCartRequest(promocode));
        ToastService.success(
          'Coupon Applied 🎉',
          'Discount has been successfully added to your cart.',
        );
      }
    });
  };

  return (
    <View style={styles.parent}>
      <SubHeader onPressLeftIcon={() => goBack()} centerlabel={'Checkout'} />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.shippingAddressCont}>
            <Text style={styles.headerText}>Shipping Address</Text>

            <FlatList
              data={savedAddress?.addresses}
              keyExtractor={item => item.id}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <>
                  <TouchableOpacity
                    onPress={() => {
                      navigate('AddAddressScreen');
                    }}
                    style={styles.addNewBtn}>
                    <Text style={styles.addNewText}>
                      + Add New Shipping Address
                    </Text>
                  </TouchableOpacity>
                </>
              }
              ListFooterComponent={
                savedAddress?.addresses?.length && (
                  <>
                    <TouchableOpacity
                      onPress={() => {
                        navigate('AddressScreen');
                      }}
                      style={styles.addNewBtn}>
                      <Text style={styles.addNewText}>
                        + Change Shipping Address
                      </Text>
                    </TouchableOpacity>
                  </>
                )
              }
            />
          </View>
          <FlatList
            ListHeaderComponent={
              <Text style={styles.headerText}>Product List</Text>
            }
            showsVerticalScrollIndicator={false}
            data={cartData?.cart_items}
            keyExtractor={(item, index) => item?.product_variant_id?.toString()}
            renderItem={_renderItem}
            scrollEnabled={false}
          />

          {cartData?.cart_summary && (
            <View style={styles.amountCont}>
              <View style={styles.promocodeinputwrapper}>
                <TextInput
                  onChangeText={te => setPromocode(te)}
                  style={styles.inputs}
                  placeholder="promo code..."
                  value={promocode}
                  placeholderTextColor={'#696969'}
                />
                <TouchableOpacity
                  onPress={() => _applyCoupon(cartData?.cart_summary)}
                  disabled={promocode || appliedCoupon ? false : true}
                  style={[
                    styles.applyBtn,
                    {
                      opacity: promocode || appliedCoupon ? 1 : 0.3,
                    },
                  ]}>
                  <Text style={styles.apply}>{'Apply'}</Text>
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
                <Text style={styles.lable}>Total Amount</Text>
                <Text style={styles.value}>
                  {cartData?.cart_summary?.subtotal}
                </Text>
              </View>
              <View style={styles.rowamount}>
                <Text style={styles.lable}>Tax Deductions</Text>
                <Text style={styles.value}>
                  {cartData?.cart_summary?.total_tax}
                </Text>
              </View>
              <View style={styles.rowamount}>
                <Text style={styles.lable}>Promo Code Discount</Text>
                <Text style={styles.value}>
                  {cartData?.cart_summary?.discount}
                </Text>
              </View>
              <View style={styles.rowamount}>
                <Text style={styles.lable}>Payable Amount</Text>
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
                  onPress={() => {
                    startCheckout();
                  }}
                  title={'Continue To Payment'}
                  loading={btnLoader || loading}
                  btnStyle={styles.checkoutBtn}
                />
              </View>
            </View>
          )}

          <View style={styles.devider} />
        </ScrollView>
      </View>
    </View>
  );
};

export default Checkout;

const createStyles = theme =>
  StyleSheet.create({
    parent: {
      flex: 1,
      backgroundColor: theme?.background,
    },
    container: {
      padding: ms(15),
      // alignItems: 'center',
    },
    headerText: {
      fontSize: fontSizes.lg,
      color: theme.text,
      fontFamily: fontFamily.playfair_semiBold,
    },
    pin: {
      width: ms(20),
      height: ms(20),
      justifyContent: 'center',
      alignItems: 'center',
    },
    addressType: {
      fontSize: fontSizes.base,
      fontFamily: fontFamily.playfair_medium,
      color: theme.text,
    },
    address: {
      fontSize: fontSizes.sm,
      fontFamily: fontFamily.playfair_medium,
      color: theme.gray,
    },
    productList: {
      fontSize: fontSizes.base,
      fontFamily: fontFamily.playfair_medium,
      color: theme.text,
      marginTop: ms(20),
    },
    changeAddBtn: {
      width: ms(70),
      height: ms(25),
      borderWidth: 1,
      borderRadius: ms(30),
      justifyContent: 'center',
      alignItems: 'center',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    icons: {
      width: ms(30),
      height: ms(30),
      resizeMode: 'cover',
    },
    title: {
      fontSize: fontSizes.base,
      color: theme.text,
      fontFamily: fontFamily.playfair_medium,
      lineHeight: ms(20),
    },
    incBtn: {
      width: ms(20),
      height: ms(20),
      justifyContent: 'center',
      alignItems: 'center',
    },
    rightIcons: {
      width: '80%',
      height: '80%',
      resizeMode: 'cover',
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
      height: ms(90),
      resizeMode: 'stretch',
      borderRadius: ms(12),
    },

    title: {
      fontSize: fontSizes.base,
      color: theme.text,
      fontFamily: fontFamily.playfair_medium,
      lineHeight: ms(20),
    },
    amount: {
      fontSize: fontSizes.sm,
      color: theme.text,
      fontFamily: fontFamily.poppins_medium,
    },
    bottom: {
      position: 'absolute',
      width: '100%',
      height: ms(80),
      bottom: 0,
      backgroundColor: theme?.background,
      paddingHorizontal: ms(10),
      borderTopLeftRadius: ms(10),
      borderTopRightRadius: ms(10),

      shadowColor: '#000',
      shadowOffset: {width: 0, height: -3}, // negative height → top shadow
      shadowOpacity: 0.1,
      shadowRadius: 4,

      // Shadow for Android
      elevation: 6, // adds shadow
    },

    addressRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: vs(14),
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
      margin: ms(16),
    },

    addressLeft: {
      flex: 1,
      paddingRight: 10,
    },

    addressLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: '#000',
      marginBottom: 4,
    },

    addressText: {
      fontSize: 14,
      color: '#555',
    },

    radioOuter: {
      width: 22,
      height: 22,
      borderRadius: 11,
      borderWidth: 2,
      borderColor: '#6B4226', // brown border
      alignItems: 'center',
      justifyContent: 'center',
    },

    radioInner: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: '#6B4226',
    },
    addNewBtn: {
      marginVertical: vs(20),
      marginHorizontal: ms(16),
      paddingVertical: vs(14),
      borderWidth: s(1),
      borderStyle: 'dashed',
      borderRadius: rr(10),
      borderColor: '#6B4226',
      alignItems: 'center',
      justifyContent: 'center',
    },

    addNewText: {
      fontSize: 15,
      color: '#6B4226',
      fontWeight: '500',
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
      width: ms(180),
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
    couponcode: {
      fontSize: fontSizes.sm,
      color: theme.primary_color,
      textDecorationLine: 'underline',

      fontFamily: fontFamily.playfair_boldItalic,
      paddingVertical: ms(10),
      textAlign: 'right',
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
  });
