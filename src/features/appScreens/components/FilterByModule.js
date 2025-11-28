import React, {useState, useMemo, useCallback, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';

import {hp, ms, wp} from '../../../utils/responsive';
import ReusableModal from './ReusableModal';
import {colors} from '../../../theme/colors';
// 🧠 Memoized static data
const filterCategories = [
  {
    id: '1',
    title: 'Category',
    options: ['T-Shirts', 'Jeans', 'Dresses', 'Jackets', 'Shoes'],
  },
  {id: '2', title: 'Size', options: ['XS', 'S', 'M', 'L', 'XL']},
  {
    id: '3',
    title: 'Color',
    options: ['Black', 'White', 'Beige', 'Brown', 'Blue'],
  },
  {
    id: '4',
    title: 'Price Range',
    options: ['Under ₹1000', '₹1000 - ₹2000', '₹2000 - ₹3000', 'Above ₹3000'],
  },
  {id: '5', title: 'Ratings', options: ['3★ & above', '4★ & above', '5★ only']},
];

const FilterByModalStable = ({visible, onClose, onApply}) => {
  const [selectedCategory, setSelectedCategory] = useState(filterCategories[0]);
  const [selectedFilters, setSelectedFilters] = useState({});

  const toggleOption = (section, option) => {
    setSelectedFilters(prev => {
      const current = prev[section] || [];
      const alreadySelected = current.includes(option);
      const updated = alreadySelected
        ? current.filter(o => o !== option)
        : [...current, option];
      return {...prev, [section]: updated};
    });
  };

  const renderLeftCategory = ({item}) => {
    const isActive = selectedCategory.id === item.id;
    return (
      <TouchableOpacity
        style={[styles.categoryItem, isActive && styles.categoryActive]}
        onPress={() => setSelectedCategory(item)}>
        <Text
          style={[styles.categoryText, isActive && styles.categoryTextActive]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderRightOptions = ({item}) => {
    const selectedList = selectedFilters[selectedCategory.title] || [];
    const isSelected = selectedList.includes(item);
    return (
      <TouchableOpacity
        style={[styles.optionButton, isSelected && styles.optionButtonSelected]}
        onPress={() => toggleOption(selectedCategory.title, item)}>
        <Text
          style={[styles.optionText, isSelected && styles.optionTextSelected]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  // ✅ Memoized options for performance & stability
  const options = useMemo(() => selectedCategory.options, [selectedCategory]);

  return (
    <ReusableModal isVisible={visible} onClose={onClose} title="Filter By">
      <View style={styles.mainContainer}>
        {/* LEFT SIDE CATEGORIES */}
        <View style={styles.leftPane}>
          <FlatList
            data={filterCategories}
            keyExtractor={item => item.id}
            renderItem={renderLeftCategory}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* RIGHT SIDE OPTIONS */}
        <View style={styles.rightPane}>
          <FlatList
            data={options}
            keyExtractor={(item, index) => `${selectedCategory.id}-${index}`}
            renderItem={renderRightOptions}
            showsVerticalScrollIndicator={false}
            extraData={selectedFilters}
          />
        </View>
      </View>

      {/* BOTTOM BUTTONS */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => setSelectedFilters({})}>
          <Text style={styles.clearText}>Clear Filters</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.applyButton}
          onPress={() => onApply(selectedFilters)}>
          <Text style={styles.applyText}>Apply Filters</Text>
        </TouchableOpacity>
      </View>
    </ReusableModal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 10,
    overflow: 'hidden',
    height: hp(80), // fixed height prevents flick
  },
  leftPane: {
    width: wp(32),
    backgroundColor: colors.section_background,
    borderRightWidth: 1,
    borderColor: colors.form_border,
  },
  categoryItem: {
    paddingVertical: 14,
    paddingHorizontal: 10,
  },
  categoryActive: {
    backgroundColor: colors.white,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  categoryText: {
    fontSize: 14,
    color: colors.gray,
  },
  categoryTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  rightPane: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: colors.form_border,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 8,
    marginBottom: 10,
    backgroundColor: colors.white,
  },
  optionButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionText: {
    color: colors.text,
    fontSize: 13,
  },
  optionTextSelected: {
    color: colors.white,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2),
    position: 'absolute',
    bottom: ms(10),
  },
  clearButton: {
    flex: 1,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 30,
    paddingVertical: 10,
    alignItems: 'center',
  },
  clearText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  applyButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 30,
    paddingVertical: 10,
    alignItems: 'center',
  },
  applyText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default FilterByModalStable;
