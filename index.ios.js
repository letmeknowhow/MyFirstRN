import React from 'react-native';
import AppContainer from './app/containers/index';
const { AppRegistry, Platform, StatusBarIOS } = React;
//noinspection JSCheckFunctionSignatures
if (Platform.OS === 'ios') {
  StatusBarIOS.setStyle(1);
}
AppRegistry.registerComponent('WealthApp', () => AppContainer);
