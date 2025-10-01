import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Appnavigator from './src/navigation/Appnavigator';
import {ThemeProvider, useTheme} from './src/context/ThemeContext';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

import {PopupProvider} from './src/context/PopupContext';


const App = () => {
  function ThemedApp() {
    const {theme} = useTheme();

    return (
        <SafeAreaProvider>
          {/* StatusBar - works with notch/dynamic island */}
          <StatusBar
            barStyle={'light-content'}
            // barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
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

  // const getAsyncItems = async () => {
  //     try {
  //       let fetchPrevDevId = StorageMMKV.getUserPreferences('Device_Id');
  //       let deviceId;
  //       if (!fetchPrevDevId) {
  //         deviceId = await DeviceInfo.getUniqueId();
  //         StorageMMKV.setUserPreferences('Device_Id', deviceId);
  //       } else {
  //         deviceId = fetchPrevDevId;
  //       }
  //       return deviceId;
  //     } catch (error) {
  //       return error;
  //     }
  //   };

  //   useEffect(() => {
  //     getAsyncItems().then(id => dispatch(updateDeviceId(id)));
  //     let access_token = StorageMMKV.getUserPreferences('access-token');
  //     if (access_token) {
  //       dispatch(updateAuthToken(access_token));
  //     }

  //     Orientation.lockToPortrait();
  //   }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ThemeProvider>
        <PopupProvider>

          <ThemedApp />
        </PopupProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

export default App;

