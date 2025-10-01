import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Dashboard from '../../features/appScreens/screens/Dashboard';
import MyTabs from '../mainNav/MyTabs';
import ProductDetailsScreen from '../../features/appScreens/screens/ProductDetailsScreen';
import Settings from '../../features/appScreens/userProfile/Settings';
import Checkout from '../../features/appScreens/screens/Checkout';
import AddressScreen from '../../features/appScreens/userProfile/AddressScreen';
import AddAddressScreen from '../../features/appScreens/userProfile/AddAddressScreen';
import Payment from '../../features/appScreens/screens/Payment';
import Search from '../../features/appScreens/screens/Search';
import MyOrdersScreen from '../../features/appScreens/Orders/MyOrdersScreen';
import Product from '../../features/appScreens/Product/Products';
import FilterScreen from '../../features/appScreens/Product/FilterScreen';
import updateProfile from '../../features/appScreens/userProfile/updateProfile';
import Notification from '../../features/appScreens/notification/Notification';
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
        name="Product"
        options={{headerShown: false}}
        component={Product}
      />
      <Stack.Screen
        name="FilterScreen"
        options={{headerShown: false}}
        component={FilterScreen}
      />
      <Stack.Screen
        name="updateProfile"
        options={{headerShown: false}}
        component={updateProfile}
      />
      <Stack.Screen
        name="Notification"
        options={{headerShown: false}}
        component={Notification}
      />
    </Stack.Navigator>
  );
}
