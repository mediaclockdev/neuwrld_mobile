import {
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  View,
  FlatList,
} from 'react-native';
import React from 'react';
import {useTheme} from '../../../context/ThemeContext';
import {fontFamily, fontSizes} from '../../../theme/typography';
import {hp, ms, vs} from '../../../utils/responsive';
import SubHeader from '../components/SubHeader';
import {setting} from '../../../utils/globalJson';
import {ICONS} from '../../../theme/colors';
import {goBack, navigate} from '../../../utils/rootNavigation';
import CustomButton from '../../../components/CustomButton';

const Checkout = ({route}) => {
  const {cartData} = route?.params;
  const {theme} = useTheme();
  const styles = createStyles(theme);

  const _renderItem = ({item, index}) => {
    return (
      <View
        key={item?.id}
        style={[
          styles.cardRow,
          {
            borderBottomWidth: cartData?.length - 1 == index ? 0 : 0.6,
          },
        ]}>
        <View style={styles.row}>
          <Image
            source={{uri: item?.productImage}}
            style={styles.productImage}
          />
          <View style={{marginLeft: ms(10)}}>
            <Text style={styles.title}>{item?.title}</Text>
            <Text style={styles.size}>
              Size : {item?.selectedSize ?? 'free size'} ,
              <Text style={styles.qty}> Qty : 1</Text>
            </Text>
            <Text style={styles.amount}>${item?.price}</Text>
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
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                marginTop: ms(10),
                justifyContent: 'space-between',
              }}>
              <Image source={ICONS.location_pin} style={styles.pin} />
              <View style={{width: '70%', marginLeft: ms(-10)}}>
                <Text style={styles.addressType}>Home</Text>
                <Text style={styles.address}>
                  Address 1: Building Number: 14 Street Name: DN Block, College
                  More State: West Bengal City: Kolkata Post Code: 700091
                </Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigate('AddressScreen', {
                    cartData: cartData,
                  })
                }
                style={styles.changeAddBtn}>
                <Text style={styles.addChnage}>Change</Text>
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            ListHeaderComponent={
              <Text style={styles.productList}>Product List</Text>
            }
            showsVerticalScrollIndicator={false}
            data={cartData}
            keyExtractor={({item, index}) => item?.id?.toString()}
            renderItem={_renderItem}
            scrollEnabled={false}
          />
          <View style={styles.devider} />
        </ScrollView>
      </View>

      <View style={styles.bottom}>
        <CustomButton
          onPress={() =>
            navigate('Payment', {
              cartData: cartData,
            })
          }
          title={'Continue To Payment'}
          btnStyle={styles.checkoutBtn}
        />
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
      alignItems: 'center',
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

    cardRow: {
      width: '100%',
      minHeight: ms(80),
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
      height: ms(80),
      resizeMode: 'cover',
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
    devider: {
      height: hp(15),
    },
    checkoutBtn: {
      width: '100%',
      marginTop: ms(20),
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
  });
