import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Dropdown} from 'react-native-element-dropdown';

// ✅ Custom Dropdown using react-native-element-dropdown
export const CustomDropdown = ({
  data,
  value,
  setValue,
  placeholder,
  error,
  onOpen,
  onClose,
}) => (
  <View style={{marginBottom: 12}}>
    <Dropdown
      style={[styles.dropdown, error && {borderColor: 'red'}]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={placeholder}
      value={value}
      onFocus={onOpen} // dropdown open event
      onBlur={onClose} // dropdown close event
      onChange={item => setValue(item.value)}
    />
    {error && <Text style={styles.error}>{error}</Text>}
  </View>
);

const styles = StyleSheet.create({
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 50,
  },
  error: {color: 'red', fontSize: 12, marginTop: 4},
  placeholderStyle: {
    color: '#999',
  },
});
