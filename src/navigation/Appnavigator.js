import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthNavigator from './AuthNavigator';
import SplashScreen from '../components/SplashScreen';
import {getUser} from '../utils/authStorage';
import MainStack from './mainNav/MainStack';
import {navigationRef} from '../utils/rootNavigation';
import {useDispatch, useSelector} from 'react-redux';

const Stack = createStackNavigator();

const Appnavigator = () => {
  const [isAppReady, setIsAppReady] = useState(false);
  //   const {userDetailRes, customerCallDetails, reciverJoined, isLoading} =
  //     useSelector(state => state.ProfileReducer);
  const dispatch = useDispatch();
  React.useEffect(() => {
    const timer = setTimeout(() => setIsAppReady(true), 1500);
    if (!isAppReady);
    return () => clearTimeout(timer);
  }, []);

  if (!isAppReady) {
    return <SplashScreen />;
  }

  // Root Navigation that decides role
  const RootNavigator = () => {
    const {token, isGuest} = useSelector(state => state.Auth);

    if (token || isGuest) {
      return <MainStack />;
    }

    return <AuthNavigator />;
  };

  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Root" component={RootNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Appnavigator;

const styles = StyleSheet.create({});
