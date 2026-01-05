import {
  StyleSheet,
  Text,
  Image,
  View,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {ms, rr, s} from '../utils/responsive';
import {useTheme} from '../context/ThemeContext';
import {ICONS, IMAGES} from '../theme/colors';
import {fontFamily, fontSizes} from '../theme/typography';
import { navigate } from '../utils/rootNavigation';

export default function Header({onPressBell, label, isDashboard}) {
  const {theme} = useTheme();
  const styles = createStyle(theme);

  return (
    <View style={[styles.container]}>
      {/* <TouchableOpacity style={styles.row}>
        <Image source={ICONS.user} style={styles.user} />
        <View>
          <Text style={styles.headerText}>Welcome Back! </Text>
          <Text style={styles.userName}>Saurav Chhetri </Text>
        </View>
      </TouchableOpacity> */}
      {isDashboard ? (
        <TouchableOpacity style={styles.row}>
          <Image source={IMAGES.Nuworld_logo} style={styles.appLogo} />
        </TouchableOpacity>
      ) : (
        <View>
          <Text style={styles.headerText}>{label}</Text>
        </View>
      )}
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={()=>navigate('Search')} style={styles.search}>
          <Image source={ICONS.search} style={styles.searchicon} />
          <Text style={styles.searchText}>Search ..</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigate('Notification')}} style={styles.notiCont}>
          <Image source={ICONS.bell} style={styles.bell} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const createStyle = theme =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: s(10),
      paddingHorizontal: s(10),
      // backgroundColor: '#E5E5E5',
      // backgroundColor: '#2C2C2C',
      backgroundColor: '#fff',
      borderBottomWidth: 0,
      borderBottomColor: '#ddd',
    },
    user: {
      width: s(40),
      height: s(45),
      resizeMode: 'contain',
      marginRight: ms(10),
    },
    appLogo: {
      width: s(100),
      height: s(45),
      resizeMode: 'cover',
      marginRight: ms(10),
    },

    bell: {
      width: s(22),
      height: s(22),
      // tintColor:'#C28840',
      tintColor: theme?.primary_color,
      resizeMode: 'contain',
    },
    row: {
      flexDirection: 'row',
      width: '50%',
      alignItems: 'center',
    },
    headerText: {
      fontSize: fontSizes.sm,
      fontFamily: fontFamily.playfair_italic,
      color: theme?.text,
    },
    userName: {
      fontSize: fontSizes.lg,
      fontFamily: fontFamily.playfair_medium,
      color: theme?.primary_color,
    },
    notiCont: {
      width: ms(40),
      height: ms(40),
      borderRadius: 100,
      // backgroundColor:'#FFFFFF',
      backgroundColor: theme?.primary_shade,
      justifyContent: 'center',
      alignItems: 'center',
    },
    searchicon: {
      width: ms(22),
      height: ms(22),
      resizeMode:'contain',
            tintColor:theme?.primary_color,

    },
    search: {
      width: ms(120),
      padding: ms(2),
      borderWidth: 1,
      borderColor:theme?.primary_color,
      marginRight: ms(10),
      borderRadius: rr(20),
      flexDirection: 'row',
      alignItems: 'center',
    },
    searchText: {
      fontSize: fontSizes.sm,
      color: theme?.gray,
      paddingLeft: ms(5),
    },
  });
