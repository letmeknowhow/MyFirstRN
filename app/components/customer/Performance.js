/**
 *  Class: Performance
 *  Author: Niu Xiaoyu
 *  Date: 15/12/18.
 *  Description: 业绩跟踪
 */
import React from 'react-native';

import {DataGrid, Column} from '../../baseComponents/DataGrid';

const { Component, View, Text, StyleSheet, Image, TouchableOpacity, InteractionManager } = React;

//DatePicker
import DatePicker from './DatePicker';
const curYear = new Date().getFullYear();
const curMonth = new Date().getMonth();
const monthes = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

let years = [];

for (let i = 0; i < 10; i++) {
  years.push((curYear - i + 2).toString());
}
const mockPickerData = [
  years,
  monthes
];

const mockSelectedValue = [curYear.toString(), monthes[curMonth].toString()];

const mockData = [
  {name: '张三', tel: '13333333333', investCount: '10000', fundChanged: '2000'},
  {name: '张三', tel: '13333333333', investCount: '5000', fundChanged: '-2000'},
  {name: '张三', tel: '13333333333', investCount: '34000', fundChanged: '-2000'},
  {name: '张三', tel: '13333333333', investCount: '343423', fundChanged: '2000'},
  {name: '张三', tel: '13333333333', investCount: '23342', fundChanged: '2000'},
  {name: '张三', tel: '13333333333', investCount: '234234', fundChanged: '-2000'},
  {name: '张三', tel: '13333333333', investCount: '20000', fundChanged: '-2000'},
  {name: '张三', tel: '13333333333', investCount: '55555', fundChanged: '2000'},
  {name: '张三', tel: '13333333333', investCount: '111111', fundChanged: '2000'},
  {name: '张三', tel: '13333333333', investCount: '111111', fundChanged: '2000'},
  {name: '张三', tel: '13333333333', investCount: '343423', fundChanged: '2000'},
  {name: '张三', tel: '13333333333', investCount: '23342', fundChanged: '2000'},
  {name: '张三', tel: '13333333333', investCount: '234234', fundChanged: '-2000'},
  {name: '张三', tel: '13333333333', investCount: '20000', fundChanged: '-2000'},
  {name: '张三', tel: '13333333333', investCount: '55555', fundChanged: '2000'},
  {name: '张三', tel: '13333333333', investCount: '111111', fundChanged: '2000'},
  {name: '张三', tel: '13333333333', investCount: '111111', fundChanged: '2000'},
  {name: '张三', tel: '13333333333', investCount: '111111', fundChanged: '2000'},
  {name: '张三', tel: '13333333333', investCount: '111111', fundChanged: '2000'},
  {name: '张三', tel: '13333333333', investCount: '343423', fundChanged: '2000'},
  {name: '张三', tel: '13333333333', investCount: '23342', fundChanged: '2000'},
  {name: '张三', tel: '13333333333', investCount: '234234', fundChanged: '-2000'},
  {name: '张三', tel: '13333333333', investCount: '20000', fundChanged: '-2000'},
  {name: '张三', tel: '13333333333', investCount: '55555', fundChanged: '2000'},
  {name: '张三', tel: '13333333333', investCount: '111111', fundChanged: '2000'},
  {name: '张三', tel: '13388888888', investCount: '8888', fundChanged: '8888'}
];

const columnConfig = [
  new Column('姓名', 'name'),
  new Column('电话', 'tel'),
  new Column('年化投资额', 'investCount'),
  new Column('资金变动', 'fundChanged'),
];

const styles = StyleSheet.create({
  page: {
    flex: 1
  },
  topArea: {
    height: 60,
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center'
  },
  dateButton: {
    flex: 1,
    height: 35,
    margin: 5,
    padding: 3,
    alignItems: 'flex-start',
    borderWidth: 0
  },
  dateText: {
    flex: 1,
    textAlign: 'left',
    margin: 5,
    color: 'red'
  }
});

class Performance extends Component {
  // 默认属性
  static defaultProps = {};

  // 属性类型
  static propTypes = {};

  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      data: [],
      selectYear: curYear.toString(),
      selectMonth: monthes[curMonth].toString()
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.updateDataSource();
    });
  }

  updateDataSource() {
    this.setState({
      data: mockData
    });
  }

  // 渲染
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.topArea}>
          <Image style={{margin: 10}} source={require('../../../assets/date.png')}/>
          <Text>查询日期: </Text>
          <TouchableOpacity style={styles.dateButton} onPress={this.handleShowDatePicker.bind(this)}>
            <Text style={styles.dateText}>{`${this.state.selectYear}年${this.state.selectMonth}`}</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <DataGrid columns={columnConfig} source={this.state.data}/>
        </View>
        <DatePicker
          ref={picker => {this.picker = picker;}}
          pickerHeight={200}
          showDuration={300}
          pickerData={mockPickerData}//picker`s value List
          selectedValue={[this.state.selectYear, this.state.selectMonth]}//default to be selected value
          onPickerDone={this.handleDateSelected.bind(this)}//when confirm your choice
        />
      </View>
    );
  }

  handleShowDatePicker() {
    this.picker.toggle();
  }

  handleDateSelected(value) {
    this.setState({
      selectYear: value[0],
      selectMonth: value[1]
    });
  }

}

export default Performance;
