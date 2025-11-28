


  import {StyleSheet, Text, View} from 'react-native';
  import React from 'react';
  import {useTheme} from '../../../context/ThemeContext';
  import {ms} from '../../../utils/responsive';
  import {fontFamily, fontSizes} from '../../../theme/typography';
  import SubHeader from '../components/SubHeader';
  import {goBack} from '../../../utils/rootNavigation';
  
  const UserAvatar = () => {
    const {theme} = useTheme();
    const styles = createStyles(theme);
    return (
      <View style={styles.parent}>
        <SubHeader
          onPressLeftIcon={() => goBack()}
          centerlabel={'Your Virtual Avatar'}
        />
      </View>
    );
  };
  
  export default UserAvatar;
  
  const createStyles = theme =>
    StyleSheet.create({
      parent: {
        flex: 1,
        backgroundColor: theme?.background,
      },
      container: {
        padding: ms(15),
        alignItems: 'center',
      },
      headerText: {
        fontSize: fontSizes.xl,
        color: theme.text,
        fontFamily: fontFamily.playfair_semiBold,
      },
    });
  