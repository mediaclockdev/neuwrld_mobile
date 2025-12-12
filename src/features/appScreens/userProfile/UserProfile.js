import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useTheme} from '../../../context/ThemeContext';
import {hp, ms, s, vs} from '../../../utils/responsive';
import {fontFamily, fontSizes} from '../../../theme/typography';
import {ICONS} from '../../../theme/colors';
import {profilejson} from '../../../utils/globalJson';
import {navigate} from '../../../utils/rootNavigation';
import LogoutSheet from '../components/LogoutPop';
import {setUser} from '../../../utils/authStorage';
import UploadMedia from '../components/UploadMedia';
import {useSelector} from 'react-redux';
import FastImage from '@d11/react-native-fast-image';
import {usePopup} from '../../../context/PopupContext';

const UserProfile = () => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const {customerDash, userdetails, isLoading} = useSelector(
    state => state.App,
  );

  const {token, isGuest} = useSelector(state => state.Auth);
  const [showPopupVisible, setShowPopupVisible] = useState(true);

  const [logoutVisible, setLogoutVisible] = useState(false);
  const [profileUpdateVisible, setProfileUpdateVisible] = useState(false);
  const [localPhoto, setLocalPhoto] = useState(null);
  const {showPopup} = usePopup();

  const handleLogout = () => {
    if (!token) {
      navigate('Signup');
    } else {
      setLogoutVisible(true);
    }
    // instead of rendering directly, just toggle visibility
  };

  const handleProfileImage = () => {
    // instead of rendering directly, just toggle visibility
    setProfileUpdateVisible(true);
  };

  const handleActions = item => {
    const isGuest = !token;

    // Publicly accessible slugs
    const publicRoutes = ['help', 'privacy', 'logout', 'about', 'contact'];

    // Protected/private actions
    const requiresAuth = !publicRoutes.includes(item?.slug);

    // If user is guest and trying to access private screen
    if (isGuest && requiresAuth) {
      showPopup({
        type: 'warning',
        title: 'Hey There!',
        message:
          'Please sign up to use this amazing feature and experience the world of fashion 🎉',
        confirmText: 'Sign up to explore',
        cancelText: 'Cancel',
        showCancel: true,
        onConfirm: () => (navigate('Signup'), setShowPopupVisible(false)),
        onCancel: () => setShowPopupVisible(false),
      });
      return;
    }

    // Navigation for all accessible actions
    switch (item?.slug) {
      case 'help':
        navigate('HelpCenter');
        break;
      case 'privacy':
        navigate('PrivacyPolicy');
        break;
      case 'settings':
        navigate('Settings');
        break;
      case 'orders':
        navigate('MyOrdersScreen');
        break;
      case 'profile':
        navigate('ProfileDetails');
        break;
      case 'saved':
        navigate('AddressScreen');
        break;
      case 'logout':
        handleLogout();
        break;
      case 'login':
        navigate('Login');
        break;
      default:
        break;
    }
  };

  const confirmLogout = () => {
    setLogoutVisible(false);
    // Add your logout logic here
    setUser({userType: '', email: ''});
    navigate('Login');
  };

  const _renderItem = ({item, index}) => {
    return (
      <View key={item?.id} style={styles.cardRow}>
        <View style={styles.row}>
          <Image source={item.icon} style={styles.icons} />
          <View style={{marginLeft: ms(10)}}>
            <Text style={styles.title}>
              {item?.slug === 'logout' && !token ? 'Login' : item?.title}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => handleActions(item)}
          style={styles.incBtn}>
          <Image source={ICONS.right_arrow} style={styles.rightIcons} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.parent}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <Text style={styles.headerText}>My Profile</Text>
        <View style={styles.profileCont}>
          <FastImage
            source={
              localPhoto
                ? {uri: localPhoto?.path}
                : userdetails?.default_profile_image
                ? {uri: userdetails?.default_profile_image}
                : {
                    uri: 'https://images.unsplash.com/photo-1750390200217-628bdc2d7651?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  }
            }
            style={styles.profile}
          />
          <TouchableOpacity
            disabled={!token ? true : false}
            onPress={() => {
              handleProfileImage();
            }}
            style={styles.edit}>
            <Image source={ICONS.edit} style={styles.editIcon} />
          </TouchableOpacity>
        </View>
        <Text
          style={[
            styles.headerText,
            {
              fontSize: fontSizes.xl,
            },
          ]}>
          {userdetails?.first_name ?? 'Guest User'}
        </Text>

        <FlatList
          data={profilejson}
          keyExtractor={({item, index}) => item?.id?.toString()}
          renderItem={_renderItem}
          scrollEnabled={false}
        />

        {/* Render the sheet conditionally */}
        <LogoutSheet
          visible={logoutVisible}
          onCancel={() => setLogoutVisible(false)}
          onConfirm={confirmLogout}
        />

        <UploadMedia
          setImageSource={src => {
            setLocalPhoto(src);
            setProfileUpdateVisible(false);
          }}
          onBackdropPress={() => {
            setProfileUpdateVisible(false);
          }}
          theme={theme}
          visible={profileUpdateVisible}
        />

        <View style={styles.devider} />
      </ScrollView>
    </View>
  );
};

export default UserProfile;

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
      fontSize: fontSizes.lg,
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
      width: ms(25),
      height: ms(25),
      resizeMode: 'cover',
    },

    // new
    profileCont: {
      width: ms(120),
      height: ms(120),
      borderRadius: 100,
      marginVertical: vs(15),
      justifyContent: 'center',
      alignItems: 'center',
      // overflow:'hidden'
    },
    profile: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      borderRadius: 100,
    },
    edit: {
      width: ms(30),
      height: ms(30),
      borderWidth: 1,
      position: 'absolute',
      bottom: 0,
      right: ms(10),
      borderColor: theme?.background,
      padding: ms(2),
      backgroundColor: theme?.primary_color,
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
    },
    editIcon: {
      width: '60%',
      height: '60%',
      resizeMode: 'contain',
      tintColor: theme?.background,
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
    title: {
      fontSize: fontSizes.base,
      color: theme.text,
      fontFamily: fontFamily.playfair_medium,
      lineHeight: ms(20),
    },
  });
