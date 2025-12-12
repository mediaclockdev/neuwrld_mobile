import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Appnavigator from './src/navigation/Appnavigator';
import {ThemeProvider, useTheme} from './src/context/ThemeContext';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message'; // optional, if you use it

import {PopupProvider, usePopup} from './src/context/PopupContext';
import {getItem, setItem, storage} from './src/utils/storage';
import DeviceInfo from 'react-native-device-info';
import {useDispatch, useSelector} from 'react-redux';
import {
  signInSuccess,
  updateDeviceToken,
  updateUser,
  updateUserAuthTogle,
} from './src/features/auth/authReducer';
import NetInfo from '@react-native-community/netinfo';
import {getToken, getUser} from './src/utils/authStorage';
import {navigate} from './src/utils/rootNavigation';
import {getUserProfile} from './src/features/appScreens/appReducer';

const App = () => {
  const dispatch = useDispatch();
  const {isRegisterSuccess, isGuest, isAuthAction, isDataSubmitting} =
    useSelector(state => state.Auth);

  function ThemedApp() {
    const {theme} = useTheme();

    return (
      <SafeAreaProvider>
        {/* StatusBar - works with notch/dynamic island */}
        <StatusBar
          // barStyle={'light-content'}
          barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
          backgroundColor="transparent" // keep transparent for notch
          translucent={true}
        />

        {/* Safe area container */}
        <SafeAreaView
          // style={{flex: 1, backgroundColor: '#E5E5E5'}} // murcury
          // style={{flex: 1, backgroundColor: '#2C2C2C'}} // charcole
          style={{flex: 1, backgroundColor: theme.background}}
          edges={['top', 'left', 'right', 'bottom']} // respect all safe areas
        >
          <Appnavigator />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  const getAsyncItems = async () => {
    try {
      let fetchPrevDevId = await getItem('Device_Id');
      let access_token = await getToken();
      if (access_token) {
        dispatch(signInSuccess({userToken: access_token}));
        dispatch(getUserProfile());
      } else if (!access_token) {
        let fetchPrevUserType = await getUser();
        if (fetchPrevUserType?.userType) {
          dispatch(updateUser(fetchPrevUserType?.userType));
        }
      }
      let deviceId;
      if (!fetchPrevDevId) {
        deviceId = await DeviceInfo.getUniqueId();
        setItem('Device_Id', deviceId);
      } else {
        deviceId = fetchPrevDevId;
      }
      return deviceId;
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getAsyncItems().then(id => dispatch(updateDeviceToken(id)));
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        Toast.show({
          type: 'error',
          text1: 'You are offline',
          text2: 'Some features may not work until connection is restored.',
        });
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ThemeProvider>
        <PopupProvider>
          <ThemedApp />
          <Toast />
        </PopupProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

export default App;
