/**
 *  Class: CustomerBody
 *  Author: Niu Xiaoyu
 *  Date: 15/12/18.
 *  Description: 客户页面主体
 */
import React from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import CustomerHeader from './CustomerHeader';
import TabViewIOS from '../../baseComponents/tabview/TabViewIOS';

import Caring from './Caring';
import AllOfInvestors from './AllOfInvestors';
import Performance from './Performance';

const { Component, View, StyleSheet, PropTypes, Dimensions, Platform} = React;
const width = Dimensions.get('window').width;
const CONTENT_TYPE = [
  '客户关怀',
  '所有投资人',
  '业绩跟踪'
];

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

class CustomerBody extends Component {
  // 默认属性
  static defaultProps = {};

  // 属性类型
  static propTypes = {
    style: PropTypes.any
  };

  // 构造
  constructor(props) {
    super(props);
    const dataSource = new TabViewIOS.DataSource({
      pageHasChanged: (p1, p2) => p1 !== p2,
    });

    // 初始状态
    this.state = {
      activeTab: 0,
      dataSource: dataSource.cloneWithPages(CONTENT_TYPE),
    };
  }

  render() {
    //Android下使用TabView,按钮无法点击,所以根据操作系统不同,使用不同容器
    if (Platform.OS === 'ios') {
      //不使用ScrollableTabView的方案
      return (
        <View style={[this.props.style]}>
          <TabViewIOS style={{flex: 1}}
                     //ref={(tabViewIOS) => { this.tabViewIOS = tabViewIOS; }}
                     dataSource={this.state.dataSource}
                     renderPage={this._renderPage.bind(this)}
                     tabs={CONTENT_TYPE}
                     tabBarUnderlineColor={'white'}
                     tabBarBackgroundColor={'#3F4650'}
                     tabBarActiveTextColor={'white'}
                     tabBarInactiveTextColor={'#DDD'}
                     tabHeight={65} 
                     paddingTop={20}
          />
        </View>
      );
    } else {
      return (
        <ScrollableTabView
          style={[this.props.style]}
          tabBarUnderlineColor="white"
          renderTabBar={() => <CustomerHeader tabs={CONTENT_TYPE} activeTab={1} containerWidth={width} headerBackgroundColor={"#3F4650"} />}>
          <Caring style={styles.page} tabLabel={CONTENT_TYPE[0]}/>
          <AllOfInvestors style={styles.page} tabLabel={CONTENT_TYPE[1]}/>
          <Performance style={styles.page} tabLabel={CONTENT_TYPE[2]}/>
        </ScrollableTabView>
      );
    }
  }

  /**
   * IOS时,渲染pager
   * @param data
   * @param index
   * @returns {XML}
     * @private
     */
  _renderPage(data, index) {
    if (index === '0') {
      return (<Caring style={styles.page} />);
    } else if (index === '1') {
      return (<AllOfInvestors style={styles.page} />);
    } else if (index === '2') {
      return (<Performance style={styles.page} />);
    }
  }
}

export default CustomerBody;
