import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Platform,
} from 'react-native';
import {useTheme} from '../../../context/ThemeContext';
import {goBack, navigate} from '../../../utils/rootNavigation';
import SubHeader from '../components/SubHeader';
import CustomButton from '../../../components/CustomButton';
import {ms, vs, s, rr} from '../../../utils/responsive';
import {fontFamily, fontSizes} from '../../../theme/typography';
import {useDispatch, useSelector} from 'react-redux';
import {ALL_APi_LIST} from '../../../utils/apis';
import {postApi} from '../../../api/requestApi';
import {ToastService} from '../../../utils/toastService';
import {getAddressRequest} from '../appReducer';

const addresses = [
  {
    id: '1',
    label: 'Home',
    address: '1901 Thornridge Cir. Shiloh, Hawaii 81063',
  },
  {
    id: '2',
    label: 'Office',
    address: '4517 Washington Ave. Manchester, Kentucky 39495',
  },
  {
    id: '3',
    label: 'Parent’s House',
    address: '8502 Preston Rd. Inglewood, Maine 98380',
  },
  {
    id: '4',
    label: 'Friend’s House',
    address: '2464 Royal Ln. Mesa, New Jersey 45463',
  },
];

export default function AddressScreen() {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const {
    customerDash,
    isLoading,
    savedAddress,
    userdetails,
    appliedCoupon,
    cartData,
  } = useSelector(state => state.App);
  const [loading, setLoading] = useState(false);

  const [selectedId, setSelectedId] = useState('');
  const dispatch = useDispatch();

  const onSubmit = () => {
    setLoading(true);
    let payload = {
      id: selectedId?.id,
      name: selectedId?.name,
      email: userdetails?.email,
      phone: selectedId?.phone,
      pincode: selectedId?.pincode,
      state_id: selectedId?.state_id,
      country_id: selectedId?.country_id,
      address_line_1: selectedId?.address_line_1,
      address_line_2: selectedId?.address_line_2,
      landmark: selectedId?.landmark,
      city_name: selectedId?.city_name,
      primary: true,
    };
    postApi(ALL_APi_LIST.address, payload)
      .then(res => {
        if (res?.data) {
          ToastService.success(
            'Your default address has been updated , happy shopping',
          );
          dispatch(getAddressRequest());
        }
        setLoading(false);
      })
      .catch(err => {
        console.log('err', err);
        setLoading(false);
      });
  };

  const renderItem = ({item}) => {
    const isSelected = item.id === selectedId?.id || item?.primary;

    return (
      <TouchableOpacity
        style={styles.addressRow}
        onPress={() => setSelectedId(item)}
        activeOpacity={0.8}>
        <View style={styles.addressLeft}>
          <Text style={styles.addressLabel}>{item.name}</Text>
          <Text style={styles.addressText}>
            {item?.city_name} , {item?.state_name} , {item.country_name}
          </Text>
          <Text style={styles.addressText}>
            {item?.address_line_1} , {item.pincode}
          </Text>
          <Text style={styles.addressText}>contact no : {item?.phone}</Text>
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
        centerlabel={'Shipping Address'}
      />

      <FlatList
        data={savedAddress?.addresses}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <>
            <TouchableOpacity
              onPress={() => {
                navigate('AddAddressScreen');
              }}
              style={styles.addNewBtn}>
              <Text style={styles.addNewText}>+ Add New Shipping Address</Text>
            </TouchableOpacity>
          </>
        }
      />

      {/* Bottom Fixed Button */}
      <View style={styles.bottomBar}>
        <CustomButton
          onPress={() => onSubmit()}
          title={'Apply & Continue'}
          loading={loading}
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
      paddingVertical: ms(10),
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
      marginBottom:100
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
  });
