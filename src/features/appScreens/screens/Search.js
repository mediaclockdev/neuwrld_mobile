import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '../../../context/ThemeContext';
import {ms} from '../../../utils/responsive';
import CustomTextInput from '../../../components/CustomTextInput';
import {ICONS} from '../../../theme/colors';
import SubHeader from '../components/SubHeader';

const Search = () => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  return (
    <View style={styles.parent}>
      <SubHeader  hideRigthIcon={true} centerlabel={'Search'}/>
      <View style={styles.container}>
        <CustomTextInput
          tintColor={theme?.primary_color}
          customIconStyleLeft={styles.searchIcon}
          customStyle={{borderRadius: ms(25), marginTop: ms(10)}}
          icon={ICONS.search}
          placeholder={'search here'}
        />
      </View>
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
  });
