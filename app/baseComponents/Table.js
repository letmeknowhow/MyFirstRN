/**
 * Created by gaoletian on 15/12/9.
 */
import React from 'react-native';
import styles from 'styles';

const { Component, View, Text } = React;

class Table extends Component {
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

  // 自定义方法
  handle() {

  }

  // 渲染
  render() {
    return (
      <View>
        <Text style={styles.textDefault}>
          Table
        </Text>
      </View>
    );
  }

}

export default Table;
