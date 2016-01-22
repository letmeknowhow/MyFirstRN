/**
 * class: DataGrid
 * author: Niu Xiaoyu
 * date: 2015-12-17
 * description: 数据表格组件
 */
import React from 'react-native';
import Dimensions from 'Dimensions';

const { Component, PropTypes, StyleSheet, View, InteractionManager, Text, PixelRatio, ListView } = React;

const deviceWidth = Dimensions.get('window').width;

class DataGrid extends Component {
  // 默认属性
  static defaultProps = {
    rowHeight: 30,
    batchCount: 10,
    onEndReached: function () {
      
    }
  };

  // 属性类型
  static propTypes = {
    //columns: PropTypes.arrayOf(PropTypes.instanceOf(Column)).isRequired,
    //source: PropTypes.arrayOf(PropTypes.any).isRequired,
    //rowHeight: PropTypes.number,
    //style: PropTypes.any,
    //batchCount: PropTypes.number
  };

  // 构造
  constructor(props) {
    super(props);
    this.props = {...props};
    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.pkISid !== r2.pkISid
    });
    this.state = {
      dataSource: dataSource
    };
  }

  componentDidMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.translateData(this.props.source))
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.source) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.translateData(nextProps.source))
      });
    } 
  }

  translateData(source) {
    let [title, dataIndex, renderFn, rowNum, rowIndex] = [[], [], [], source.length, 1];
    let data = new Array(rowNum);

    //将title压入第0行
    this.props.columns.map(item => {
      title.push(item.text);
      dataIndex.push(item.dataIndex);
      renderFn.push(item.renderFn);
    });
    data[0] = title;

    //依次压入数据至1,2,3,4......行
    source.map(item => {
      let row = [];
      for (let i = 0; i < dataIndex.length; i++) {
        let tmpData = item[dataIndex[i]];
        if(renderFn[i]){
          tmpData = renderFn[i](tmpData);
        }
        row.push(
          tmpData
        );
      }
      data[rowIndex] = row;
      rowIndex++;
    });
    return data;
  }

  // 渲染
  render() {
    return (
      <ListView 
        scrollRenderAheadDistance={1} 
        initialListSize={1} 
        pageSize={this.props.batchCount} 
        dataSource={ this.state.dataSource } 
        renderRow={ this.renderRow.bind(this) }
        onEndReached={this.props.onEndReached}
        automaticallyAdjustContentInsets={false}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps={true}
        showsVerticalScrollIndicator={false}
      />
    );
  }

  renderRow(rowData, sectionID, rowID, highlightRow) {
    return (
      <Row key={rowID} 
        data={rowData} 
        rowIndex={parseInt(rowID, 10)} 
        cellWidth={deviceWidth / this.props.columns.length}
        cellHeight={this.props.rowHeight}
      />
    );
  }
}

class Column {
  constructor(text, dataIndex, renderFn) {
    this.text = text;
    this.dataIndex = dataIndex;
    this.renderFn = renderFn;
  }
}

/**
 * row
 */
const rowStyles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  },
  oddRow: {
    backgroundColor: '#FFF'
  },
  evenRow: {
    backgroundColor: '#DDD'
  },
  cell: {
    borderWidth: 1 / PixelRatio.get(),
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

class Row extends Component {
  static defaultProps = {};

  static propTypes = {
    data: PropTypes.array.isRequired,
    rowIndex: PropTypes.number,
    cellWidth: PropTypes.number,
    cellHeight: PropTypes.number
  };

  constructor(props) {
    super(props);
    // 初始状态
    this.state = {};
  }

  // 渲染
  render() {
    const rowData = this.props.data;
    let cells = rowData.map((item, index) => {
      return (
        <View style={[rowStyles.cell, {width: this.props.cellWidth, height: this.props.cellHeight}]} key={index}>
          <Text style={{marginTop: 5}}>{item}</Text>
        </View>
      );
    });
    return (
      <View style={[rowStyles.row, (this.props.rowIndex % 2 === 0) ? rowStyles.oddRow : rowStyles.evenRow]} >
        {cells}
      </View>
    );
  }
}
export { DataGrid, Column};
