import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {fontFamily, fontSizes} from '../../../theme/typography';
import {useTheme} from '../../../context/ThemeContext';
import {ms, vs} from '../../../utils/responsive';
import {goBack} from '../../../utils/rootNavigation';

const FilterScreen = () => {
  const {theme} = useTheme();
  const styles = createStyles(theme);

  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedColor, setSelectedColor] = useState('All');
  const [selectedSize, setSelectedSize] = useState('All');
  const [priceRange, setPriceRange] = useState([100, 800]);
  //   const [selectedReview, setSelectedReview] = useState('4.5+');

  const brands = ['All', 'Nike', 'Adidas', 'Puma', 'Reebok'];
  const genders = ['All', 'Men', 'Women'];
  //   const categories = ['All', 'Shoes', 'Clothing', 'Accessories'];
  const colors = ['All', 'Black', 'White', 'Red', 'Blue'];
  const sizes = ['All', 'S', 'M', 'L', 'XL'];
  //   const reviews = ['4.5+', '4.0 - 4.5', '3.5 - 4.0', '3.0 - 3.5', '2.5 - 3.0'];

  const [selectedReview, setSelectedReview] = useState('4.5+');

  const reviews = [
    {stars: 5, label: '4.5 and above', value: '4.5+'},
    {stars: 5, label: '4.0 - 4.5', value: '4.0-4.5'},
    {stars: 4, label: '3.5 - 4.0', value: '3.5-4.0'},
    {stars: 4, label: '3.0 - 3.5', value: '3.0-3.5'},
    {stars: 3, label: '2.5 - 3.0', value: '2.5-3.0'},
  ];

  const renderStars = count => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Text
          key={i}
          style={{color: i < count ? '#f5a623' : '#ccc', fontSize: 18}}>
          ★
        </Text>,
      );
    }
    return stars;
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView contentContainerStyle={{padding: 16}}>
        {/* Brand Filter */}
        <Text style={styles.headerText}>Brands</Text>
        <View style={styles.rowWrap}>
          {brands.map(b => (
            <TouchableOpacity
              key={b}
              onPress={() => setSelectedBrand(b)}
              style={[
                styles.chip,
                {backgroundColor: selectedBrand === b ? '#C49A6C' : '#f0f0f0'},
              ]}>
              <Text style={{color: selectedBrand === b ? '#fff' : '#000'}}>
                {b}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Gender Filter */}
        <Text style={styles.headerText}>Gender</Text>
        <View style={styles.rowWrap}>
          {genders.map(g => (
            <TouchableOpacity
              key={g}
              onPress={() => setSelectedGender(g)}
              style={[
                styles.chip,
                {backgroundColor: selectedGender === g ? '#C49A6C' : '#f0f0f0'},
              ]}>
              <Text style={{color: selectedGender === g ? '#fff' : '#000'}}>
                {g}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Category Filter */}
        {/* <Text style={styles.headerText}>Category</Text>
        <View style={styles.rowWrap}>
          {categories.map(c => (
            <TouchableOpacity
              key={c}
              onPress={() => setSelectedCategory(c)}
              style={[
                styles.chip,
                {
                  backgroundColor:
                    selectedCategory === c ? '#C49A6C' : '#f0f0f0',
                },
              ]}>
              <Text style={{color: selectedCategory === c ? '#fff' : '#000'}}>
                {c}
              </Text>
            </TouchableOpacity>
          ))}
        </View> */}

        {/* Colors */}
        <Text style={styles.headerText}>Colors</Text>
        <View style={styles.rowWrap}>
          {colors.map(c => (
            <TouchableOpacity
              key={c}
              onPress={() => setSelectedColor(c)}
              style={[
                styles.chip,
                {backgroundColor: selectedColor === c ? '#C49A6C' : '#f0f0f0'},
              ]}>
              <Text style={{color: selectedColor === c ? '#fff' : '#000'}}>
                {c}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Sizes */}
        <Text style={styles.headerText}>Sizes</Text>
        <View style={styles.rowWrap}>
          {sizes.map(s => (
            <TouchableOpacity
              key={s}
              onPress={() => setSelectedSize(s)}
              style={[
                styles.chip,
                {backgroundColor: selectedSize === s ? '#C49A6C' : '#f0f0f0'},
              ]}>
              <Text style={{color: selectedSize === s ? '#fff' : '#000'}}>
                {s}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Price Range */}
        <Text style={styles.headerText}>Price Range</Text>
        <MultiSlider
          values={priceRange}
          min={0}
          max={2000}
          step={50}
          onValuesChange={values => setPriceRange(values)}
          selectedStyle={{backgroundColor: '#C49A6C'}}
          markerStyle={{backgroundColor: '#C49A6C'}}
        />
        <Text style={styles.priceText}>
          ₹{priceRange[0]} - ₹{priceRange[1]}
        </Text>

        {/* Reviews */}
        <Text style={styles.headerText}>User Reviews</Text>

        {reviews.map(item => (
          <TouchableOpacity
            key={item.value}
            style={styles.row}
            onPress={() => setSelectedReview(item.value)}>
            <View style={styles.starRow}>{renderStars(item.stars)}</View>
            <Text style={styles.label}>{item.label}</Text>

            {/* Radio Button */}
            <View
              style={[
                styles.radioOuter,
                selectedReview === item.value && styles.radioOuterSelected,
              ]}>
              {selectedReview === item.value && (
                <View style={styles.radioInner} />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.resetBtn} onPress={() => goBack()}>
          <Text style={{color: '#000'}}>Reset Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyBtn} onPress={() => goBack()}>
          <Text style={{color: '#fff'}}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    headerText: {
      fontSize: fontSizes.lg,
      fontFamily: fontFamily.playfair_semiBold,
      color: theme?.text,
    },
    priceText: {
      fontSize: fontSizes.base,
      fontFamily: fontFamily.poppins_medium,
      color: theme?.text,
    },
    rowWrap: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginVertical: ms(10),
    },
    chip: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      marginRight: 8,
      marginBottom: 8,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 16,
      borderTopWidth: 1,
      borderColor: '#eee',
    },
    resetBtn: {
      flex: 1,
      padding: 14,
      backgroundColor: '#f0f0f0',
      alignItems: 'center',
      borderRadius: 10,
      marginRight: 8,
    },
    applyBtn: {
      flex: 1,
      padding: 14,
      backgroundColor: '#C49A6C',
      alignItems: 'center',
      borderRadius: 10,
      marginLeft: 8,
    },

    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: vs(12),
    },
    starRow: {
      flexDirection: 'row',
      width: 110,
    },
    label: {
      flex: 1,
      marginLeft: 12,
      fontSize: 15,
      color: '#333',
    },
    radioOuter: {
      height: 20,
      width: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: '#999',
      alignItems: 'center',
      justifyContent: 'center',
    },
    radioOuterSelected: {
      borderColor: '#C49A6C',
    },
    radioInner: {
      height: 10,
      width: 10,
      borderRadius: 5,
      backgroundColor: '#C49A6C',
    },
  });

export default FilterScreen;
