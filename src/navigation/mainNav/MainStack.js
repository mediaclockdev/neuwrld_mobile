import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Dashboard from '../../features/appScreens/userDashboard/Dashboard';
import MyTabs from '../mainNav/MyTabs';
import ProductDetailsScreen from '../../features/appScreens/Product/ProductDetailsScreen';
import Settings from '../../features/appScreens/userProfile/Settings';
import Checkout from '../../features/appScreens/checkout/Checkout';
import AddressScreen from '../../features/appScreens/userProfile/AddressScreen';
import AddAddressScreen from '../../features/appScreens/userProfile/AddAddressScreen';
import Payment from '../../features/appScreens/checkout/Payment';
import Search from '../../features/appScreens/screens/Search';
import MyOrdersScreen from '../../features/appScreens/Orders/MyOrdersScreen';
import FilterScreen from '../../features/appScreens/Product/FilterScreen';
import UpdateProfile from '../../features/appScreens/userProfile/UpdateProfile';
import Notification from '../../features/appScreens/notification/Notification';
import ProductList from '../../features/appScreens/Product/ProductList';
import ProfileDetails from '../../features/appScreens/userProfile/ProfileDetails';
import UserAvatar from '../../features/appScreens/userProfile/UserAvatar';
import Intro from '../../features/auth/screens/Intro/Intro';
import OnboardingScreen from '../../features/auth/screens/onboarding/OnboardingScreen';
import Login from '../../features/auth/screens/Login';
import Signup from '../../features/auth/screens/Signup';
import CouponList from '../../features/appScreens/screens/CouponList';
import PrivacyPolicy from '../../features/appScreens/userProfile/PrivacyPolicy';
import HelpCenter from '../../features/appScreens/userProfile/HelpCenter';
const Stack = createStackNavigator();

export default function MainStack() {
  const horizontalAnimation = {
    gestureDirection: 'horizontal',
    detachPreviousScreen: false,
    cardStyleInterpolator: ({current, layouts}) => {
      return {
        cardStyle: {
          backgroundColor: 'transparent',
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 0],
              }),
            },
          ],
        },
      };
    },
  };
  return (
    <Stack.Navigator screenOptions={horizontalAnimation}>
      
      <Stack.Screen
        name="MyTabs"
        options={{headerShown: false}}
        component={MyTabs}
      />
      <Stack.Screen
        name="ProductList"
        options={{headerShown: false}}
        component={ProductList}
      />
      <Stack.Screen
        name="ProductDetailsScreen"
        options={{headerShown: false}}
        component={ProductDetailsScreen}
      />
      <Stack.Screen
        name="Settings"
        options={{headerShown: false}}
        component={Settings}
      />
      <Stack.Screen
        name="Checkout"
        options={{headerShown: false}}
        component={Checkout}
      />
      <Stack.Screen
        name="AddressScreen"
        options={{headerShown: false}}
        component={AddressScreen}
      />
      <Stack.Screen
        name="AddAddressScreen"
        options={{headerShown: false}}
        component={AddAddressScreen}
      />
      <Stack.Screen
        name="Payment"
        options={{headerShown: false}}
        component={Payment}
      />
      <Stack.Screen
        name="Search"
        options={{headerShown: false}}
        component={Search}
      />
      <Stack.Screen
        name="MyOrdersScreen"
        options={{headerShown: false}}
        component={MyOrdersScreen}
      />

      <Stack.Screen
        name="FilterScreen"
        options={{headerShown: false}}
        component={FilterScreen}
      />
      <Stack.Screen
        name="UpdateProfile"
        options={{headerShown: false}}
        component={UpdateProfile}
      />
      <Stack.Screen
        name="Notification"
        options={{headerShown: false}}
        component={Notification}
      />
      <Stack.Screen
        name="ProfileDetails"
        options={{headerShown: false}}
        component={ProfileDetails}
      />
      <Stack.Screen
        name="UserAvatar"
        options={{headerShown: false}}
        component={UserAvatar}
      />

      {/* // auth part // */}
      <Stack.Screen
        name="Intro"
        options={{headerShown: false}}
        component={Intro}
      />
      <Stack.Screen
        name="OnboardingScreen"
        options={{headerShown: false}}
        component={OnboardingScreen}
      />
      <Stack.Screen
        name="Login"
        options={{headerShown: false}}
        component={Login}
      />

      <Stack.Screen
        name="Signup"
        options={{headerShown: false}}
        component={Signup}
      />
      <Stack.Screen
        name="CouponList"
        options={{headerShown: false}}
        component={CouponList}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        options={{headerShown: false}}
        component={PrivacyPolicy}
      />
      <Stack.Screen
        name="HelpCenter"
        options={{headerShown: false}}
        component={HelpCenter}
      />

    </Stack.Navigator>
  );
}
