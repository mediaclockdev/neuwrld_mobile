import React, {useState} from 'react';
import {View, Text, FlatList, SafeAreaView, StyleSheet} from 'react-native';
import TabSwitcher from '../components/TabSwitcher';
import OrderCard from './OrderCard';
import SubHeader from '../components/SubHeader';
import {goBack, navigate} from '../../../utils/rootNavigation';
import {useTheme} from '../../../context/ThemeContext';
import {ms, vs} from '../../../utils/responsive';
import {useSelector} from 'react-redux';

const MyOrdersScreen = () => {
  const {customerDash, isLoading, allOrders, appliedCoupon, cartData} =
    useSelector(state => state.App);

  const [activeTab, setActiveTab] = useState('Active');
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const handleTrackOrder = order => {
    console.log('Track order:', order);
    // navigate to tracking screen
    navigate('OrderDetailsScreen', {
      order: order,
    });
  };

  console.log('allOrders', allOrders);

  return (
    <SafeAreaView style={styles.parent}>
      <SubHeader onPressLeftIcon={() => goBack()} centerlabel={'My Orders'} />
      <View style={styles.container}>
        {/* <TabSwitcher
          tabs={['Active', 'Completed', 'Cancelled']}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          theme={theme}
        /> */}

        <FlatList
          data={allOrders}
          renderItem={({item}) => (
            <OrderCard
              theme={theme}
              order={item}
              onPress={() => {
                handleTrackOrder(item);
              }}
            />
          )}
          keyExtractor={item => item.id}
          removeClippedSubviews
          initialNumToRender={6}
          maxToRenderPerBatch={6}
          windowSize={7}
        />
      </View>
    </SafeAreaView>
  );
};

export default MyOrdersScreen;

const createStyles = theme =>
  StyleSheet.create({
    parent: {
      flex: 1,
      backgroundColor: theme?.background,
    },
    container: {
      paddingHorizontal: ms(15),
    },
  });

// import React, {useState} from 'react';
// import {View, Text, FlatList, SafeAreaView, StyleSheet} from 'react-native';
// import TabSwitcher from '../components/TabSwitcher';
// import OrderCard from './OrderCard';
// import SubHeader from '../components/SubHeader';
// import {goBack} from '../../../utils/rootNavigation';
// import {useTheme} from '../../../context/ThemeContext';
// import {ms, vs} from '../../../utils/responsive';
// import {useSelector} from 'react-redux';

// export const OrdersScreen = ({navigation, orders}) => {
//   const {customerDash, isLoading, allOrders, appliedCoupon, cartData} =
//     useSelector(state => state.App);

//   const [activeTab, setActiveTab] = useState('Active');
//   const {theme} = useTheme();
//   const styles = createStyles(theme);
//   const handleTrackOrder = order => {
//     console.log('Track order:', order);
//     // navigate to tracking screen
//   };

//   const renderItem = ({item}) => (
//     <OrderCard
//       order={item}
//       onPress={() => navigation.navigate('OrderDetails', {order: item})}
//     />
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={allOrders}
//         keyExtractor={item => item.id}
//         renderItem={renderItem}
//         contentContainerStyle={{padding: 16}}
//         showsVerticalScrollIndicator={false}
//         removeClippedSubviews
//         initialNumToRender={6}
//         maxToRenderPerBatch={6}
//         windowSize={7}
//       />
//     </View>
//   );
// };

// const createStyles = theme =>
//   StyleSheet.create({
//     parent: {
//       flex: 1,
//       backgroundColor: theme?.background,
//     },
//     container: {
//       paddingHorizontal: ms(15),
//     },
//   });
