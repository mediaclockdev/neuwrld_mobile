import React, {memo, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';

const BottomSheet = ({visible, onBackdropPress, renderChild}) => {
  return (
    <Modal
      isVisible={visible}
      backdropColor="#000"
      backdropOpacity={0.5}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}
      animationOutTiming={250}
      backdropTransitionOutTiming={0}
      avoidKeyboard
      onBackdropPress={onBackdropPress}
      style={styles.modal}>
      <View style={styles.sheetContainer}>
        {renderChild}
      </View>
    </Modal>
  );
};

export default memo(BottomSheet);

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
  },
});


