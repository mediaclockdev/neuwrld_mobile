import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Dashboard from '../../features/appScreens/userDashboard/Dashboard';
import MyTabs from './MyTabs';
const Stack = createStackNavigator();

export default function OwnerNavigator() {
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
    </Stack.Navigator>
  );
}
