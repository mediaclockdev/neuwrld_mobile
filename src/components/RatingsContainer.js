import {StyleSheet, Text, Image, View} from 'react-native';
import React from 'react';
// import {FONTS, GLobalImg, Theme} from '../Utils/Theme';
import * as Progress from 'react-native-progress';
import {ms} from '../utils/responsive';
import {fontFamily} from '../theme/typography';
import {ICONS} from '../theme/colors';
const RatingsContainer = ({productRate, theme, contStyle}) => {
  const rating = ['1', '2', '3', '4', '5'];
  return productRate?.ratings.map(data => {
    return (
      <View style={styles.row}>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: ms(2),
          }}>
          {rating.map(star => (
            <Image
              source={star <= data?.star ? ICONS?.star : ICONS?.emptyStar}
              style={[
                styles.star,
                {
                  tintColor: star <= data?.star ? theme?.yellow : '#FFFCEE',
                },
              ]}
            />
          ))}
        </View>
        <Progress.Bar
          progress={
            data?.totalCount < 10
              ? data?.totalCount / 10
              : data?.totalCount / 100
          }
          width={ms(140)}
          borderWidth={0}
          borderRadius={20}
          style={{
            backgroundColor: theme?.section_background,
            height: ms(5),
            marginLeft: ms(8),
            justifyContent: 'center',
          }}
          color={theme.primary_color}
        />
        <Text numberOfLines={1} style={styles.totalCount}>
          {data?.totalCount}
        </Text>
      </View>
    );
  });
};

export default RatingsContainer;

const styles = StyleSheet.create({
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  star: {
    width: ms(14),
    height: ms(14),
    margin: ms(2),
  },
  totalCount: {
    fontFamily: fontFamily.poppins_medium,
    color: '#696969',
    fontSize: ms(12),
  },
});
