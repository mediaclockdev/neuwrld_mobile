import {
  ImageBackground,
  Animated,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomHeader from '../../../components/CustomHeader';
import {hp, ms, rr, s, vs, wp} from '../../../utils/responsive';
import Header from '../../../components/Header';
import CustomTextInput from '../../../components/CustomTextInput';
import {useTheme} from '../../../context/ThemeContext';
import {ICONS} from '../../../theme/colors';
import DashboardCarousel from '../components/DashboardCarousel';
import {fontFamily, fontSizes} from '../../../theme/typography';
import {categories, products} from '../../../utils/globalJson';
import {navigate} from '../../../utils/rootNavigation';

const Dashboard = () => {
  const {theme} = useTheme();
  const styles = createStyles(theme);

  const _handleProductClick = item => {
    navigate('ProductDetailsScreen', {
      productData: item,
    });
  };

  const handleCategory = item => {
    item?.slug == 'more' ? navigate('Category'):
    navigate('Product', {
      category: item,
    });
  };

  const _renderproduct = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          _handleProductClick(item);
        }}
        key={item.id}
        style={styles.productView}>
        <Image source={{uri: item.image}} style={styles.productImage} />
        <Text style={[styles.productTitle]}>{item?.title}</Text>
        <Text style={[styles.price]}>${item?.oldPrice}</Text>
        <View style={styles.row}>
          <Text style={[styles.newprice]}>${item?.price}</Text>
          <Text style={styles.rate}>⭐ {item?.rate}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.parent}>
      <Header isDashboard={true} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <DashboardCarousel />

        {/* container */}
        <View
          style={[
            styles.headerRow,
            {
              marginBottom: ms(15),
              marginTop: ms(-20),
            },
          ]}>
          <Text style={styles.headerText}>Category</Text>
        </View>
        {/* category */}
        <View
          style={[
            styles.headerRow,
            {
              marginVertical: ms(10),
            },
          ]}>
          {categories.map(item => (
            <View key={item.id}>
              <TouchableOpacity
                onPress={() => handleCategory(item)}
                style={styles.categoriesCircle}>
                <Image
                  source={item?.icon}
                  style={[
                    styles.categoriesIcon,
                    {
                      tintColor: '#C28840',
                      // tintColor: theme?.primary_color
                    },
                  ]}
                />
              </TouchableOpacity>
              <Text
                style={[
                  styles.subheaderText,
                  {
                    paddingTop: ms(10),
                  },
                ]}>
                {item?.name}
              </Text>
            </View>
          ))}
        </View>
        <View
          style={[
            styles.headerRow,
            {
              marginVertical: ms(10),
            },
          ]}>
          <Text style={styles.headerText}>Most Popular</Text>
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          style={{marginTop: vs(6)}}
          data={products}
          keyExtractor={({item, index}) => String(index)}
          renderItem={_renderproduct}
          numColumns={2}
          scrollEnabled={false}
          ListFooterComponent={<View style={styles.devider} />}
        />
      </ScrollView>
    </View>
  );
};

export default Dashboard;

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
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerText: {
      fontSize: fontSizes.lg,
      // color: '#fff',
      color: theme.text,
      fontFamily: fontFamily.playfair_semiBold,
    },
    subheaderText: {
      fontSize: fontSizes.sm,
      // color: '#FAFAFA',
      color: theme.gray,
      fontFamily: fontFamily.playfair_medium,
      textAlign: 'center',
    },
    categoriesCircle: {
      width: ms(60),
      height: ms(60),
      borderRadius: rr(100),
      justifyContent: 'center',
      alignItems: 'center',
      padding: ms(10),
      // backgroundColor: '#FAFAFA',
      backgroundColor: theme.primary_shade,
    },
    categoriesIcon: {
      width: '70%',
      height: '70%',
    },
    productView: {
      width: '46%',
      margin: '2%',
      minHeight: s(200),
      borderRadius: rr(10),
    },
    productImage: {
      width: '100%',
      height: s(180),
      borderRadius: rr(10),
    },
    productTitle: {
      fontSize: fontSizes.sm,
      // color: theme.background,
      color: theme.text,
      fontFamily: fontFamily.playfair_medium,
      textAlign: 'left',
      paddingTop: ms(8),
    },
    price: {
      fontSize: fontSizes.xs,
      color: theme.gray,
      fontFamily: fontFamily.poppins_medium,
      textAlign: 'left',
      textDecorationLine: 'line-through',
    },
    newprice: {
      fontSize: fontSizes.sm,
      // color: '#C28840',
      color: theme.primary_color,
      fontFamily: fontFamily.poppins_semiBold,
      textAlign: 'left',
    },
    rate: {
      fontSize: fontSizes.sm,
      // color: theme.background,
      color: theme.text,
      fontFamily: fontFamily.poppins_medium,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    devider: {
      height: hp(12),
    },
  });
