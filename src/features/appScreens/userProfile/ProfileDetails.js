import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useTheme} from '../../../context/ThemeContext';
import {ms, vs} from '../../../utils/responsive';
import {fontFamily, fontSizes} from '../../../theme/typography';
import SubHeader from '../components/SubHeader';
import {goBack, navigate} from '../../../utils/rootNavigation';
import {userProfilesDetails} from '../../../utils/globalJson';
import {ICONS} from '../../../theme/colors';

const ProfileDetails = () => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const renderProfile = item => {
    item?.slug === 'basic_info'
      ? navigate('UpdateProfile')
      : navigate('UserAvatar');
  };
  return (
    <View style={styles.parent}>
      <SubHeader
        onPressLeftIcon={() => goBack()}
        centerlabel={'Profile Info'}
      />

      <FlatList
        data={userProfilesDetails}
        keyExtractor={({item}) => item?.id}
        contentContainerStyle={styles.container}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                renderProfile(item);
              }}
              style={styles.detailsRow}>
              <View style={styles.row}>
                <Image
                  source={item.icon}
                  tintColor={theme?.primary_color}
                  style={styles.detailsIcon}
                />
                <Text style={styles.detailsText}>{item?.title}</Text>
              </View>
              <Image
                source={ICONS.right_arrow}
                tintColor={theme?.primary_color}
                style={styles.detailsIconRight}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default ProfileDetails;

const createStyles = theme =>
  StyleSheet.create({
    parent: {
      flex: 1,
      backgroundColor: theme?.background,
    },
    container: {
      padding: ms(15),
    },
    headerText: {
      fontSize: fontSizes.xl,
      color: theme.text,
      fontFamily: fontFamily.playfair_semiBold,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    detailsRow: {
      width: '100%',
      height: ms(40),
      backgroundColor: theme?.section_background,
      marginVertical: vs(10),
      borderBottomLeftRadius: ms(10),
      borderBottomEndRadius: ms(10),
      padding: ms(10),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    detailsIcon: {
      width: ms(30),
      height: ms(30),
      resizeMode: 'contain',
    },
    detailsIconRight: {
      width: ms(20),
      height: ms(20),
      resizeMode: 'contain',
    },
    detailsText: {
      fontSize: fontSizes.base,
      fontFamily: fontFamily?.playfair_medium,
      paddingLeft: ms(10),
      color: theme?.gray,
    },
  });
