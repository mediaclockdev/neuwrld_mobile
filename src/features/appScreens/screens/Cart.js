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
import React, {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {getItem} from '../../../utils/storage';
import CartPlaceholder from '../Skeleton/CartPlaceholder';
import {useTheme} from '../../../context/ThemeContext';
import {hp, ms, s, vs} from '../../../utils/responsive';
import {fontFamily, fontSizes} from '../../../theme/typography';
import CustomButton from '../../../components/CustomButton';
import {navigate} from '../../../utils/rootNavigation';

const Cart = () => {
  const [cart, setCart] = useState(null); // null = loading state
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const getProducts = async () => {
    let product = await getItem('cart');
    setCart(product ?? 'none');
  };
  let totalPrice = 0;

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        getProducts();
      }, 1500);
    }, []),
  );

  if (cart === null) {
    return <CartPlaceholder />;
  }

  const _renderItem = ({item, index}) => {
    return (
      <View key={item?.id} style={styles.cardRow}>
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
        <View style={styles.qtyBtn}>
          <TouchableOpacity style={styles.decBtn}>
            <Text style={styles.qtyText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyText}>1</Text>

          <TouchableOpacity style={styles.incBtn}>
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
  return (
    <View style={styles.parent}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <Text style={styles.headerText}>My Cart</Text>

        <FlatList
          data={cart}
          keyExtractor={({item, index}) => item?.id?.toString()}
          renderItem={_renderItem}
          scrollEnabled={false}
          ListEmptyComponent={() => {
            return <Text>Your cart is empty</Text>;
          }}
        />

        <View style={styles.amountCont}>
          <View style={styles.promocodeinputwrapper}>
            <TextInput style={styles.inputs} placeholder="promo code..." />
            <TouchableOpacity style={styles.applyBtn}>
              <Text style={styles.apply}>Apply</Text>
            </TouchableOpacity>
          </View>

          {/* // price breakup // */}
          <View style={styles.rowamount}>
            <Text style={styles.lable}>Total amount</Text>
            <Text style={styles.value}>$300</Text>
          </View>
          <View style={styles.rowamount}>
            <Text style={styles.lable}>Payable amount</Text>
            <Text style={styles.value}>$300</Text>
          </View>
          <View style={styles.rowamount}>
            <Text style={styles.lable}>Prpmo Code discound</Text>
            <Text style={styles.value}>$0</Text>
          </View>

          <View style={styles.bottomCont}>
            <View>
              <Text style={styles.headerText}>Total Payable</Text>
              <Text style={styles.totalAmount}>300$</Text>
            </View>
            <CustomButton
              onPress={() =>
                navigate('Checkout', {
                  cartData: cart,
                })
              }
              title={'Checkout'}
              btnStyle={styles.checkoutBtn}
            />
          </View>
        </View>
        <View style={styles.devider} />
      </ScrollView>
    </View>
  );
};

export default Cart;

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
      alignItems: 'center',
    },
    promocodeinputwrapper: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 0.6,
      borderRadius: ms(30),
      backgroundColor: theme?.primary_color,
    },
    inputs: {
      width: '80%',
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
