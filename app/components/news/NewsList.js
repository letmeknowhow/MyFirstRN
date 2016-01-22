/**
 *  Class: NewsList
 *  Author: Niu Xiaoyu
 *  Date: 16/1/7.
 *  Description:
 */
import React from 'react-native';
import WebAPI from '../../libs/WebAPI';

const { Component, ListView, StyleSheet, InteractionManager, View, Text } = React;
import NewsSummary from './NewsSummary';
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

class NewsList extends Component {
  // 默认属性
  static defaultProps = {};

  // 属性类型
  static propTypes = {};

  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.newsType = {};
    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.pkISid !== r2.pkISid
    });
    this.state = {
      isLoading: false,
      isLoadingTail: false,
      dataSource: dataSource
    };
  }

  componentDidMount() {
    this.newsType = this.props.newsColumn;
    InteractionManager.runAfterInteractions(() => {
      this.searchNews();
    });
  }

  searchNews() {
    let query = this.newsType; 
    if(query == ' ') {
      return;
    }
    
    let cachedResultsForQuery = resultsCache.dataForQuery[query];
    if (cachedResultsForQuery) {
      if (!loading[query]) {
        this.setState({
          dataSource: this.getDataSource(cachedResultsForQuery),
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
    WebAPI.newsInfos(this._urlForQueryPage(0))
      .then(data => {
        loading[query] = false;
        resultsCache.totalForQuery[query] = data.json.totalCount;
        resultsCache.dataForQuery[query] = data.json.list;
        resultsCache.nextPageNumberForQuery[query] = 1;
        this.setState({
          isLoading: false,
          dataSource: this.getDataSource(data.json.list)
        });
      });
  }

  onEndReachNews() {
    let query = this.newsType;
    if(query == ' ') {
      return;
    }
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
    
    WebAPI.newsInfos(this._urlForQueryPage(page))
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
          dataSource: this.getDataSource(resultsCache.dataForQuery[query])
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
    if(this.state.dataSource.getRowCount() === 0){
      return (
        <NoData
          isLoading={this.state.isLoading}
        />
      )
    } else {
      return (
        <ListView
          onEndReached={this.onEndReachNews.bind(this)}
          pageSize={5}
          dataSource={ this.state.dataSource }
          renderRow={ this.renderRow.bind(this) }
          automaticallyAdjustContentInsets={false}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps={true}
          showsVerticalScrollIndicator={false}
        />
      );
    }
  }

  renderRow(rowData, sectionID, rowID, highlightRow) {
    return (
      <NewsSummary data={rowData} {...this.props}/>
    );
  }

  getDataSource(news) {
    return this.state.dataSource.cloneWithRows(news);
  }

  _urlForQueryPage(pageNumber) {
    return {
      version: 1,
      pageNumber: pageNumber,
      pageSize: 20,
      bOpened: true,
      columnName: this.newsType
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
      text = '没有快讯';
    }
    return (
      <View style={[styles.container, styles.centerText]}>
        <Text style={styles.noDataText}>{text}</Text>
      </View>
    );
  }
}


export default NewsList;
