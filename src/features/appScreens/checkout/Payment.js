import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Platform,
  Image,
} from 'react-native';
import {useTheme} from '../../../context/ThemeContext';
import {goBack, navigate} from '../../../utils/rootNavigation';
import SubHeader from '../components/SubHeader';
import CustomButton from '../../../components/CustomButton';
import {ms, vs, s, rr} from '../../../utils/responsive';
import {fontFamily, fontSizes} from '../../../theme/typography';
import {usePopup} from '../../../context/PopupContext';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const addresses = [
  {
    id: '1',
    label: 'PayPal',
    icon: 'https://i.pcmag.com/imagery/reviews/068BjcjwBw0snwHIq0KNo5m-15..v1602794215.png',
  },
  {
    id: '2',
    label: 'Apple Pay',
    icon: 'https://www.apple.com/v/apple-pay/k/images/overview/og__dq5nejr4bg02_image.png?202506122237',
  },
  {
    id: '3',
    label: 'google Pay',
    icon: 'https://logos-world.net/wp-content/uploads/2024/10/Google-Pay-Logo.png',
  },
];

export default function Payment() {
  const {customerDash, isLoading, savedAddress, appliedCoupon, cartData} =
    useSelector(state => state.App);

  const {theme} = useTheme();
  const nav = useNavigation();
  const {showPopup} = usePopup();

  const styles = createStyles(theme);

  const handlePayment = () => {
    setTimeout(() => {
      showPopup({
        type: 'success',
        title: 'Order Placed!',
        message: 'Payment Success , thank you for shopping with us  🎉',
        confirmText: 'Continue',
        onConfirm: () => nav.navigate('MyTabs', {screen: 'Home'}),
      });
    }, 500);
  };

  const [selectedId, setSelectedId] = useState('1');

  const renderItem = ({item}) => {
    const isSelected = item.id === selectedId;

    return (
      <TouchableOpacity
        style={styles.addressRow}
        onPress={() => setSelectedId(item.id)}
        activeOpacity={0.8}>
        <View style={styles.addressLeft}>
          <Image source={{uri: item.icon}} style={styles.icon} />
          <Text style={styles.addressLabel}>{item.label}</Text>
        </View>

        {/* Custom Radio Button */}
        <View
          style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}>
          {isSelected && <View style={styles.radioInner} />}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <SubHeader
        onPressLeftIcon={() => goBack()}
        centerlabel={'Payment Methods'}
        hideRigthIcon={true}
      />

      <FlatList
        data={addresses}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{marginTop: vs(50)}}
      />

      {/* Bottom Fixed Button */}
      <View style={styles.bottomBar}>
        <CustomButton
          onPress={() => handlePayment()}
          title={'Continue'}
          btnStyle={styles.checkoutBtn}
        />
      </View>
    </View>
  );
}

const createStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },

    addressRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: vs(14),
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
      marginHorizontal: ms(16),
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

    bottomBar: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#fff',
      padding: 16,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,

      // iOS Shadow
      shadowColor: '#000',
      shadowOffset: {width: 0, height: -3},
      shadowOpacity: 0.1,
      shadowRadius: 4,

      // Android Shadow
      elevation: 6,
    },

    applyBtn: {
      backgroundColor: '#6B4226',
      paddingVertical: 14,
      borderRadius: 30,
      alignItems: 'center',
    },

    applyText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },

    orderDetalsContainer: {
      padding: ms(10),
    },
    rowamount: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: ms(10),
      backgroundColor: theme?.background,
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
    icon: {
      width: ms(70),
      height: ms(30),
    },
  });
