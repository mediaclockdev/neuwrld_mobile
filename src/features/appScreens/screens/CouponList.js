// import React from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   TouchableOpacity,
//   ActivityIndicator,
// } from 'react-native';
// import {useDispatch, useSelector} from 'react-redux';
// import SubHeader from '../components/SubHeader';
// import {goBack} from '../../../utils/rootNavigation';
// import {useTheme} from '../../../context/ThemeContext';
// import {getCartRequest, setAppliedCoupon} from '../appReducer';

// const CouponList = ({coupons = []}) => {
//   const {customerDash, isLoading, cartData, coupon_codes} = useSelector(
//     state => state.App,
//   );

//   const dispatch = useDispatch();
//   const {theme} = useTheme();
//   const styles = createStyles(theme);
//   const _applyCoupon = item => {
//     dispatch(getCartRequest(item?.code));
//     dispatch(setAppliedCoupon(item))
//   };

//   const renderItem = ({item}) => {
//     const expired = !item?.is_active;
//     const is_coupon_applied = item?.id == cartData?.coupon?.coupon_id;

//     return (
//       <View style={[styles.card, expired && styles.disabledCard]}>
//         <View style={styles.row}>
//           <View style={styles.codeBadge}>
//             <Text style={styles.codeText}>{item.code}</Text>
//           </View>

//           <TouchableOpacity>
//             {/* <Icon name="copy-outline" size={20} color="#555" /> */}
//           </TouchableOpacity>
//         </View>

//         {/* Discount */}
//         <Text style={styles.discount}>
//           {item.type === 'Percentage'
//             ? `${item.discount_amount}% OFF`
//             : `₹${item.discount_amount} OFF`}
//         </Text>

//         {/* Divider */}
//         <View style={styles.dottedLine} />

//         {/* Dates */}
//         <Text style={styles.valid}>
//           Valid: {item.valid_from} → {item.valid_to}
//         </Text>

//         {/* Min order */}
//         {item.min_order_value > 0 && (
//           <Text style={styles.extraText}>
//             Min order: ₹{item.min_order_value}
//           </Text>
//         )}

//         {/* Apply */}
//         <TouchableOpacity
//           disabled={expired}
//           style={[styles.applyBtn, expired && styles.disabledBtn , is_coupon_applied &&  styles.appliedBtn]}
//           onPress={() => _applyCoupon(item)}>
//           <Text style={styles.applyText}>
//             {expired ? 'Expired' : is_coupon_applied ? 'Applied' : 'Apply'}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <SubHeader
//         onPressLeftIcon={() => {
//           goBack();
//         }}
//         centerlabel={'Coupon Codes'}
//         hideRigthIcon={true}
//       />
//       <FlatList
//         data={coupon_codes}
//         keyExtractor={item => item.id.toString()}
//         renderItem={renderItem}
//         contentContainerStyle={{padding: 16}}
//         ListEmptyComponent={
//           isLoading ? (
//             <View
//               style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//               <ActivityIndicator color={theme?.primary_color} size={'small'} />
//               <Text style={{textAlign: 'center', marginTop: 20}}>
//                 Loading ...
//               </Text>
//             </View>
//           ) : (
//             <Text style={{textAlign: 'center', marginTop: 20}}>
//               No coupons available
//             </Text>
//           )
//         }
//       />
//     </View>
//   );
// };

// export default CouponList;

// const createStyles = theme =>
//   StyleSheet.create({
//     card: {
//       padding: 18,
//       marginBottom: 14,
//       backgroundColor: '#fff',
//       borderRadius: 16,
//       borderWidth: 1,
//       borderColor: '#eee',
//       elevation: 3,
//       shadowColor: '#000',
//       shadowOpacity: 0.1,
//       shadowRadius: 6,
//     },
//     disabledCard: {
//       opacity: 0.55,
//     },
//     row: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//     },
//     codeBadge: {
//       backgroundColor: '#f2e8ff',
//       paddingHorizontal: 12,
//       paddingVertical: 4,
//       borderRadius: 12,
//     },
//     codeText: {
//       fontSize: 16,
//       fontWeight: '700',
//       color: theme?.primary_color,
//     },
//     discount: {
//       fontSize: 22,
//       fontWeight: '700',
//       color: theme?.primary_color,
//       marginTop: 10,
//     },
//     dottedLine: {
//       borderStyle: 'dotted',
//       borderWidth: 1,
//       borderRadius: 1,
//       marginVertical: 12,
//       borderColor: '#ccc',
//     },
//     valid: {
//       fontSize: 12,
//       color: '#666',
//     },
//     extraText: {
//       marginTop: 4,
//       fontSize: 12,
//       color: '#444',
//     },
//     applyBtn: {
//       backgroundColor: theme?.primary_color,
//       paddingVertical: 10,
//       borderRadius: 10,
//       marginTop: 14,
//       alignItems: 'center',
//     },
//     disabledBtn: {
//       backgroundColor: '#888',
//     },
//     appliedBtn: {
//       backgroundColor: '#0aaf7ddb',
//     },
//     applyText: {
//       color: 'white',
//       fontWeight: '700',
//       fontSize: 14,
//     },
//   });



import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Clipboard,
} from 'react-native';
import {useSelector} from 'react-redux';
import SubHeader from '../components/SubHeader';
import {goBack} from '../../../utils/rootNavigation';
import {useTheme} from '../../../context/ThemeContext';
import { fontFamily } from '../../../theme/typography';

const CouponList = () => {
  const {coupon_codes, isLoading} = useSelector(state => state.App);
  const {theme} = useTheme();
  const styles = createStyles(theme);

  const copyCode = code => {
    Clipboard.setString(code);
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.card}>
        {/* Ticket cuts */}
        <View style={styles.cutLeft} />
        <View style={styles.cutRight} />

        {/* Coupon Code */}
        <Text style={styles.code}>{item.code}</Text>

        {/* Unlock message */}
        {item.min_order_value > 0 && (
          <Text style={styles.unlockText}>
            Add items worth ₹{item.min_order_value} more to unlock
          </Text>
        )}

        {/* Offer */}
        <View style={styles.offerRow}>
          <Text style={styles.offerIcon}>🏷️</Text>
          <Text style={styles.offerText}>
            {item.type === 'Percentage'
              ? `Get ${item.discount_amount}% OFF`
              : `Flat ₹${item.discount_amount} OFF`}
          </Text>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Copy */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.copyBtn}
          onPress={() => copyCode(item.code)}>
          <Text style={styles.copyText}>COPY CODE</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SubHeader
        centerlabel="Coupon"
        hideRigthIcon
        onPressLeftIcon={goBack}
      />

      <Text style={styles.sectionTitle}>Best offers for you</Text>

      <FlatList
        data={coupon_codes}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{padding: 16}}
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator
              style={{marginTop: 40}}
              color={theme?.primary_color}
            />
          ) : (
            <Text style={styles.emptyText}>No coupons available</Text>
          )
        }
      />
    </View>
  );
};

export default CouponList;

const createStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },

    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
                fontFamily: fontFamily.playfair_medium,

      marginHorizontal: 16,
      marginTop: 10,
      color: '#111',
    },


    card: {
      backgroundColor: '#fff',
      borderRadius: 14,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: '#eee',
      position: 'relative',
    },

    cutLeft: {
      position: 'absolute',
      left: -10,
      top: '45%',
      width: 20,
      height: 20,
      backgroundColor: '#fff',
      borderRadius: 10,
      borderRightWidth: 1,
      borderColor: '#eee',
    },

    cutRight: {
      position: 'absolute',
      right: -10,
      top: '45%',
      width: 20,
      height: 20,
      backgroundColor: '#fff',
      borderRadius: 10,
      borderLeftWidth: 1,
      borderColor: '#eee',
    },

    code: {
      fontSize: 18,
      fontWeight: '700',
      letterSpacing: 1,
      color: '#000',
    },

    unlockText: {
      marginTop: 6,
      fontSize: 13,
      color: '#777',
    },

    offerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
    },

    offerIcon: {
      fontSize: 16,
      marginRight: 6,
    },

    offerText: {
      fontSize: 14,
      fontWeight: '600',
      color: '#111',
    },

    divider: {
      height: 1,
      backgroundColor: '#eee',
      marginVertical: 14,
    },

    copyBtn: {
      backgroundColor: '#f3f3f3',
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
    },

    copyText: {
      fontSize: 14,
      fontWeight: '700',
      letterSpacing: 1,
      color: '#000',
    },

    emptyText: {
      textAlign: 'center',
      marginTop: 40,
      color: '#777',
    },
  });

