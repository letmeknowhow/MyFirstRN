import { StyleSheet, PixelRatio } from 'react-native';
import Dimensions from 'Dimensions';

/** 计算屏幕宽度和高度 */
export const device = Dimensions.get('window');
/** 像素比*/
export const px = (pts) => pts / PixelRatio.get();

/**
 * 全局变量
 */
export const config = {

  fontFamily: '', // 字体

  /** 尺寸变量*/
  margin: 0, // 边界
  padding: px(10), // 内补
  deviceWidth: device.width, // 设备宽度
  deviceHeight: device.height, // 设备高度

  /** 颜色变量*/
  defaultColor: 'white', // 默认色
  primaryColor: 'red', // 主色
  successColor: 'green', // 成功状态
  warningColor: 'yellow', // 警告状态
  errorColor: 'red', // 错误状态

  /** 背景色 */
  mainBgColor: 'white', // 主背景色
  barBgColor: 'white', // 导航条背景色
  tabBgColor: 'gray', // tab背景色

  /** 文字变量*/
  lgSize: px(30),
  mdSize: px(20),
  smSize: px(16),
  xsSize: px(12)
};
