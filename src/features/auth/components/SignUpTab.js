import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import {ms, s, vs, wp} from '../../../utils/responsive';
import { ICONS } from '../../../theme/colors';
// import { MaterialIcons } from "@expo/vector-icons";

const {width} = Dimensions.get('window');

export default function TabSwitcher({
    type
}) {
  const [selected, setSelected] = useState(0);
  const anim = useRef(new Animated.Value(0)).current;

  const options = [
    {label: 'Email', icon: ICONS.email},
    {label: 'Phone', icon: ICONS.telephone},
  ];

  const handlePress = (index,label) => {
    setSelected(index);
    Animated.spring(anim, {
      toValue: index,
      useNativeDriver: false,
      friction: 8,
      tension: 60,
    }).start();
    type(label)
  };

  const tabWidth = width * 0.44;

  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, tabWidth],
  });

  return (
    <View style={styles.container}>
      <View style={styles.tabWrapper}>
        <Animated.View
          style={[
            styles.slider,
            {
              width: tabWidth,
              transform: [{translateX}],
            },
          ]}
        />
        {options.map((opt, index) => (
          <TouchableOpacity
            key={opt.label}
            style={[styles.tab, {width: tabWidth}]}
            onPress={() => handlePress(index,opt)}
            activeOpacity={0.7}>
                <Image source={opt.icon} style={styles.miniIcon}/>
       
            <Text
              style={[
                styles.label,
                {color: selected === index ? '#000' : '#555'},
              ]}>
              {opt.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: vs(15),
  },
  tabWrapper: {
    flexDirection: 'row',
    backgroundColor: '#f4f5f7',
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    height: s(55),
    paddingVertical: vs(4),
    alignItems: 'center',
    width:wp(90),
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: s(45),
  },
  slider: {
    position: 'absolute',
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginHorizontal:ms(5)

  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  miniIcon:{
    width:s(20),
    height:vs(20),
    marginRight:ms(5)
  }
});
