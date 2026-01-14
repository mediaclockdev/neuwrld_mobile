import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
// import {RatingBottomSheet} from './RatingBottomSheet';
// import {downloadInvoice} from './downloadInvoice';
import {useTheme} from '../../../context/ThemeContext';
import SubHeader from '../components/SubHeader';
import {goBack} from '../../../utils/rootNavigation';
import {RateReviewSheet, RatingBottomSheet} from './RateReviewSheet';
import BottomSheet from '../../../components/BottomSheet';
import {postApi} from '../../../api/requestApi';
import UploadMedia from '../components/UploadMedia';

export const OrderDetailsScreen = ({route}) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);

  const {order} = route.params;
  const sheetRef = useRef(null);
  const [show, setShow] = useState(false);
  const [showMedia, setShowMedia] = useState(false);

  const [mediaFiles, setMediaFiles] = useState([]);

  const delivered = order.order_status === 5;

  console.log('mediaFiles', mediaFiles);

  const handleSubmitReview = rate => {
    // postApi('submit-review',{

    // })
    console.log('rate', rate);
    setShow(false);
  };

  return (
    <View style={styles.parent}>
      <SubHeader
        onPressLeftIcon={() => goBack()}
        centerlabel={'Order Details'}
      />

      <FlatList
        data={order.order_products}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.container}
        ListHeaderComponent={
          <>
            {/* Header */}
            <Text style={styles.orderNumber}>{order.order_number}</Text>
            <Text style={styles.date}>{order.order_date}</Text>

            {/* Status */}
            <View style={styles.statusPill}>
              <Text style={styles.statusText}>{order.order_status_label}</Text>
            </View>

            {/* Summary */}
            <View style={styles.summaryCard}>
              <SummaryRow
                styles={styles}
                label="Subtotal"
                value={order.order_total}
              />
              <SummaryRow label="Tax" styles={styles} value={order.total_tax} />
              <SummaryRow
                label="Shipping"
                styles={styles}
                value={order.shipping_charge}
              />
              <SummaryRow
                label="Total"
                styles={styles}
                value={order.net_total}
                bold
              />
            </View>

            <Text style={styles.sectionTitle}>Items</Text>
          </>
        }
        renderItem={({item}) => (
          <View style={styles.productCard}>
            <Image source={{uri: item.image}} style={styles.productImage} />
            <View style={{flex: 1}}>
              <Text style={styles.productName}>{item.product_name}</Text>
              <Text style={styles.variant}>
                {item.name} • Qty {item.quantity}
              </Text>
              <Text style={styles.price}>{item.sell_price}</Text>
            </View>
          </View>
        )}
        ListFooterComponent={
          <>
            {delivered && (
              <>
                <TouchableOpacity
                  style={styles.invoiceBtn}
                  // onPress={() =>
                  //   downloadInvoice(order.invoice_url, order.id)
                  // }
                >
                  <Text style={styles.invoiceText}>⬇ Get Invoice</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity
                  style={styles.reviewBtn}
                  onPress={() => setShow(!show)}>
                  <Text style={styles.reviewText}>⭐ Rate your order</Text>
                </TouchableOpacity> */}
              </>
            )}

            <BottomSheet
              visible={show}
              onClose={() => setShow(false)}
              renderChild={
                <RateReviewSheet
                  uploadImg={() => {
                    setShowMedia(true);
                  }}
                  onSubmit={handleSubmitReview}
                />
              }
            />
          </>
        }
      />

      {showMedia && (
        <UploadMedia
          setImageSource={src => {
            setMediaFiles(src);
            setProfileUpdateVisible(false);
          }}
          onBackdropPress={() => {
            setProfileUpdateVisible(false);
          }}
          theme={theme}
          visible={profileUpdateVisible}
        />
      )}
    </View>
  );
};

const SummaryRow = ({label, value, styles, bold}) => (
  <View style={styles.row}>
    <Text style={[styles.rowText, bold && {fontWeight: '600'}]}>{label}</Text>
    <Text style={[styles.rowText, bold && {fontWeight: '600'}]}>{value}</Text>
  </View>
);

const createStyles = theme =>
  StyleSheet.create({
    parent: {
      flex: 1,
      backgroundColor: theme?.background,
    },
    container: {
      padding: 16,
      backgroundColor: theme.section_background,
    },
    orderNumber: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.text,
    },
    date: {
      color: theme.gray,
      marginBottom: 10,
    },
    statusPill: {
      backgroundColor: theme.primary_shade,
      alignSelf: 'flex-start',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      marginBottom: 14,
    },
    statusText: {
      color: theme.primary,
      fontWeight: '500',
    },
    summaryCard: {
      backgroundColor: theme.white,
      borderRadius: 16,
      padding: 14,
      marginBottom: 20,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 4,
    },
    rowText: {
      color: theme.text,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 10,
    },
    productCard: {
      flexDirection: 'row',
      backgroundColor: theme.white,
      borderRadius: 16,
      padding: 12,
      marginBottom: 12,
    },
    productImage: {
      width: 64,
      height: 80,
      borderRadius: 12,
      marginRight: 12,
    },
    productName: {
      fontWeight: '600',
      color: theme.text,
    },
    variant: {
      color: theme.gray,
      marginVertical: 4,
    },
    price: {
      fontWeight: '600',
      color: theme.text,
    },
    invoiceBtn: {
      backgroundColor: theme.section_background,
      padding: 14,
      borderRadius: 14,
      alignItems: 'center',
      marginTop: 20,
    },
    invoiceText: {
      color: theme.primary,
      fontWeight: '600',
    },
    reviewBtn: {
      backgroundColor: theme.primary,
      padding: 14,
      borderRadius: 14,
      alignItems: 'center',
      marginTop: 12,
    },
    reviewText: {
      color: theme.white,
      fontWeight: '600',
    },
  });
