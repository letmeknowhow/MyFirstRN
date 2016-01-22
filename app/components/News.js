/**
 * class: News
 * author: Niu Xiaoyu
 * date: 2015-12-24
 * description: 新闻
 */

import React from 'react-native';
import NewsListContainer from './news/NewsListContainer';

const { Component, View, StyleSheet } = React;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  viewPager: {
    flex: 1
  }
});

class Customer extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {};
  }

  // 渲染
  render() {
    return (
      <View style={styles.container} >
        <NewsListContainer style={styles.viewPager} {...this.props} />
      </View>
    );
  }
}
export default Customer;
