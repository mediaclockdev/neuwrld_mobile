import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import SubHeader from '../components/SubHeader';
import {goBack} from '../../../utils/rootNavigation';
import {useTheme} from '../../../context/ThemeContext';
import {getCartRequest, setAppliedCoupon} from '../appReducer';

const CouponList = ({coupons = []}) => {
  const {customerDash, isLoading, cartData, coupon_codes} = useSelector(
    state => state.App,
  );

  const dispatch = useDispatch();
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const _applyCoupon = item => {
    dispatch(getCartRequest(item?.code));
    dispatch(setAppliedCoupon(item))
  };

  const renderItem = ({item}) => {
    const expired = !item?.is_active;
    const is_coupon_applied = item?.id == cartData?.coupon?.coupon_id;

    return (
      <View style={[styles.card, expired && styles.disabledCard]}>
        <View style={styles.row}>
          <View style={styles.codeBadge}>
            <Text style={styles.codeText}>{item.code}</Text>
          </View>

          <TouchableOpacity>
            {/* <Icon name="copy-outline" size={20} color="#555" /> */}
          </TouchableOpacity>
        </View>

        {/* Discount */}
        <Text style={styles.discount}>
          {item.type === 'Percentage'
            ? `${item.discount_amount}% OFF`
            : `₹${item.discount_amount} OFF`}
        </Text>

        {/* Divider */}
        <View style={styles.dottedLine} />

        {/* Dates */}
        <Text style={styles.valid}>
          Valid: {item.valid_from} → {item.valid_to}
        </Text>

        {/* Min order */}
        {item.min_order_value > 0 && (
          <Text style={styles.extraText}>
            Min order: ₹{item.min_order_value}
          </Text>
        )}

        {/* Apply */}
        <TouchableOpacity
          disabled={expired}
          style={[styles.applyBtn, expired && styles.disabledBtn , is_coupon_applied &&  styles.appliedBtn]}
          onPress={() => _applyCoupon(item)}>
          <Text style={styles.applyText}>
            {expired ? 'Expired' : is_coupon_applied ? 'Applied' : 'Apply'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SubHeader
        onPressLeftIcon={() => {
          goBack();
        }}
        centerlabel={'Coupon Codes'}
        hideRigthIcon={true}
      />
      <FlatList
        data={coupon_codes}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{padding: 16}}
        ListEmptyComponent={
          isLoading ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator color={theme?.primary_color} size={'small'} />
              <Text style={{textAlign: 'center', marginTop: 20}}>
                Loading ...
              </Text>
            </View>
          ) : (
            <Text style={{textAlign: 'center', marginTop: 20}}>
              No coupons available
            </Text>
          )
        }
      />
    </View>
  );
};

export default CouponList;

const createStyles = theme =>
  StyleSheet.create({
    card: {
      padding: 18,
      marginBottom: 14,
      backgroundColor: '#fff',
      borderRadius: 16,
      borderWidth: 1,
      borderColor: '#eee',
      elevation: 3,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 6,
    },
    disabledCard: {
      opacity: 0.55,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    codeBadge: {
      backgroundColor: '#f2e8ff',
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 12,
    },
    codeText: {
      fontSize: 16,
      fontWeight: '700',
      color: theme?.primary_color,
    },
    discount: {
      fontSize: 22,
      fontWeight: '700',
      color: theme?.primary_color,
      marginTop: 10,
    },
    dottedLine: {
      borderStyle: 'dotted',
      borderWidth: 1,
      borderRadius: 1,
      marginVertical: 12,
      borderColor: '#ccc',
    },
    valid: {
      fontSize: 12,
      color: '#666',
    },
    extraText: {
      marginTop: 4,
      fontSize: 12,
      color: '#444',
    },
    applyBtn: {
      backgroundColor: theme?.primary_color,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 14,
      alignItems: 'center',
    },
    disabledBtn: {
      backgroundColor: '#888',
    },
    appliedBtn: {
      backgroundColor: '#0aaf7ddb',
    },
    applyText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 14,
    },
  });
