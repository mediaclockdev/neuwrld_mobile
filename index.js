/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import store from './src/store/Index';
import { Platform, UIManager } from 'react-native';// App.js or index.js

// if (Platform.OS === 'android') {
//   if (UIManager.setLayoutAnimationEnabledExperimental) {
//     UIManager.setLayoutAnimationEnabledExperimental(true);
//   }
// }

// // Optional: Define a global easy-to-use animation preset
// import { LayoutAnimation } from 'react-native';

// global.spring = () => {
//   LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
// };

// global.easeInEaseOut = () => {
//   LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
// };

// global.linear = () => {
//   LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
// };

LogBox.ignoreAllLogs();

const neuwrld = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => neuwrld);
