import React, {forwardRef} from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';

const AvatarWebView = forwardRef((_, ref) => {
  return (
    <View style={{height: '100%'}}>
      <WebView
        source={{uri: 'file:///android_asset/avatar/index.html'}}
        originWhitelist={['*']}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowFileAccess={true}
        allowUniversalAccessFromFileURLs={true}
        mixedContentMode="always"
      />
    </View>
  );
});

export default AvatarWebView;
