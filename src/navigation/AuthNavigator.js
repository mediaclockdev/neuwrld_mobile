import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Intro from '../features/auth/screens/Intro/Intro';
import ResetPassword from '../features/auth/screens/forgotPassWordCommon/ResetPassword';
import ValidateOtp from '../features/auth/screens/forgotPassWordCommon/ValidateOtp';
import ConfirmPassword from '../features/auth/screens/forgotPassWordCommon/ConfirmPassword';
import Login from '../features/auth/screens/Login';
import Signup from '../features/auth/screens/Signup';
import OnboardingScreen from '../features/auth/screens/onboarding/OnboardingScreen';
const Stack = createStackNavigator();

const AuthNavigator = () => {
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
        name="ResetPassword"
        options={{headerShown: false}}
        component={ResetPassword}
      />
      <Stack.Screen
        name="ValidateOtp"
        options={{headerShown: false}}
        component={ValidateOtp}
      />
      <Stack.Screen
        name="ConfirmPassword"
        options={{headerShown: false}}
        component={ConfirmPassword}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
