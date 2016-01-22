/**
 *  Class: AllOfInvestors
 *  Author: Niu Xiaoyu
 *  Date: 15/12/18.
 *  Description: 所有投资人
 */
import React from 'react-native';

import {DataGrid, Column} from '../../baseComponents/DataGrid';

import Button from '../../baseComponents/Button';

const { Component, View, TextInput, StyleSheet, Text, InteractionManager } = React;

const mockData = [
  {name: '张三', tel: '13333333333', invest: '是', active: '是'},
  {name: '张三', tel: '13333333333', invest: '是', active: '是'},
  {name: '张三', tel: '13333333333', invest: '是', active: '是'},
  {name: '张三', tel: '13333333333', invest: '是', active: '是'},
  {name: '张三', tel: '13333333333', invest: '是', active: '是'},
  {name: '张三', tel: '13333333333', invest: '是', active: '是'},
  {name: '张三', tel: '13333333333', invest: '是', active: '是'},
  {name: '张三', tel: '13333333333', invest: '是', active: '是'},
  {name: '张三', tel: '13333333333', invest: '是', active: '是'},
  {name: '张三', tel: '13333333333', invest: '是', active: '是'},
  {name: '张三', tel: '13333333333', invest: '是', active: '是'},
  {name: '张三', tel: '13333333333', invest: '是', active: '是'},
  {name: '张三', tel: '13333333333', invest: '是', active: '是'},
  {name: '张三', tel: '13333333333', invest: '是', active: '是'},
  {name: '张三', tel: '13333333333', invest: '是', active: '是'},
  {name: '张三', tel: '13333333333', invest: '是', active: '是'},
  {name: '张三', tel: '13333333333', invest: '是', active: '是'},
  {name: '张三', tel: '13333333333', invest: '是', active: '是'},
  {name: '张三', tel: '13333333333', invest: '是', active: '是'},
  {name: '张三', tel: '13333333333', invest: '是', active: '是'},
  {name: '张三', tel: '13333333333', invest: '是', active: '是'},
  {name: '张三', tel: '13333333333', invest: '是', active: '是'},
  {name: '张三', tel: '13333333333', invest: '是', active: '是'},
  {name: '张三', tel: '13333333333', invest: '是', active: '是'},
  {name: '张三', tel: '13333333333', invest: '是', active: '是'},
  {name: '张三', tel: '13333333333', invest: '是', active: '是'},
  {name: '张三', tel: '13333333333', invest: '是', active: '是'},
  {name: '张三', tel: '13388888888', invest: '否', active: '否'}
];

const columnConfig = [
  new Column('姓名', 'name'),
  new Column('电话', 'tel'),
  new Column('是否投资', 'invest'),
  new Column('是否激活', 'active'),
];

const mockIsRealName = 200;
const mockIsInvest = 400;
const mockIsActive = 100;

const styles = StyleSheet.create({
  page: {
    flex: 1
  },
  topArea: {
    height: 60,
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  conditionButton: {
    flex: 2,
    height: 35,
    margin: 5,
    borderColor: 'gray', 
    borderWidth: 1, 
    borderRadius: 5
  },
  conditionText: {
    margin: 5,
    color: '#666'
  },
  searchButton: {
    flex: 1,
    backgroundColor: 'red',
    borderColor: 'red'
  },
  toggleButton: {
    borderColor: 'red'
  },
  toggleText: {
    color: 'red'
  },
  topStatistics: {
    borderColor: '#CCC',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginBottom: 10
  },
  statisticsView: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    alignItems: 'center'
  },
  statisticsText: {
    fontSize: 11
  },
  statisticsNumber: {
    fontSize: 16,
    color: 'red'
  }
});

class AllOfInvestors extends Component {
  // 默认属性
  static defaultProps = {};

  // 属性类型
  static propTypes = {};

  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      gridData: [],
      isInvest: true,
      isActive: true
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.updateDataSource();
    });
  }

  updateDataSource() {
    this.setState({
      gridData: mockData
    });
  }

  // 渲染
  render() {
    return (
      <View style={styles.page}>
        <View key={'condition'} style={[styles.topArea]}>
          <TextInput
            key={'name'}
            style={styles.conditionButton}
            placeholder=" 姓名"
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
          />
          <Button key={'isInvest'} style={this.state.isInvest ? [styles.conditionButton, styles.toggleButton] : styles.conditionButton} onPress={this.handleIsInvest.bind(this)}>
            <Text style={this.state.isInvest ? [styles.conditionText, styles.toggleText] : styles.conditionText}>{this.state.isInvest ? '√已投资' : '未投资'}</Text>
          </Button>
          <Button key={'isActive'} style={this.state.isActive ? [styles.conditionButton, styles.toggleButton] : styles.conditionButton} onPress={this.handleIsActive.bind(this)}>
            <Text style={this.state.isActive ? [styles.conditionText, styles.toggleText] : styles.conditionText}>{this.state.isActive ? '√已激活' : '未激活'}</Text>
          </Button>
          <Button key={'serachbutton'} style={[styles.conditionButton, styles.searchButton]}>
            <Text style={[styles.conditionText, {color: 'white'}]}>查询</Text>
          </Button>
        </View>
        <View key={'statistics'} style={[styles.topArea, styles.topStatistics]}>
          <View key={'name'} style={[styles.statisticsView, {borderRightWidth: 1, borderRightColor: '#CCC'}]}>
            <Text key={'number'} style={styles.statisticsNumber}>{mockIsRealName}</Text>
            <Text key={'label'} style={styles.statisticsText}>总实名</Text>
          </View>
          <View key={'invest'} style={[styles.statisticsView, {borderRightWidth: 1, borderRightColor: '#CCC'}]}>
            <Text key={'number'} style={styles.statisticsNumber}>{mockIsInvest}</Text>
            <Text key={'label'} style={styles.statisticsText}>总投资</Text>
          </View>
          <View key={'active'} style={[styles.statisticsView]}>
            <Text key={'number'} style={styles.statisticsNumber}>{mockIsActive}</Text>
            <Text key={'label'} style={styles.statisticsText}>总激活</Text>
          </View>
        </View>
        <DataGrid style={[{flex: 1}]} columns={columnConfig} source={this.state.gridData}/>
      </View>
    );
  }
  
  handleIsInvest() {
    this.setState({
      isInvest: !this.state.isInvest
    });
  }

  handleIsActive() {
    this.setState({
      isActive: !this.state.isActive
    });
  }
}

export default AllOfInvestors;
