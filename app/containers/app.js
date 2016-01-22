/**
 * Created by gaoletian on 15/11/25.
 */

import React from 'react-native';
import { bindActionCreators, } from 'redux';
import { connect, } from 'react-redux/native';
import { actions as routerActions, NavBar, Route, Router, Schema, TabBar, TabRoute } from 'react-native-router-redux';
//import CodePush from 'react-native-code-push';

const { Component, StyleSheet, Platform, BackAndroid, Alert } = React;

import LoadSpinner from '../components/LoadSpinner';
/** 主tab 四页*/
import Home from '../components/Home';
import Customer from '../components/Customer';
import Training from '../components/Training';
import Spread from '../components/Spread';

/** 首页 二级页面*/
import News from '../components/News';
import LeaderBoard from '../components/LeaderBoard';
import Performance from '../components/Performance';
import Profile from '../components/Profile';
import Message from '../components/Message';
import Feedback from '../components/Feedback';

/** 三级页面*/
import NewsDetail from '../components/news/NewsDetail';
import ChangePassword from '../components/ChangePassword';
import FeedbackMessage from '../components/FeedbackMessage';
/** 登陆页*/
import SignIn from '../components/SignIn';
import SignInGesture from '../components/SignInGesture';

import WebViewTest from '../components/WebViewTest';

import * as authActions from '../reducers/auth/authActions';
import * as wealthMessageActions from '../reducers/wealthMessage/wealthMessageAction';
import _ from 'lodash';


const actions = _.merge(
  routerActions,
  authActions,
  wealthMessageActions
);

const mapStateToProps = state => {
  return {
    router: state.router,
    auth: state.auth,
    wealthMessage: state.wealthMessage
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      ...actions,
    }, dispatch),
    dispatch,
  };
};

const defaultSchema = {
  navBar: NavBar,
  navLeftColor: '#fff', // back button color
  navTint: '#f21b1b',
  navTitleColor: '#FFFFFF',
  navTitleStyle: {
    fontFamily: 'Avenir Next',
    fontSize: 18,
  },
  statusStyle: 'light-content',
  tabBar: TabBar,
};

/** Tab图标 */
const assets = {
  'logo': require('../../assets/logo.png'),
  'home': require('../../assets/icons/Home.png'),
  'customer': require('../../assets/icons/Customer.png'),
  'training': require('../../assets/icons/Training.png'),
  'spread': require('../../assets/icons/Spread.png'),
};

let hideNavBar = Platform.OS !== 'ios';
hideNavBar = false;

/**
 * 响应手机的返回键
 */
let _router;
let _actions;

if (Platform.OS === 'android') {
  BackAndroid.addEventListener('hardwareBackPress', () => {
    if (_actions && _router.routes.length !== 1) {
      _actions.pop(); // 回到上一个路由状态      
    } else {
      Alert.alert('提示', '确定要退出应用吗?',
        [
          {text: '取消'},
          {text: '退出', onPress: () => BackAndroid.exitApp()},
        ]
      );
    }
    return true; // 返回true,不退出程序
  });
  
}const {
  LOGGED_IN_STATE,
  LOGGED_OUT_STATE
  } = require('../libs/constants').default;

class Application extends Component {

  componentWillMount() {
    _actions = this.props.actions;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.auth.state !== this.props.auth.state) {
      if (nextProps.auth.state === LOGGED_IN_STATE) {
        this.props.actions.replace({name: 'home', tabBarName: 'tabBar', data: {}});
      } else if (nextProps.auth.state === LOGGED_OUT_STATE) {
        this.props.actions.replace({name: 'signIn', data: {}});
      } else if (nextProps.auth.state === 'sigin00') {
        // 当用户的状态是登陆之后 显示手势密码

      }
      return false;
    } else {
      return true;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.router.currentRoute !== nextProps.router.currentRoute) {
      _router = nextProps.router;
    }
  }

  render() {
    return (
      <Router {...this.props} assets={assets} initial="loading">
        <Schema name="default" {...defaultSchema} />

        <Route name="loading" component={LoadSpinner} type="reset"
               hideNavBar={true}
               hideFooter={true}/>
        <Route name="signIn" component={SignIn} type="reset"
               hideNavBar={true}
               hideFooter={true}/>
        <Route name="pg" component={SignInGesture} type="reset"
               hideNavBar={true}
               hideFooter={true}/>


        <Route name="webView" component={WebViewTest} type="reset"
               hideNavBar={true} hideFooter={true}/>

        <Route name="leaderBoard" component={LeaderBoard} title="排行榜"
               hideNavBar={hideNavBar} hideFooter={true}/>
        <Route name="news" component={News} title="行业快讯"
               hideNavBar={hideNavBar} hideFooter={true}/>
        <Route name="performance" component={Performance} title="我的业绩"
               hideNavBar={hideNavBar} hideFooter={true}/>
        <Route name="profile" component={Profile} title="个人信息"
               hideNavBar={hideNavBar} hideFooter={true}/>
        <Route name="message" component={Message} title="财富消息"
               hideNavBar={hideNavBar} hideFooter={true}/>
        <Route name="feedback" component={Feedback} title="信息反馈"
               hideNavBar={hideNavBar} hideFooter={true}/>
        <Route name="newsDetail" component={NewsDetail} title="查看详情"
               hideNavBar={hideNavBar} hideFooter={true}/>
        <Route name="changePassword" component={ChangePassword} title="修改密码"
               hideNavBar={hideNavBar} hideFooter={true}/>
        <Route name="feedbackMessage" component={FeedbackMessage} title="反馈详情"
               hideNavBar={hideNavBar} hideFooter={true}/>

        <TabRoute name="tabBar" barTint="#FFFFFF" tint="#32DEAF">
          <Route name="home" component={Home} title="首页"
                 tabItem={{icon: assets.home, title: '首页', }}
                 hideNavBar={hideNavBar}/>
          <Route name="customer" component={Customer} title="客户"
                 hideNavBar={true}
                 tabItem={{icon: assets.customer, title: '客户', }}
          />
          <Route name="training" component={Training} title="培训"
                 tabItem={{icon: assets.training, title: '培训', }}
                 hideNavBar={hideNavBar}/>
          <Route name="spread" component={Spread} title="推广"
                 tabItem={{icon: assets.spread, title: '推广', }}
                 hideNavBar={hideNavBar}/>
        </TabRoute>
      </Router>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Application);
