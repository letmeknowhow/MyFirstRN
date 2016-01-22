/**
 *  Class: LeaderBoard
 *  Author: Niu Xiaoyu
 *  Date: 15/12/24.
 *  Description: 排行榜
 */
import React from 'react-native';
const { Component, View, Text, StyleSheet, InteractionManager, ListView, PropTypes, TouchableOpacity } = React;

import TabViewIOS from '../baseComponents/pagers/TabViewIOS';
import Marquee from '../baseComponents/Marquee';

const CONTENT_TYPE = [
  '日排行',
  '月排行',
  '总排行'
];
const BIG_ORDER_ROW_HEIGHT = 20;

const myStyles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#cccccc',
  },
  leaderBoardTitleText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 7
  },
  leaderBoardView: {
    //height: deviceHeight / 3 * 2
  },
  sortRowMe: {
    borderColor: '#CCC',
    backgroundColor: '#CCC',
  },
  sortRow: {
    borderColor: 'rgba(238,238,238,1)',
    backgroundColor: 'rgba(238,238,238,1)',
    borderRadius: 5,
    height: 40,
    flexDirection: 'row',
    margin: 3,
    marginLeft: 10,
    marginRight: 10
  },
  indexLabel: {
    width: 40,
    height: 40,
    borderRadius: 20,
    //marginLeft: -20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  first: {
    borderColor: '#DE3641',
    backgroundColor: '#DE3641',
  },
  second: {
    borderColor: '#38A8E8',
    backgroundColor: '#38A8E8',
  },
  third: {
    borderColor: '#EB9D2F',
    backgroundColor: '#EB9D2F',
  },
  indexText: {
    color: 'white'
  },
  others: {
    borderColor: '#A6A6A6',
    backgroundColor: '#A6A6A6',
  },
  itemTextView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayView: {
    flex: 1,
    marginLeft: 15,
    height: 100
  },
  scrollContainer: {
    height: 100,
    //borderWidth: 1,
    //borderColor: 'black',
    overflow: 'hidden',
    //marginTop: 50,
  },
  dayViewHeader: {
    paddingLeft: 10,
    flexDirection: 'row',
    height: 20,
    marginVertical: 10
  },
  dayVHL: {
    width: 3,
    backgroundColor: 'red',
    //marginRight: 10,
  },
  dayVHTitle: {
    fontSize: 16,
    marginLeft: 2,
    marginBottom: 2
  }
});


const mockData1 = [
  {
    orderNo: 1,
    city: '济南',
    name: '张**',
    validNumber: 6,
    newNumber: 100,
    numberPerYear: 3
  },
  {
    orderNo: 2,
    city: '沈阳',
    name: '王**',
    validNumber: 6,
    newNumber: 100,
    numberPerYear: 3
  },
  {
    orderNo: 3,
    city: '广州',
    name: '李**',
    validNumber: 6,
    newNumber: 100,
    numberPerYear: 3
  },
  {
    orderNo: 4,
    city: '蚌埠',
    name: '赵**',
    validNumber: 6,
    newNumber: 100,
    numberPerYear: 3
  },
  {
    orderNo: 5,
    city: '合肥',
    name: '张**',
    validNumber: 6,
    newNumber: 100,
    numberPerYear: 3
  },
  {
    orderNo: 22,
    city: '',
    name: '我',
    validNumber: 6,
    newNumber: 100,
    numberPerYear: 3
  }
];

const mockData2 = [
  '管理人: 西安  徐**  金额: 25000.00RMB',
  '管理人: 太原  徐**  金额: 25000.00RMB',
  '管理人: 广州  徐**  金额: 25000.00RMB',
  '管理人: 合肥  徐**  金额: 25000.00RMB',
  '管理人: 沈阳  徐**  金额: 25000.00RMB',
  '管理人: 北京  徐**  金额: 25000.00RMB',
  '管理人: 天津  徐**  金额: 25000.00RMB',
  '管理人: 上海  徐**  金额: 25000.00RMB',
  '管理人: 哈尔滨  徐**  金额: 25000.00RMB',
  '管理人: 石家庄  徐**  金额: 25000.00RMB',
  '管理人: 贵阳  徐**  金额: 25000.00RMB',
  '管理人: 成都  徐**  金额: 25000.00RMB',
  '管理人: 北京  徐**  金额: 25000.00RMB'
];

class LeaderBoard extends Component {
  // 默认属性
  static defaultProps = {};

  // 属性类型
  static propTypes = {
    style: PropTypes.any
  };

  // 构造
  constructor(props) {
    super(props);

    const contentTypeSource = new TabViewIOS.DataSource({
      pageHasChanged: (p1, p2) => p1 !== p2
    });
    this.state = {
      contentTypeSource: contentTypeSource.cloneWithPages(CONTENT_TYPE),
      dataSource0: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }),
      dataSource1: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }),
      dataSource2: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }),
      bigOrder: []
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.updateDataSource();
      this.marquee.slideUp();
    });
  }

  updateDataSource() {
    this.setState({
      dataSource0: this.state.dataSource0.cloneWithRows(mockData1),
      dataSource1: this.state.dataSource1.cloneWithRows(mockData1),
      dataSource2: this.state.dataSource2.cloneWithRows(mockData1),
      bigOrder: mockData2
    });
  }

  // 渲染
  render() {
    return (
      <View style={[{backgroundColor: 'white'}, this.props.style]}>
        <View style={myStyles.leaderBoardView}>
          <TabViewIOS
            dataSource={this.state.contentTypeSource}
            renderPage={this._renderPage.bind(this)}
            tabs={CONTENT_TYPE}
            tabBarUnderlineColor={'red'}
            tabBarBackgroundColor={'white'}
            tabBarActiveTextColor={'black'}
            tabBarInactiveTextColor={'#666'}
            tabHeight={30}
          />
        </View>
        <View style={[myStyles.dayViewHeader, {marginTop: 10}]}>
          <View style={myStyles.dayVHL}/>
          <Text style={myStyles.dayVHTitle}>当日大单</Text>
        </View>
        <View style={myStyles.dayView}>
          <View style={myStyles.scrollContainer}>
            <Marquee ref={marquee => this.marquee = marquee} data={mockData2} containerHeight={100} rowHeight={BIG_ORDER_ROW_HEIGHT} />
          </View>
        </View>
      </View>
    );
  }

  _renderPage(data, index) {
    if (index === '0') {
      return (<ListView pageSize={6} dataSource={ this.state.dataSource0 } renderRow={ this.renderRow.bind(this) }/>);
    } else if (index === '1') {
      return (<ListView pageSize={6} dataSource={ this.state.dataSource1 } renderRow={ this.renderRow.bind(this) }/>);
    } else if (index === '2') {
      return (<ListView pageSize={6} dataSource={ this.state.dataSource2 } renderRow={ this.renderRow.bind(this) }/>);
    }
  }

  renderRow(rowData, sectionID, rowID, highlightRow) {
    const sortNo = parseInt(rowData.orderNo, 10);
    if (sortNo === 1) {
      return this._renderFirst(rowData, rowID);
    } else if (sortNo <= 5) {
      return this._renderOthers(rowData, rowID);
    } else if (sortNo > 5 && rowData.name === '我') {
      return this._renderMe(rowData, rowID);
    }
  }

  _renderFirst(data, rowID) {
    const labelStyle = this._getSortLabelStyle(data);
    return (
      <View style={myStyles.sortRow} key={rowID}>
        <View style={[myStyles.indexLabel, labelStyle]} key={0}>
          <Text style={[myStyles.indexText]}>
            {data.orderNo}
          </Text>
        </View>
        <View style={[myStyles.itemTextView, {flexDirection: 'column'}]} key={1}>
          <Text style={myStyles.leaderBoardTitleText}>姓名</Text>
          <Text>{`${data.city} ${data.name}`}</Text>
        </View>
        <View style={[myStyles.itemTextView, {flexDirection: 'column'}]} key={2}>
          <TouchableOpacity onPress={this.onHandlePress.bind(this, '有效投资人数')}>
            <Text style={myStyles.leaderBoardTitleText}>有效投资人数</Text>
          </TouchableOpacity>
          <Text>{data.validNumber}</Text>
        </View>
        <View style={[myStyles.itemTextView, {flexDirection: 'column'}]} key={3}>
          <TouchableOpacity onPress={this.onHandlePress.bind(this, '新增投资人数')}>
            <Text style={myStyles.leaderBoardTitleText}>新增投资人数</Text>
          </TouchableOpacity>
          <Text>{data.newNumber}</Text>
        </View>
        <View style={[myStyles.itemTextView, {flexDirection: 'column'}]} key={4}>
          <TouchableOpacity onPress={this.onHandlePress.bind(this, '总年化额')}>
            <Text style={myStyles.leaderBoardTitleText}>总年化额</Text>
          </TouchableOpacity>
          <Text>{data.numberPerYear}</Text>
        </View>
      </View>
    );
  }

  _renderOthers(data, rowID) {
    const labelStyle = this._getSortLabelStyle(data);
    return (
      <View style={myStyles.sortRow} key={rowID}>
        <View style={[myStyles.indexLabel, labelStyle]} key={0}>
          <Text style={[myStyles.indexText]}>{data.orderNo}</Text>
        </View>
        <View style={myStyles.itemTextView} key={1}>
          <Text>{`${data.city} ${data.name}`}</Text>
        </View>
        <View style={myStyles.itemTextView} key={2}>
          <Text>{data.validNumber}</Text>
        </View>
        <View style={myStyles.itemTextView} key={3}>
          <Text>{data.newNumber}</Text>
        </View>
        <View style={myStyles.itemTextView} key={4}>
          <Text>{data.numberPerYear}</Text>
        </View>
      </View>
    );
  }

  _renderMe(data, rowID) {
    const labelStyle = this._getSortLabelStyle(data);
    return (
      <View style={[myStyles.sortRow, myStyles.sortRowMe]} key={rowID}>
        <View style={[myStyles.indexLabel, labelStyle]} key={0}>
          <Text style={[myStyles.indexText]}>{data.orderNo}</Text>
        </View>
        <View style={myStyles.itemTextView} key={1}>
          <Text>{`${data.city} ${data.name}`}</Text>
        </View>
        <View style={myStyles.itemTextView} key={2}>
          <Text>{data.validNumber}</Text>
        </View>
        <View style={myStyles.itemTextView} key={3}>
          <Text>{data.newNumber}</Text>
        </View>
        <View style={myStyles.itemTextView} key={4}>
          <Text>{data.numberPerYear}</Text>
        </View>
      </View>
    );
  }

  _getSortLabelStyle(data) {
    let labelStyle;
    if (data.orderNo === 1 || data.name === '我') {
      labelStyle = myStyles.first;
    } else if (data.orderNo === 2) {
      labelStyle = myStyles.second;
    } else if (data.orderNo === 3) {
      labelStyle = myStyles.third;
    } else {
      labelStyle = myStyles.others;
    }
    return labelStyle;
  }

  onHandlePress(title) {
    //this.setState({
    //  
    //});
  }
}

export default LeaderBoard;
