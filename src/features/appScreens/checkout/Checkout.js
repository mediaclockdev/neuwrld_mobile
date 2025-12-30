import {
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  View,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
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
import {getCouponRequest} from '../appReducer';

const Checkout = ({route}) => {
  const {customerDash, isLoading, savedAddress, appliedCoupon, cartData} =
    useSelector(state => state.App);
  const [promocode, setPromocode] = useState(appliedCoupon?.code ?? '');
  const [btnLoader, setBtnLoader] = useState(false); // null = loading state

  const {theme} = useTheme();
  const styles = createStyles(theme);
  const dispatch = useDispatch();

  const handleCheckout = () => {
    if (savedAddress?.addresses?.length > 0) {
      let isDefault = savedAddress?.addresses?.find(
        item => item?.primary == true,
      );
      isDefault
        ? navigate('Payment')
        : (ToastService.info('Please select your shipping address'),
          navigate('AddressScreen'));
    } else {
      ToastService.info('Please add your shipping address'),
        navigate('AddressScreen');
    }
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

  const _renderItem = ({item, index}) => {
    return (
      <View key={item?.product_variant_id} style={styles.cardRow}>
        <View style={styles.row}>
          <Image source={{uri: item?.image}} style={styles.productImage} />
          <View style={{marginLeft: ms(10), maxWidth: '80%'}}>
            <Text style={styles.title}>{item?.name}</Text>
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
                savedAddress?.addresses?.length &&
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
                  onPress={() => {
                    handleCheckout();
                  }}
                  title={'Continue To Payment'}
                  loading={btnLoader}
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
