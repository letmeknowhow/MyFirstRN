/* ************************************************************************** */
/*                                                                            */
/* 每位工程师都有保持代码优雅和整洁的义务                                             */
/*                                                                            */
/* ************************************************************************** */
/**
 * Created by saber on 16/1/5.
 */
'use strict';
import React from 'react-native';
import GiftedSpinner from 'react-native-gifted-spinner';
import webApi from '../libs/WebAPI';

const { Component, View, Text } = React;

class LoadSpinner extends Component {
  // 默认属性
  static defaultProps = {};
  // 属性类型
  static propTypes = {};
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {};
    webApi.actions = props.actions;
  }

  componentDidMount() {
    this.props.actions.getSessionToken();
  }

  // 渲染
  render() {
    return (
      <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <GiftedSpinner />
      </View>
    );
  }
}
export default LoadSpinner;
