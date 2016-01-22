/**
 * class: Customer
 * author: Niu Xiaoyu
 * date: 2015-12-17
 * description: 客户页
 */
import React from 'react-native';

import CustomerBody from './customer/CustomerBody';

const { Component, View, StyleSheet } = React;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  viewPager: {
    flex: 1,
  }
});

class Customer extends Component {
  // 默认属性
  static defaultProps = {};

  // 属性类型
  static propTypes = {};

  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {};
  }

  // 渲染
  render() {
    return (
      <View style={styles.container}>
        <CustomerBody style={styles.viewPager}/>
      </View>
    );
  }
}

export default Customer;
