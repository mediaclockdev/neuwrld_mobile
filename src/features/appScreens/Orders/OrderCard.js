import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import { ms, vs } from '../../../utils/responsive';

const OrderCard = ({order, onPress, theme}) => {
  const products = order.order_products;
  const styles = createStyles(theme);

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={onPress}>
      {/* Images */}
      <View style={styles.imageStack}>
        {products.slice(0, 2).map((p, i) => (
          <Image
            key={i}
            source={{uri: p.image}}
            style={[styles.image, {marginLeft: i * -12}]}
          />
        ))}
        {products.length > 2 && (
          <View style={styles.moreBadge}>
            <Text style={styles.moreText}>+{products.length - 2}</Text>
          </View>
        )}
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.orderId}>{order.order_number}</Text>

        <Text style={styles.meta}>
          {products.length > 1 ? 'items' : 'item'}  • {order.net_total}
        </Text>

        <View style={styles.statusPill}>
          <Text style={styles.statusText}>{order.order_status_label}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.white,
      borderRadius: 18,
      padding: ms(10),
      flexDirection: 'row',
      marginBottom: 14,
      shadowColor: theme.black,
      borderBottomWidth: 0.4,
      borderColor: theme?.primary_color,
     
    },
    imageStack: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    image: {
      width: 54,
      height: 70,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme?.primary_color,
    },
    moreBadge: {
      width: ms(54),
      height: vs(70),
      borderRadius: ms(12),
      backgroundColor: theme.primary_shade,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: -12,
       borderWidth: 1,
      borderColor: theme?.primary_color,
    },
    moreText: {
      color: theme.primary,
      fontWeight: '600',
    },
    info: {
      marginLeft: 14,
      flex: 1,
    },
    orderId: {
      fontSize: 15,
      fontWeight: '600',
      color: theme.text,
    },
    meta: {
      color: theme.gray,
      marginTop: 4,
      textTransform:'capitalize'
    },
    statusPill: {
      alignSelf: 'flex-start',
      backgroundColor: theme.primary_shade,
      borderRadius: 20,
      paddingHorizontal: 10,
      paddingVertical: 4,
      marginTop: 8,
    },
    statusText: {
      color: theme.primary,
      fontSize: 12,
      fontWeight: '500',
    },
  });

export default OrderCard;
