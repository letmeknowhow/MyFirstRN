'use strict';

var _ = require('lodash');

const Components = {
  /* Components*/
  ActivityIndicatorIOS: {name: 'ActivityIndicatorIOS', description: 'ReactNative Component'},
  ART: {name: 'ART', description: 'ReactNative Component'},
  DatePickerIOS: {name: 'DatePickerIOS', description: 'ReactNative Component'},
  DrawerLayoutAndroid: {name: 'DrawerLayoutAndroid', description: 'ReactNative Component'},
  Image: {name: 'Image', description: 'ReactNative Component'},
  ListView: {name: 'ListView', description: 'ReactNative Component'},
  MapView: {name: 'MapView', description: 'ReactNative Component'},
  Modal: {name: 'Modal', description: 'ReactNative Component'},
  Navigator: {name: 'Navigator', description: 'ReactNative Component'},
  NavigatorIOS: {name: 'NavigatorIOS', description: 'ReactNative Component'},
  PickerIOS: {name: 'PickerIOS', description: 'ReactNative Component'},
  ProgressBarAndroid: {name: 'ProgressBarAndroid', description: 'ReactNative Component'},
  ProgressViewIOS: {name: 'ProgressViewIOS', description: 'ReactNative Component'},
  ScrollView: {name: 'ScrollView', description: 'ReactNative Component'},
  SegmentedControlIOS: {name: 'SegmentedControlIOS', description: 'ReactNative Component'},
  SliderIOS: {name: 'SliderIOS', description: 'ReactNative Component'},
  SnapshotViewIOS: {name: 'SnapshotViewIOS', description: 'ReactNative Component'},
  Switch: {name: 'Switch', description: 'ReactNative Component'},
  SwitchAndroid: {name: 'SwitchAndroid', description: 'ReactNative Component'},
  SwitchIOS: {name: 'SwitchIOS', description: 'ReactNative Component'},
  TabBarIOS: {name: 'TabBarIOS', description: 'ReactNative Component'},
  Text: {name: 'Text', description: 'ReactNative Component'},
  TextInput: {name: 'TextInput', description: 'ReactNative Component'},
  ToastAndroid: {name: 'ToastAndroid', description: 'ReactNative Component'},
  ToolbarAndroid: {name: 'ToolbarAndroid', description: 'ReactNative Component'},
  Touchable: {name: 'Touchable', description: 'ReactNative Component'},
  TouchableHighlight: {name: 'TouchableHighlight', description: 'ReactNative Component'},
  TouchableNativeFeedback: {name: 'TouchableNativeFeedback', description: 'ReactNative Component'},
  TouchableOpacity: {name: 'TouchableOpacity', description: 'ReactNative Component'},
  TouchableWithoutFeedback: {name: 'TouchableWithoutFeedback', description: 'ReactNative Component'},
  View: {name: 'View', description: 'ReactNative Component'},
  ViewPagerAndroid: {name: 'ViewPagerAndroid', description: 'ReactNative Component'},
  WebView: {name: 'WebView', description: 'ReactNative Component'},
};
const Apis = {
  /* APIs*/
  ActionSheetIOS: {name: 'ActionSheetIOS', description: 'ReactNative Api'},
  AdSupportIOS: {name: 'AdSupportIOS', description: 'ReactNative Api'},
  AlertIOS: {name: 'AlertIOS', description: 'ReactNative Api'},
  Animated: {name: 'Animated', description: 'ReactNative Api'},
  AppRegistry: {name: 'AppRegistry', description: 'ReactNative Api'},
  AppStateIOS: {name: 'AppStateIOS', description: 'ReactNative Api'},
  AsyncStorage: {name: 'AsyncStorage', description: 'ReactNative Api'},
  BackAndroid: {name: 'BackAndroid', description: 'ReactNative Api'},
  CameraRoll: {name: 'CameraRoll', description: 'ReactNative Api'},
  Dimensions: {name: 'Dimensions', description: 'ReactNative Api'},
  Easing: {name: 'Easing', description: 'ReactNative Api'},
  ImagePickerIOS: {name: 'ImagePickerIOS', description: 'ReactNative Api'},
  IntentAndroid: {name: 'IntentAndroid', description: 'ReactNative Api'},
  InteractionManager: {name: 'InteractionManager', description: 'ReactNative Api'},
  LayoutAnimation: {name: 'LayoutAnimation', description: 'ReactNative Api'},
  LinkingIOS: {name: 'LinkingIOS', description: 'ReactNative Api'},
  NetInfo: {name: 'NetInfo', description: 'ReactNative Api'},
  PanResponder: {name: 'PanResponder', description: 'ReactNative Api'},
  PixelRatio: {name: 'PixelRatio', description: 'ReactNative Api'},
  PushNotificationIOS: {name: 'PushNotificationIOS', description: 'ReactNative Api'},
  Settings: {name: 'Settings', description: 'ReactNative Api'},
  StatusBarIOS: {name: 'StatusBarIOS', description: 'ReactNative Api'},
  StyleSheet: {name: 'StyleSheet', description: 'ReactNative Api'},
  VibrationIOS: {name: 'VibrationIOS', description: 'ReactNative Api'}, /* Plugins*/
  DeviceEventEmitter: {name: 'DeviceEventEmitter', description: 'ReactNative Api'},
  NativeAppEventEmitter: {name: 'NativeAppEventEmitter', description: 'ReactNative Api'},
  NativeModules: {name: 'NativeModules', description: 'ReactNative Api'},
  Platform: {name: 'Platform', description: 'ReactNative Api'},
  processColor: {name: 'processColor', description: 'ReactNative Api'},
  requireNativeComponent: {name: 'requireNativeComponent', description: 'ReactNative Api'}, /* Prop Types*/
  EdgeInsetsPropType: {name: 'EdgeInsetsPropType', description: 'ReactNative Api'},
  PointPropType: {name: 'PointPropType', description: 'ReactNative Api'},
};
/* See http://facebook.github.io/react/docs/addons.html*/
const addons = {
  LinkedStateMixin: {name: 'LinkedStateMixin', description: 'ReactNative addons'},
  Perf: {name: 'LinkedStateMixin', description: 'ReactNative addons'},
  PureRenderMixin: {name: 'Perf', description: 'ReactNative addons'},
  TestModule: {name: 'TestModule', description: 'ReactNative addons'},
  TestUtils: {name: 'TestUtils', description: 'ReactNative addons'},
  batchedUpdates: {name: 'batchedUpdates', description: 'ReactNative addons'},
  cloneWithProps: {name: 'cloneWithProps', description: 'ReactNative addons'},
  createFragment: {name: 'createFragment', description: 'ReactNative addons'},
  update: {name: 'update', description: 'ReactNative addons'},
};

let styles = [
  'alignItems', 'alignSelf',
  'borderBottomWidth', 'borderLeftWidth', 'borderRightWidth', 'borderTopWidth', 'borderWidth', 'bottom',
  'flex', 'flexDirection', 'flexWrap', 'height', 'justifyContent', 'left', 
  'margin', 'marginBottom', 'marginHorizontal', 'marginLeft', 'marginRight',
  'marginTop', 'marginVertical', 'maxHeight', 'maxWidth', 'minHeight', 'minWidth', 'padding',
  'paddingBottom', 'paddingHorizontal', 'paddingLeft', 'paddingRight', 'paddingTop', 'paddingVertical',
  'position', 'right', 'top', 'width',
  'flex-start', 'flex-end', 'center', 'stretch',
  'color', 'fontFamily', 'fontSize', 'fontStyle', 'fontWeight', 'letterSpacing', 'lineHeight', 'textAlign', 'textDecorationLine', 'textDecorationStyle', 'textDecorationColor', 'writingDirection',
  'backfaceVisibility', 'backgroundColor', 'borderColor', 'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor', 'borderRadius', 'borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomLeftRadius', 'borderBottomRightRadius', 'borderStyle', 'borderWidth', 'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth', 'opacity', 'overflow', 'shadowColor', 'shadowOffset', 'shadowOpacity', 'shadowRadius',
  'contain','cover','stretch'
];

styles =  _.uniq(styles);

function createTemplate(data) {
  let result = '';
  Object.keys(data).forEach(key=> {

    const templet = `
  <template name="${data[key].name}" value="${data[key].name}" description="${data[key].description}" toReformat="true" toShortenFQNames="true">
    <context>
      <option name="JAVA_SCRIPT" value="true" />
      <option name="JS_EXPRESSION" value="true" />
      <option name="JSX_HTML" value="false" />
      <option name="JS_STATEMENT" value="true" />
    </context>
  </template>
`;

    result += templet;

  });

  return result;
}

function createStyleTemplate(data,_desc) {
  let result = '';
  data.map(item => {

    const templet = `
  <template name="${item}" value="${item}" description="${_desc}" toReformat="true" toShortenFQNames="true">
    <context>
      <option name="JAVA_SCRIPT" value="true" />
      <option name="JS_EXPRESSION" value="true" />
      <option name="JSX_HTML" value="false" />
      <option name="JS_STATEMENT" value="true" />
    </context>
  </template>
`;

    result += templet;

  });

  return result;
}

//console.log(createTemplate(Components), createTemplate(Apis));
//console.log(createTemplate(addons));

console.log(createStyleTemplate(styles,'ReactNative StyleSheet'))
 

