import {
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {useTheme} from '../../../context/ThemeContext';
import {fontFamily, fontSizes} from '../../../theme/typography';
import {ms, vs} from '../../../utils/responsive';
import SubHeader from '../components/SubHeader';
import {setting} from '../../../utils/globalJson';
import {ICONS} from '../../../theme/colors';
import {goBack, navigate} from '../../../utils/rootNavigation';

const Settings = () => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const handleActions = item => {
    item?.slug === 'settings' ? navigate('Settings') : null;
  };
  return (
    <View style={styles.parent}>
      <SubHeader onPressLeftIcon={()=>goBack()} centerlabel={'Settings'} />
      <View style={styles.container}>
        <ScrollView>
          {setting.map(item => (
            <View key={item?.id} style={styles.cardRow}>
              <View style={styles.row}>
                <Image source={item.icon} style={styles.icons} />
                <View style={{marginLeft: ms(10)}}>
                  <Text style={styles.title}>{item?.title}</Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => handleActions(item)}
                style={styles.incBtn}>
                <Image source={ICONS.right_arrow} style={styles.rightIcons} />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Settings;

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
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    cardRow: {
      width: '100%',
      minHeight: ms(30),
      borderBottomWidth: 0.6,
      borderBottomColor: theme?.primary_shade,
      marginTop: vs(15),
      padding: vs(10),
      flexDirection: 'row',
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    icons: {
      width: ms(30),
      height: ms(30),
      resizeMode: 'cover',
    },
    title: {
      fontSize: fontSizes.base,
      color: theme.text,
      fontFamily: fontFamily.playfair_medium,
      lineHeight: ms(20),
    },
    incBtn: {
      width: ms(20),
      height: ms(20),
      justifyContent: 'center',
      alignItems: 'center',
    },
    rightIcons: {
      width: '80%',
      height: '80%',
      resizeMode: 'cover',
    },
  });
