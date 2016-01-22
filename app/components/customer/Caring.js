/**
 *  Class: Caring
 *  Author: Niu Xiaoyu
 *  Date: 15/12/18.
 *  Description: 客户关怀
 */

import React from 'react-native';
import WebAPI from '../../libs/WebAPI';
import {DataGrid, Column} from '../../baseComponents/DataGrid';

const { Component, ListView, StyleSheet, InteractionManager, View, Text } = React;
const columnConfig = [
  new Column('姓名', 'sName'),
  new Column('电话', 'sPhone'),
  new Column('是否投资', 'bInvested', data => {return data ? '是': '否'}),
  new Column('生日日期', 'dBirthday')
];
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  centerText: {
    alignItems: 'center',
  },
  noDataText: {
    marginTop: 80,
    color: '#888888',
  }
});
let resultsCache = {
  dataForQuery: {},
  nextPageNumberForQuery: {},
  totalForQuery: {},
};
let loading = {};

class Caring extends Component {
  // 默认属性
  static defaultProps = {};

  // 属性类型
  static propTypes = {};

  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.newsType = 'caring';
    this.state = {
      isLoading: false,
      isLoadingTail: false,
      data: []
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.search();
    });
  }

  search() {
    let query = this.newsType;

    let cachedResultsForQuery = resultsCache.dataForQuery[query];
    if (cachedResultsForQuery) {
      if (!loading[query]) {
        this.setState({
          data: cachedResultsForQuery,
          isLoading: false
        });
      } else {
        this.setState({isLoading: true});
      }
      return;
    }
    loading[query] = true;
    resultsCache.dataForQuery[query] = null;
    this.setState({
      isLoading: true,
      isLoadingTail: false
    });
    WebAPI.focusCustomers(this._urlForQueryPage(0))
      .then(data => {
        loading[query] = false;
        resultsCache.totalForQuery[query] = data.json.totalCount;
        resultsCache.dataForQuery[query] = data.json.list;
        resultsCache.nextPageNumberForQuery[query] = 1;
        this.setState({
          isLoading: false,
          data: data.json.list
        });
      });
  }

  onEndReach() {
    let query = this.newsType;
    if(!this.hasMore() || this.state.isLoadingTail){
      return;
    }
    if(loading[query]) {
      return;
    }
    loading[query] = true;
    this.setState({
      isLoadingTail: true
    });
    let page = resultsCache.nextPageNumberForQuery[query];

    WebAPI.focusCustomers(this._urlForQueryPage(page))
      .then(data => {
        let newsForQuery = resultsCache.dataForQuery[query].slice();
        loading[query] = false;
        if(!data.json.list) {
          resultsCache.totalForQuery[query] = newsForQuery.length;
        } else {
          for(let i in data.json.list) {
            newsForQuery.push(data.json.list[i]);
          }
          resultsCache.dataForQuery[query] = newsForQuery;
          resultsCache.nextPageNumberForQuery[query] += 1;
        }
        this.setState({
          isLoadingTail: false,
          data: resultsCache.dataForQuery[query]
        });
      });
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.newsColumn !== nextProps.newsColumn) {
      this.newsType = nextProps.newsColumn;
      this.searchNews();
    }
  }

  // 渲染
  render() {
    if(this.state.data.length === 0){
      return (
        <NoData
          isLoading={this.state.isLoading}
        />
      )
    } else {
      return (
        <DataGrid 
          columns={columnConfig} 
          source={this.state.data}
          onEndReached={this.onEndReach.bind(this)}
        />
      );
    }
  }

  _urlForQueryPage(pageNumber) {
    return {
      version: 1,
      pageNumber: pageNumber,
      pageSize: 20
    };
  }

  hasMore() {
    if (!resultsCache.dataForQuery) {
      return true;
    }
    return resultsCache.totalForQuery !== resultsCache.dataForQuery.length;
  }
}

class NoData extends Component {
  render() {
    let text = '';
    if (!this.props.isLoading) {
      text = '无信息';
    }
    return (
      <View style={[styles.container, styles.centerText]}>
        <Text style={styles.noDataText}>{text}</Text>
      </View>
    );
  }
}

export default Caring;
