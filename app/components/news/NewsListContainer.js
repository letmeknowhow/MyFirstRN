/**
 *  Class: NewsListContainer
 *  Author: Niu Xiaoyu
 *  Date: 15/12/24.
 *  Description: 新闻列表
 */
import React from 'react-native';
import TabViewIOS from '../../baseComponents/pagers/TabViewIOS';
const { Component, StyleSheet, InteractionManager, ListView, View, PropTypes} = React;
import WebAPI from '../../libs/WebAPI';
import NewsList from './NewsList';
import NewsListHeader from './NewsListHeader';

let contentName = [
  ' ',
  ' ',
  ' ',
  ' '
];

class NewsListContainer extends Component {
  // 默认属性
  static defaultProps = {};

  // 属性类型
  static propTypes = {
    style: PropTypes.any
  };

  // 构造
  constructor(props) {
    super(props);
    this.newsList = [];
    const contentNameSource = new TabViewIOS.DataSource({
      pageHasChanged: (p1, p2) => p1 !== p2
    });
    this.state = {
      contentNameSource: contentNameSource.cloneWithPages(contentName)
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      WebAPI.newsColumns({
        version: 1,
        pageNumber: 0,
        pageSize: 20,
        opened: true
      })
      .then(data => {
        let res = data.json && data.json.list;
        if(!res) {
          return;
        }
        contentName = [];
        for (let i = 0; i < res.length; i++) {
          contentName.push(res[i].sName); 
        }
        this.setState({
          contentNameSource: this.state.contentNameSource.cloneWithPages(contentName)
        });
      });
    });
  }

  render() {
    return (
      <View style={[this.props.style]}>
        <TabViewIOS style={{flex: 1}}
          dataSource={this.state.contentNameSource}
          renderPage={this._renderPage.bind(this)}
          onChangePage={this.onChangePage.bind(this)}
          tabs={contentName}
          tabBarUnderlineColor={'red'}
          tabBarBackgroundColor={'white'}
          tabBarActiveTextColor={'black'}
          tabBarInactiveTextColor={'#666'}
          tabHeight={35}
          renderTabBar={this.renderTabBar.bind(this)}
        />
      </View>
    );
  }

  _renderPage(data, index) {
    return (<NewsList  ref={index => this.newsList.push(index)} {...this.props} newsColumn={contentName[index]} />);
  }

  onChangePage(index) {
    this.newsHeader.scrollTabTo(index);
  }

  renderTabBar() {
    return (<NewsListHeader ref={(ref => this.newsHeader = ref)} />);
  }
}

export default NewsListContainer;
