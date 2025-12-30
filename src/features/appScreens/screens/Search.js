import {StyleSheet, FlatList, TouchableOpacity, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useTheme} from '../../../context/ThemeContext';
import {hp, ms, rr} from '../../../utils/responsive';
import CustomTextInput from '../../../components/CustomTextInput';
import {ICONS} from '../../../theme/colors';
import SubHeader from '../components/SubHeader';
import {getApi} from '../../../api/requestApi';
import {ALL_APi_LIST} from '../../../utils/apis';
import {useDispatch} from 'react-redux';
import AppImage from '../components/AppImage';
import NoProducts from '../../../components/NoProducts';
import {fontFamily, fontSizes} from '../../../theme/typography';
import {getProductDetailsRequest} from '../appReducer';

const Search = () => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const [search, setSearch] = useState('');
  const [searchLoader, setSearchLoader] = useState(false);
  const [product, setProduct] = useState([]);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    if (search) {
      setSearchLoader(true);
    }
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 500); // ⏱️ 500ms debounce

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    getApi(`${ALL_APi_LIST.advance_search}?q=${search}`).then(res => {
      if (res?.data) {
        setProduct(res?.data);
        setSearchLoader(false);
      } else {
        setProduct([]);
        setSearchLoader(false);
      }
    });
  }, [debouncedSearch]);

  const _handleProductClick = item => {
    dispatch(getProductDetailsRequest(item?.product_sku));
  };

  const renderProduct = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={() => {
          _handleProductClick(item);
        }}>
        {/* PRODUCT IMAGE */}
        <View style={styles.imageBox}>
          <AppImage
            uri={item?.image}
            autoHeight={false}
            resizeMode="cover"
            style={styles.productImage}
            borderRadius={16}
          />
        </View>

        {/* TITLE */}
        <Text numberOfLines={1} style={styles.name}>
          {item?.product_name}
        </Text>

        {/* PRICE ROW */}
        <View style={styles.priceRow}>
          <View>
            <Text style={[styles.old_price]}>{item?.old_price}</Text>
            <Text style={styles.price}>{item?.price}</Text>
          </View>
          <Text style={styles.discountTag}>-{item?.discount}</Text>
        </View>

        {/* WISHLIST + RATING */}
        <View style={styles.bottomRow}>
          {item?.avg_rating && (
            <View style={styles.ratingBox}>
              <Text style={styles.rate}>⭐ </Text>
              <Text style={styles.ratingText}>{item?.avg_rating}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.parent}>
      <SubHeader hideRigthIcon={true} centerlabel={'Search'} />
      <View style={styles.container}>
        <CustomTextInput
          tintColor={theme?.primary_color}
          customIconStyleLeft={styles.searchIcon}
          customStyle={{borderRadius: ms(25), marginTop: ms(10)}}
          icon={ICONS.search}
          onChangeText={setSearch}
          rightLoader={searchLoader}
          value={search}
          placeholder={'search here'}
        />
      </View>

      <FlatList
        data={product}
        keyExtractor={item => item.id}
        renderItem={renderProduct}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{height: hp(5)}} />}
        contentContainerStyle={{padding: ms(15)}}
        ListEmptyComponent={
          search && product?.length == 0 && !searchLoader ? <NoProducts /> : null
        }
      />
    </View>
  );
};

export default Search;

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
    searchIcon: {
      width: ms(25),
      height: ms(25),
      resizeMode: 'contain',
    },

    card: {
      width: '46%',
      backgroundColor: '#fff',
      borderRadius: 18,
      overflow: 'hidden',
      margin: '2%',

      shadowColor: '#000',
      shadowOpacity: 0.06,
      shadowRadius: 5,
      shadowOffset: {width: 0, height: 4},
      elevation: 4,
    },

    imageBox: {
      width: '100%',
      aspectRatio: 3 / 3.8,
      borderRadius: 16,
      backgroundColor: '#f3f3f3',
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
    },

    name: {
      fontFamily: fontFamily.playfair_medium,
      fontSize: fontSizes.md,
      marginTop: 8,
      marginHorizontal: 10,
      color: '#222',
    },

    priceRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 6,
      marginHorizontal: 10,
      alignItems: 'center',
    },

    price: {
      fontFamily: fontFamily.playfair_semiBold,
      fontSize: fontSizes.lg,
      color: theme.primary_color,
    },

    discountTag: {
      backgroundColor: '#FFE8EC',
      paddingVertical: 3,
      paddingHorizontal: 8,
      borderRadius: 8,
      color: '#ff375f',
      fontWeight: '600',
    },

    bottomRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 12,
      paddingBottom: 12,
      marginTop: 10,
    },

    ratingBox: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    ratingText: {
      marginLeft: 4,
      color: '#444',
      fontSize: fontSizes.sm,
    },

    old_price: {
      fontSize: fontSizes.xs,
      color: theme.gray,
      fontFamily: fontFamily.poppins_medium,
      textAlign: 'left',
      textDecorationLine: 'line-through',
    },

    heart: {
      position: 'absolute',
      top: ms(6),
      right: ms(6),
      backgroundColor: theme?.primary_shade,
      borderRadius: rr(30),
      width: ms(32),
      height: ms(32),
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 2,
      zIndex: +100,
      padding: ms(2),
    },

    wishlistListIcon: {
      width: '80%',
      height: '80%',
      resizeMode: 'contain',
      tintColor: theme?.primary_color,
    },

    productImage: {
      width: '100%',
      aspectRatio: 3 / 4, // portrait orientation // safe, scalable, responsive
      borderRadius: rr(10),
    },
  });
