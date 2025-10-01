import React, {useRef, useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Animated,
  Dimensions,
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {ICONS} from '../../theme/colors';
import {s, rr, vs, ms} from '../../utils/responsive';
import {useTheme} from '../../context/ThemeContext';
import Dashboard from '../../features/appScreens/screens/Dashboard';
import Wishlist from '../../features/appScreens/screens/Wishlist';
import Category from '../../features/appScreens/screens/Category';
import Cart from '../../features/appScreens/screens/Cart';
import UserProfile from '../../features/appScreens/userProfile/UserProfile';

const Tab = createBottomTabNavigator();
const {width} = Dimensions.get('window');
const TAB_COUNT = 5;
const TAB_WIDTH = width / TAB_COUNT;
const PILL_SIZE = s(50);

export default function MyTabs() {
  const translateX = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const {theme} = useTheme();

  const CustomTabBar = ({state, descriptors, navigation}) => {
    const [activeTab, setActiveTab] = useState(state.routes[state.index].name);

    useEffect(() => {
      // Center pill under active tab
      const targetX = state.index * TAB_WIDTH + TAB_WIDTH / 2 - PILL_SIZE / 2;

      Animated.spring(translateX, {
        toValue: targetX,
        useNativeDriver: true,
        friction: 6,
        tension: 60,
      }).start();

      // Icon bounce animation
      Animated.sequence([
        Animated.spring(scaleValue, {
          toValue: 1.15,
          useNativeDriver: true,
          friction: 3,
        }),
        Animated.spring(scaleValue, {
          toValue: 1,
          useNativeDriver: true,
          friction: 4,
        }),
      ]).start();
    }, [state.index]);

    return (
      <View style={styles.tabBarContainer}>
        {/* Blur background */}
        <BlurView
          style={StyleSheet.absoluteFillObject}
          blurType="light"
          blurAmount={20}
          reducedTransparencyFallbackColor="white"
        />

        {/* Sliding pill */}
        <Animated.View
          style={[
            styles.pill,
            {
              transform: [{translateX}],
              
            },
          ]}
        />

        {/* Tab Items */}
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const focused = state.index === index;
          let iconName;
          if (route.name === 'Home') iconName = ICONS.home;
          else if (route.name === 'Wishlist') iconName = ICONS.wishlistList;
          else if (route.name === 'Category') iconName = ICONS.category;
          else if (route.name === 'Cart') iconName = ICONS.add_to_cart;
          else if (route.name === 'Profile') iconName = ICONS.user;
          const color = focused ? theme?.background : theme?.text;

          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => {
                setActiveTab(route.name);
                navigation.navigate(route.name);
              }}>
              <Animated.View
                style={[
                  styles.tabItem,
                  {transform: [{scale: focused ? scaleValue : 1}]},
                ]}>
                <Image
                  source={iconName}
                  style={{width: s(25), height: s(25), tintColor: color}}
                  resizeMode="contain"
                />
              </Animated.View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    );
  };

  return (
    <Tab.Navigator initialRouteName='Home'
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'transparent',
          position: 'absolute',
          elevation: 0,
        },
      }}
      tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen name="Home" component={Dashboard} />
      <Tab.Screen name="Wishlist" component={Wishlist} />
      <Tab.Screen name="Category" component={Category} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Profile" component={UserProfile} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    height: s(70),
    paddingTop: vs(10),
    borderRadius: rr(40),
    marginHorizontal: ms(5), // space from left/right
    marginBottom: vs(7), // lift above bottom
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',

    // Shadow for floating effect
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },

  pill: {
    position: 'absolute',
    height: PILL_SIZE,
    width: PILL_SIZE,
    // backgroundColor: '#2B2B2B',
    backgroundColor: '#C49A6C',
    // backgroundColor: 'rgba(0,0,0,0.85)',
    borderRadius: rr(100),
    top: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabItem: {
    width: TAB_WIDTH,
    height: s(45),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
