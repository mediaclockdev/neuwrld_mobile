import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import { Sort_By } from '../../../utils/globalJson';

const SortSheet = ({selected, onSelect, onClose, isSorting}) => {
  const renderItem = ({item}) => {
    const isActive = selected === item.key;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onSelect(item)}
        style={[
          styles.option,
          isActive && styles.activeOption,
        ]}>
        <Text style={[styles.label, isActive && styles.activeLabel]}>
          {item.label}
        </Text>
        {isActive && <Text style={styles.tick}>✓</Text>}
      </TouchableOpacity>
    );
  };

  return (
    <View>
      {/* Handle */}
      <View style={styles.handle} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Sort By</Text>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.close}>Close</Text>
        </TouchableOpacity>
      </View>

      {isSorting && (
        <Text style={styles.sortingText}>Updating results…</Text>
      )}

      <FlatList
        data={Sort_By}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{paddingBottom: 10}}
      />
    </View>
  );
};

export default SortSheet;

const styles = StyleSheet.create({
  handle: {
    width: 40,
    height: 5,
    backgroundColor: '#ddd',
    borderRadius: 3,
    alignSelf: 'center',
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
  },
  close: {
    color: '#888',
    fontSize: 14,
  },
  sortingText: {
    fontSize: 12,
    color: '#999',
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  activeOption: {
    backgroundColor: '#f7f7ff',
  },
  label: {
    fontSize: 15,
    color: '#333',
  },
  activeLabel: {
    color: '#5b5bff',
    fontWeight: '600',
  },
  tick: {
    fontSize: 16,
    color: '#5b5bff',
    fontWeight: '700',
  },
});
