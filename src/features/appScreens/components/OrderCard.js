import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {ms, rr, vs} from '../../../utils/responsive';
import {fontSizes} from '../../../theme/typography';

const OrderCard = ({order, onTrack, theme}) => {
  const styles = CreateStyle(theme);
  return (
    <View style={styles.card}>
      <Image source={{uri: order.image}} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{order.title}</Text>
        <Text style={styles.sub}>
          Size: {order.size} | Qty: {order.qty}
        </Text>
        <Text style={styles.price}>${order.price}</Text>
      </View>
      <TouchableOpacity style={styles.trackBtn} onPress={() => onTrack(order)}>
        <Text style={styles.trackText}>Track Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const CreateStyle = theme =>
  StyleSheet.create({
    card: {
      flexDirection: 'row',
      width: '99%',
      padding: ms(10),
      marginBottom: vs(15),
      borderRadius: rr(10),
      backgroundColor: theme?.background,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 5,
      elevation: 2,
      alignItems: 'center',
    },
    image: {width: ms(60), height: ms(60), borderRadius: rr(10)},
    info: {flex: 1, marginLeft: vs(12)},
    title: {fontSize: fontSizes.base, fontWeight: '600', color: theme?.text},
    sub: {fontSize: fontSizes.sm, color: theme.gray, marginVertical: vs(4)},
    price: {fontSize: fontSizes.base, fontWeight: '600', color: theme?.text},
    trackBtn: {
      backgroundColor: theme?.primary_color,
      paddingHorizontal: ms(12),
      paddingVertical: vs(6),
      borderRadius: rr(20),
    },
    trackText: {
      color: theme?.background,
      fontSize: fontSizes.sm,
      fontWeight: '600',
    },
  });

export default OrderCard;
