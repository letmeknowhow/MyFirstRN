import React from 'react-native';

import Button from '../baseComponents/Button';
import NaviBar from '../baseComponents/NaviBar';
import Banner from '../baseComponents/Banner';
import Grid from '../baseComponents/Grid';

const { Component, View, Text, Image, StyleSheet } = React;

const mockData = [
  {name: '行业快讯', icon: require('../../assets/icons/IndustryNews.png'), route: 'news'},
  {name: '排行榜', icon: require('../../assets/icons/RankingList.png'), route: 'leaderBoard'},
  {name: '我的业绩', icon: require('../../assets/icons/MyPerformance.png'), route: 'performance'},
  {name: '财富消息', icon: require('../../assets/icons/WealthNews.png'), route: 'message', badge: true},
  {name: '信息反馈', icon: require('../../assets/icons/Feedback.png'), route: 'feedback'},
  {name: '个人信息', icon: require('../../assets/icons/Profile.png'), route: 'profile'},
];

const styles = StyleSheet.create(
  {
    badge: {
      borderRadius: 5,
      borderWidth: 0,
      width: 10,
      height: 10,
      backgroundColor: '#dd2b37',
      position: 'absolute',
      top: 0,
      right: 0
    },
    button: {flex: 1, marginBottom: 0, borderWidth: 0}
  }
);

class Home extends Component {
  // 默认属性
  static defaultProps = {};

  // 属性类型
  static propTypes = {};

  // 构造
  constructor(props) {
    super(props);
  }

  gridData() {
    const { actions } = this.props;
    return mockData.map(item => {
      return (
        <Button style={styles.button} onPress={actions.routes[item.route]()}>
          <Image source={item.icon}>
            { item.badge && (<View style={styles.badge}/>) }
          </Image>
          <Text style={{marginTop: 10}}>
            {item.name}
          </Text>
        </Button>
      );
    });
  }

  // 渲染
  render() {
    return (
      <View style={{flex: 1}}>
        <Banner 
          style={{height: 140, overflow: 'hidden'}}
          {...this.props}
        />
        <Grid column={2} gridLine={true} gridData={this.gridData()} scroll={false}/>
      </View>
    );
  }

}

export default Home;
