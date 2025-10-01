// NotificationScreen.js
import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {ICONS} from '../../../theme/colors';
import SubHeader from '../components/SubHeader';
import {goBack} from '../../../utils/rootNavigation';
// import Icon from "react-native-vector-icons/Feather"; // install: yarn add react-native-vector-icons

const notifications = [
  {
    title: 'Today',
    data: [
      {
        id: '1',
        title: 'Order Shipped',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
        time: '1h',
        icon: ICONS.delivery,
      },
      {
        id: '2',
        title: 'Flash Sale Alert',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
        time: '1h',
        icon: ICONS.lightning,
      },
      {
        id: '3',
        title: 'Product Review Request',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
        time: '1h',
        icon: ICONS.bell,
      },
    ],
  },
  {
    title: 'Yesterday',
    data: [
      {
        id: '4',
        title: 'Order Shipped',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
        time: '1d',
        icon: ICONS.delivery,
      },
      {
        id: '5',
        title: 'New Paypal Added',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
        time: '1d',
        icon: ICONS.information,
      },
      {
        id: '6',
        title: 'Flash Sale Alert',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
        time: '1d',
        icon: ICONS.lightning,
      },
    ],
  },
];

const Notification = () => {
  const renderNotification = item => (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Image
          source={item.icon}
          style={{width: 20, height: 20, resizeMode: 'contain'}}
        />
        {/* <Icon name={item.icon} size={22} color="#a67c52" /> */}
      </View>
      <View style={{flex: 1}}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
      <Text style={styles.time}>{item.time}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <SubHeader
        onPressLeftIcon={() => {
          goBack();
        }}
        centerlabel={'Notifications'}
       
        hideRigthIcon={true}
      />
      <FlatList
        data={notifications}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{item.title}</Text>
              <TouchableOpacity>
                <Text style={styles.markRead}>Mark all as read</Text>
              </TouchableOpacity>
            </View>
            {item.data.map(notif => (
              <View key={notif.id}>{renderNotification(notif)}</View>
            ))}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase',
  },
  markRead: {
    fontSize: 13,
    color: '#a67c52',
    fontWeight: '500',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#eee',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f6f4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  description: {
    fontSize: 13,
    color: '#777',
    marginTop: 2,
  },
  time: {
    fontSize: 12,
    color: '#999',
    marginLeft: 8,
  },
});

export default Notification;
