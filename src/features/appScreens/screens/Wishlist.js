import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {useTheme} from '../../../context/ThemeContext';
import {hp, ms, rr, s, vs} from '../../../utils/responsive';
import {products} from '../../../utils/globalJson';
import {fontFamily, fontSizes} from '../../../theme/typography';

const categories = ['All', 'Jacket', 'Shirt', 'Pant', 'T-Shirt'];

const Wishlist = () => {
  const {theme} = useTheme();
  const styles = createStyles(theme);



  const renderProduct = ({item}) => (
    <View style={styles.card}>
      <Image source={{uri: item.image}} style={styles.image} />
      <TouchableOpacity style={styles.heart}>
        <Text>🤍</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.row}>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <Text style={styles.rating}>⭐ {item.rating}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>My Wishlist</Text>

      {/* Product Grid */}
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={renderProduct}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{height: hp(5)}} />}
        contentContainerStyle={{paddingBottom: 20}}
      />
    </View>
  );
};

export default Wishlist;

const createStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme?.background,
      paddingHorizontal: ms(15),
    },
    container: {flex: 1, backgroundColor: '#fff', padding: 16},
    headerText: {
      fontSize: fontSizes.lg,
      color: theme.text,
      fontFamily: fontFamily.playfair_semiBold,
      marginBottom: vs(15),
    },
    categoryContainer: {
      flexDirection: 'row',
      marginBottom: 16,
      gap: 10,
      flexWrap: 'wrap',
    },
    categoryButton: {
      paddingHorizontal: ms(14),
      paddingVertical: vs(6),
      borderRadius: rr(20),
      backgroundColor: '#f0f0f0',
      // marginHorizontal: ms(2),
    },
    activeCategory: {backgroundColor: '#6b4226'},
    categoryText: {color: '#444'},
    activeCategoryText: {color: '#fff', fontWeight: '600'},
    card: {
      width: '48%',
      backgroundColor: '#fafafa',
      borderRadius: rr(10),
      padding: ms(5),
      marginBottom: vs(15),
      position: 'relative',
    },
    image: {
      width: '100%',
      height: s(150),
      borderRadius: rr(10),
      marginBottom: vs(8),
    },
    heart: {
      position: 'absolute',
      top: ms(10),
      right: ms(10),
      backgroundColor: theme?.background,
      borderRadius: rr(30),
      width: ms(30),
      height: ms(30),
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 2,
    },
    title: {fontSize: 14, fontWeight: '500', marginTop: 4},
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 6,
    },
    price: {fontSize: 14, fontWeight: '600', color: '#333'},
    rating: {fontSize: 12, color: '#888'},
  });
