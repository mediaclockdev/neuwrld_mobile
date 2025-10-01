import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import { vs } from '../../../utils/responsive';

const TabSwitcher = ({tabs, activeTab, onTabChange, theme}) => {
  const styles = createStyle(theme)
  return (
    <View style={styles.tabContainer}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab}
          style={[styles.tab, activeTab === tab && styles.activeTab]}
          onPress={() => onTabChange(tab)}>
          <Text
            style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const createStyle = (theme) => StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: vs(12),
  },
  tab: {
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {borderBottomColor: theme?.primary_color},
  tabText: {fontSize: 14, color: '#777'},
  activeTabText: {color: theme?.primary_color, fontWeight: '600'},
});

export default TabSwitcher;
