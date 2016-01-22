/**
 *  Class: Training
 *  Author: Niu Xiaoyu
 *  Date: 15/12/23.
 *  Description: 培训
 */
import React from 'react-native';
const { Component, View, Text, StyleSheet, Image } = React;
import Accordion from 'react-native-collapsible/Accordion';

const SECTIONS = [
  {
    title: '精品课件',
    icon: require('../../assets/Courseware.png'),
    content: [
      {
        icon: require('../../assets/loan.png'),
        content: '心仪贷产品介绍'
      },
      {
        icon: require('../../assets/vehicle.png'),
        content: '车源宝产品介绍'
      },
      {
        icon: require('../../assets/gold.png'),
        content: '金房宝产品介绍'
      },
    ],
  },
  {
    title: '推广知识',
    icon: require('../../assets/Extension.png'),
    content: [
      {
        icon: require('../../assets/loan.png'),
        content: '心仪贷产品介绍'
      },
      {
        icon: require('../../assets/vehicle.png'),
        content: '车源宝产品介绍'
      },
      {
        icon: require('../../assets/gold.png'),
        content: '金房宝产品介绍'
      },
    ],
  },
  {
    title: '产品知识',
    icon: require('../../assets/knowledge.png'),
    content: [
      {
        icon: require('../../assets/loan.png'),
        content: '心仪贷产品介绍'
      },
      {
        icon: require('../../assets/vehicle.png'),
        content: '车源宝产品介绍'
      },
      {
        icon: require('../../assets/gold.png'),
        content: '金房宝产品介绍'
      },
    ],
  }
];

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#efefef'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'white'
  },
  headerText: {
    fontSize: 16
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  product: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
  },
  productText: {
    fontSize: 12
  },
});

class Training extends Component {
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
  
  _renderHeader(section) {
    return (
      <View style={styles.header}>
        <Image style={{margin: 10}} source={section.icon} />
        <Text style={styles.headerText}>{section.title}</Text>
      </View>
    );
  }
  
  _renderContent(section) {
    let products = section.content.map(item => {
      return (
        <View key={item.content} style={styles.product}>
          <Image style={{margin: 10}} source={item.icon} />
          <Text style={styles.productText}>{item.content}</Text>
        </View>
      );
    });
    return (
      <View style={styles.content}>
        {products}
      </View>
    );
  }

  // 渲染
  render() {
    return (
      <Accordion style={styles.page}
                 sections={SECTIONS}
                 easing="easeInOut"
                 underlayColor="#efefef"
                 renderHeader={this._renderHeader}
                 renderContent={this._renderContent}
      />
    );
  }

}

export default Training;
