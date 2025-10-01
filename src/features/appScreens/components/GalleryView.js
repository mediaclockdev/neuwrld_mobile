import {
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Text,
  View,
  Dimensions,
} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
const {width, height} = Dimensions.get('window');

const GalleryView = ({
  isVisible,
  type = 'info', // success | error | warning | info
  title = '',
  message = '',
  onConfirm,
  onCancel,
  selectedIndex,
  confirmText = 'OK',
  cancelText = 'Cancel',
  showCancel = false,
  product,
  backdropPressToClose = true,

  setGalleryVisible,
}) => {
  return (
    <View>
      <Modal
        isVisible={isVisible}
        onBackdropPress={backdropPressToClose ? onCancel : undefined}
        useNativeDriver
        animationIn="zoomIn"
        animationOut="zoomOut"
        backdropOpacity={0.5}>
        <View style={styles.modalContainer}>
          <FlatList
            data={product.images}
            horizontal
            pagingEnabled
            initialScrollIndex={selectedIndex}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <Image source={{uri: item}} style={styles.fullImage} />
            )}
          />

          {/* Pagination Dots */}
          <View style={styles.pagination}>
            {product.images.map((_, i) => (
              <View
                key={i}
                style={[styles.dot, i === selectedIndex && styles.activeDot]}
              />
            ))}
          </View>

          {/* Close Button */}
          <TouchableOpacity style={styles.closeBtn} onPress={setGalleryVisible}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default GalleryView;

const styles = StyleSheet.create({
  carousel: {
    marginVertical: 10,
  },
  thumbnailWrapper: {
    marginRight: 10,
    position: 'relative',
  },
  thumbnail: {
    width: 70,
    height: 90,
    borderRadius: 8,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  overlayText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: width,
    height: height,
    resizeMode: 'contain',
  },
  pagination: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'gray',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: 'white',
    width: 12,
  },
  closeBtn: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 10,
    borderRadius: 20,
  },
  closeText: {
    color: 'white',
    fontSize: 20,
  },
});
