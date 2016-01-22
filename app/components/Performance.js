/**
 *  Class: Performance
 *  Author: Niu Xiaoyu
 *  Date: 15/12/23.
 *  Description: 培训
 */
import React from 'react-native';

const { Component, View, Text, StyleSheet, Image, TouchableOpacity, InteractionManager, TextInput } = React;

import {DataGrid, Column} from '../baseComponents/DataGrid';

const styles = StyleSheet.create({
  page: {
    flex: 1
  },
  horizontal: {
    flexDirection: 'row'
  },
  vertical: {
    flexDirection: 'column'
  },
});

const stylesContainer = StyleSheet.create({
  container: {

  },
  header: {
    height: 35,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#efefef'
  },
  headerText: {
    fontSize: 16
  },
  content: {

  },
});

const styleSearch = StyleSheet.create({
  text: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold'
  },
  container: {
    margin: 10,
    width: 50,
    backgroundColor: 'red',
    borderColor: 'red',
    borderRadius: 5,
    alignItems: 'center',
    paddingTop: 30
  },
  dateInput: {
    padding: 5,
    flex: 1,
    margin: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5
  }
});

const mockData = [
  {name: '张三', amount: '10000', amountPerYear: '5000', brokerage: '10', date: '15/12/23'},
  {name: '张三', amount: '10000', amountPerYear: '5000', brokerage: '440', date: '15/12/22'},
  {name: '张三', amount: '10000', amountPerYear: '5000', brokerage: '200', date: '15/12/23'},
  {name: '张三', amount: '10000', amountPerYear: '5000', brokerage: '300', date: '15/12/21'},
  {name: '张三', amount: '10000', amountPerYear: '5000', brokerage: '500', date: '15/12/22'},
  {name: '张三', amount: '10000', amountPerYear: '5000', brokerage: '200', date: '15/12/23'},
  {name: '张三', amount: '10000', amountPerYear: '5000', brokerage: '101', date: '15/12/21'},
  {name: '张三', amount: '10000', amountPerYear: '5000', brokerage: '201', date: '15/12/22'},
  {name: '张三', amount: '10000', amountPerYear: '5000', brokerage: '4344', date: '15/12/23'},
  {name: '张三', amount: '10000', amountPerYear: '5000', brokerage: '123', date: '15/12/23'},
  {name: '张三', amount: '10000', amountPerYear: '5000', brokerage: '542', date: '15/12/23'},
  {name: '张三', amount: '10000', amountPerYear: '5000', brokerage: '400', date: '15/12/23'},
  {name: '张三', amount: '10000', amountPerYear: '5000', brokerage: '321', date: '15/12/23'},
  {name: '张三', amount: '10000', amountPerYear: '5000', brokerage: '421', date: '15/12/23'},
  {name: '张三', amount: '10000', amountPerYear: '5000', brokerage: '87', date: '15/12/23'}
];

const columnConfig = [
  new Column('投资人姓名', 'name'),
  new Column('投资日期', 'date'),
  new Column('投资金额', 'amount'),
  new Column('年化交易额', 'amountPerYear'),
  new Column('税前佣金', 'brokerage')
];

const INCOMES = [
  {
    text: '当天收益',
    icon: require('../../assets/Commission.png'),
    currency: 'income'
  },
  {
    text: '本月佣金',
    icon: require('../../assets/DayIncome.png'),
    currency: 'brokerageMonth'
  }
];

class Performance extends Component {  
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.updateDataSource();
    });
  }

  updateDataSource() {
    this.setState({
      income: '500.00',
      brokerageMonth: '5000.00',
      brokerageTotal: '5000.00',
      data: mockData
    });
  }

  // 渲染
  render() {
    return (
      <View style={styles.page}>
        <View style={[styles.vertical]}>
          <View style={stylesContainer.header}>
            <Text style={stylesContainer.headerText}>我的收益</Text>
          </View>
          <View style={[styles.horizontal, {height: 70}]}>
            {this._renderIncome(INCOMES[0])}
            {this._renderIncome(INCOMES[1])}
          </View>
        </View>
        <View style={[styles.vertical]}>
          <View style={stylesContainer.header}>
            <Text style={stylesContainer.headerText}>投资概况</Text>
          </View>
          <View style={[styles.horizontal, {height: 100, borderBottomWidth: 1, borderColor: '#efefef'}]}>
            <View style={{flex: 1}}>
              <View style={[styles.horizontal, {flex: 1, alignItems: 'center', borderBottomWidth: 1, borderColor: '#efefef'}]}>
                <Image style={{margin: 10}} source={require('../../assets/date.png')} />
                <Text>起始日期 : </Text>
                <TextInput
                  keyboardType={'numeric'}
                  maxLength={6}
                  style={styleSearch.dateInput}
                  onChangeText={(startDate) => this.setState({startDate})}
                  value={this.state.startDate}
                />
              </View>
              <View style={[styles.horizontal, {flex: 1, alignItems: 'center'}]}>
                <Image style={{margin: 10}} source={require('../../assets/date.png')} />
                <Text>结束日期 : </Text>
                <TextInput
                  keyboardType={'numeric'}
                  maxLength={6}
                  style={styleSearch.dateInput}
                  onChangeText={(endDate) => this.setState({endDate})}
                  value={this.state.endDate}
                />
              </View>
            </View>
            <TouchableOpacity style={styleSearch.container}>
              <Text style={styleSearch.text}>查询</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.horizontal, {height: 30, alignItems: 'center', paddingLeft: 10}]}>
          <Text>佣金总计: </Text>
          <Text style={[stylesContainer.headerText, {color: 'red'}]}>{this.state.brokerageTotal}</Text>
        </View>
        <DataGrid style={{flex: 1}} columns={columnConfig} source={this.state.data}/>
      </View>
    );
  }
  
  _renderIncome(income) {
    return (
      <View style={[{flex: 1, borderColor: '#efefef', borderWidth: 1}, styles.horizontal]}>
        <Image style={{margin: 10, marginTop: 15}} source={income.icon} />
        <View style={{marginTop: 20}}>
          <View>
            <Text style={stylesContainer.headerText}>
              {income.text}
            </Text>
          </View>
          <View>
            <Text style={[stylesContainer.headerText, {color: 'red'}]}>
              {this.state[income.currency]}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default Performance;
