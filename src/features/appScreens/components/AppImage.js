import React, {useState} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import FastImage from "@d11/react-native-fast-image";

const AppImage = ({
  uri,
  style,
  resizeMode = FastImage.resizeMode.cover,
  thumbnail,
  loaderSize = 'small',
  borderRadius = 12,
  placeholderColor = '#eaeaea',
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <View style={[styles.container, {borderRadius}]}>
      {/* Thumbnail for instant load */}
      {thumbnail && !loaded && (
        <FastImage
          style={[StyleSheet.absoluteFill, style, {borderRadius, opacity: 0.4}]}
          source={{uri: thumbnail}}
          resizeMode={resizeMode}
        />
      )}

      {/* Main image */}
      <FastImage
        style={[style, {borderRadius}]}
        source={{
          uri: uri,
          priority: FastImage.priority.high,
          cache: FastImage.cacheControl.immutable,
        }}
        resizeMode={resizeMode}
        onLoadEnd={() => setLoaded(true)}
      />

      {/* Placeholder */}
      {!loaded && (
        <View
          style={[
            StyleSheet.absoluteFill,
            styles.placeholder,
            {backgroundColor: placeholderColor, borderRadius},
          ]}>
          <ActivityIndicator size={loaderSize} color={'#999'} />
        </View>
      )}
    </View>
  );
};

export default AppImage;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
