import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useTheme} from '../../../context/ThemeContext';
import {hp, ms, rr, s, vs} from '../../../utils/responsive';
import {fontFamily, fontSizes} from '../../../theme/typography';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {getAllCategoriesRequest, getProductRequest} from '../appReducer';
import CategorisPlaceholder from '../Skeleton/CategorisPlaceholder';
import ReusableModal from '../components/ReusableModal';
import AppImage from '../components/AppImage';
import {optimizedImage} from '../../../utils/ImageUtils';

const Categories = () => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const {allCategories, isLoading} = useSelector(state => state.App);

  const [showSubCategoryModal, setShowSubCategoryModal] = useState({
    visible: false,
    data: null,
  });

  const dispatch = useDispatch();

  const fetchProductsBySubId = item => {
    const id = item?.slug;
    dispatch(getProductRequest(id));
  };

  useEffect(() => {
    dispatch(getAllCategoriesRequest());
  }, []);

  const handleOpenSubCategory = useCallback(item => {
    setShowSubCategoryModal({visible: true, data: item});
  }, []);

  // CATEGORY CARDS
  const renderCategoryItem = useCallback(
    ({item}) => (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => handleOpenSubCategory(item)}
        style={styles.card}>
        <AppImage
          uri={optimizedImage(item.image)}
          style={styles.CategoryImage}
        />
        <Text style={styles.title}>{item?.name}</Text>
      </TouchableOpacity>
    ),
    [handleOpenSubCategory],
  );

  // SUB CHILDREN GRID ITEMS
  const renderSubChild = useCallback(
    ({item}) => (
      <View style={styles.subChildWrapper}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => {
            fetchProductsBySubId(item);
            setShowSubCategoryModal({visible: false, data: null});
          }}
          style={styles.subChildBtn}>
          <AppImage uri={optimizedImage(item.image)} style={styles.image} />
        </TouchableOpacity>

        <Text style={styles.subText}>{item?.title}</Text>
      </View>
    ),
    [],
  );

  // SUBCATEGORY SECTION
  const renderSubCategoryGroup = useCallback(
    ({item}) => (
      <View style={styles.subCategoryGroup}>
        <Text style={styles.subCategoryTitle}>{item?.title}</Text>

        <FlatList
          data={item?.children}
          renderItem={renderSubChild}
          numColumns={3}
          keyExtractor={(child, index) =>
            `${child?.id ?? child?.title ?? index}-${index}`
          }
          nestedScrollEnabled
          columnWrapperStyle={{justifyContent: 'space-between'}}
          showsVerticalScrollIndicator={false}
        />
      </View>
    ),
    [renderSubChild],
  );

  if (isLoading) return <CategorisPlaceholder />;

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Category</Text>

      {/* MAIN CATEGORY LIST */}
      <FlatList
        data={allCategories}
        renderItem={renderCategoryItem}
        keyExtractor={(item, index) =>
          `${item?.id ?? item?.name ?? index}-${index}`
        }
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        ListFooterComponent={<View style={{height: hp(5)}} />}
      />

      {/* SUB CATEGORY MODAL */}
      <ReusableModal
        isVisible={showSubCategoryModal.visible}
        isFlatlist={true}
        title={showSubCategoryModal?.data?.name || 'Details'}
        onClose={() => setShowSubCategoryModal({visible: false, data: null})}>
        <FlatList
          data={showSubCategoryModal?.data?.children}
          renderItem={renderSubCategoryGroup}
          keyExtractor={(item, index) =>
            `${item?.id ?? item?.title ?? index}-${index}`
          }
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
          ListFooterComponent={<View style={{height: hp(5)}} />}
        />
      </ReusableModal>
    </View>
  );
};

export default Categories;

/* ----------------------------------------------------
      PREMIUM UI STYLING
-----------------------------------------------------*/

const createStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme?.background,
      paddingHorizontal: ms(15),
      paddingTop: ms(10),
    },

    headerText: {
      fontSize: fontSizes.xl,
      color: theme.text,
      fontFamily: fontFamily.playfair_semiBold,
      marginBottom: vs(20),
      letterSpacing: 0.5,
    },

    card: {
      width: '100%',
      backgroundColor: '#fafafa',
      borderRadius: rr(10),
      padding: ms(5),
      marginBottom: vs(15),
      position: 'relative',
    },

    CategoryImage: {
      width: '100%',
      aspectRatio: 16 / 9, // safe, scalable, responsive
      borderRadius: rr(14),
      backgroundColor: '#f0f0f0', // avoids layout jump while loading
    },

    title: {
      fontSize: fontSizes.lg,
      fontFamily: fontFamily.playfair_medium,
      textAlign: 'center',
      color: theme.text,
    },

    /* MODAL HEADER */
    modalHeader: {
      fontSize: fontSizes.xxl,
      fontFamily: fontFamily.playfair_bold,
      color: theme.text,
      marginBottom: vs(20),
    },

    /* SUBCATEGORY SECTION */
    subCategoryGroup: {
      marginBottom: vs(25),
      paddingHorizontal: ms(18),
    },

    subCategoryTitle: {
      fontSize: fontSizes.base,
      fontFamily: fontFamily.playfair_medium,
      color: theme.text,
      marginBottom: vs(8),
      marginTop: vs(5),
    },

    /* GRID CHILD ITEM */
    subChildWrapper: {
      width: '29%',
      marginVertical: vs(10),
      alignItems: 'center',
    },

    subChildBtn: {
      width: '100%',
      height: s(120),
      backgroundColor: theme.cardBackground,
      borderRadius: rr(12),
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOpacity: 0.12,
      shadowRadius: 8,
      shadowOffset: {width: 0, height: 3},
      elevation: 4,

      justifyContent: 'center',
      alignItems: 'center',
    },

    image: {
      width: '100%',
      aspectRatio: 3 / 4, // portrait orientation // safe, scalable, responsive
      resizeMode: 'contain',
    },

    subText: {
      fontSize: fontSizes.sm,
      fontFamily: fontFamily.playfair_mediumItalic,
      color: theme.primary_color,
      marginTop: vs(6),
      textAlign: 'center',
    },
  });
