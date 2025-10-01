import React, {useState} from 'react';
import {View, Text, FlatList, SafeAreaView, StyleSheet} from 'react-native';
import TabSwitcher from '../components/TabSwitcher';
import OrderCard from '../components/OrderCard';
import SubHeader from '../components/SubHeader';
import {goBack} from '../../../utils/rootNavigation';
import {useTheme} from '../../../context/ThemeContext';
import {ms, vs} from '../../../utils/responsive';

const dummyOrders = {
  Active: [
    {
      id: '1',
      title: 'Brown Jacket',
      size: 'XL',
      qty: 10,
      price: 83.97,
      image: 'https://picsum.photos/200/300?random=1',
    },
    {
      id: '2',
      title: 'Brown Suite',
      size: 'L',
      qty: 5,
      price: 120,
      image: 'https://picsum.photos/200/300?random=2',
    },
  ],
  Completed: [
    {
      id: '3',
      title: 'Denim Jacket',
      size: 'M',
      qty: 1,
      price: 99.99,
      image: 'https://picsum.photos/200/300?random=3',
    },
  ],
  Cancelled: [
    {
      id: '4',
      title: 'Leather Coat',
      size: 'XL',
      qty: 2,
      price: 150,
      image: 'https://picsum.photos/200/300?random=4',
    },
  ],
};

const MyOrdersScreen = () => {
  const [activeTab, setActiveTab] = useState('Active');
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const handleTrackOrder = order => {
    console.log('Track order:', order);
    // navigate to tracking screen
  };

  return (
    <SafeAreaView style={styles.parent}>
      <SubHeader onPressLeftIcon={() => goBack()} centerlabel={'My Orders'} />
      <View style={styles.container}>
        <TabSwitcher
          tabs={['Active', 'Completed', 'Cancelled']}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          theme={theme}
        />

        <FlatList
          data={dummyOrders[activeTab]}
          
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <OrderCard theme={theme} order={item} onTrack={handleTrackOrder} />
          )}
          contentContainerStyle={{alignItems:'center',marginVertical:vs(10)}}
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
