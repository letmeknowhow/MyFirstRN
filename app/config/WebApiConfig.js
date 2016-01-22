/* ************************************************************************** */
/*                                                                            */
/* 每位工程师都有保持代码优雅和整洁的义务                                             */
/*                                                                            */
/* ************************************************************************** */
/**
 * Created by saber on 16/1/4.
 */

import global from '../config/global';

export default {
  baseurl: '',
  api: [
    {
      name: 'login',
      method: 'post',
      url: global.loggedBaseURL + '/api/session',
      desc: '用户登录的接口'
    },
    {
      name: 'extended',
      method: 'putuser',
      url: global.loggedBaseURL + '/api/session',
      desc: '延长用户session的接口'
    },
    {
      name: 'banners',
      method: 'get',
      url: global.webApiURL + '/api/banners',
      desc: 'banner查询'
    },
    {
      name: 'newsColumns',
      method: 'get',
      url: global.webApiURL + '/api/newsColumns',
      desc: '栏目查询'
    },
    {
      name: 'newsInfos',
      method: 'get',
      url: global.webApiURL + '/api/newsInfos',
      desc: '查询快讯'
    },
    {
      name: 'newsInfoDetails',
      method: 'getid',
      url: global.webApiURL + '/api/newsInfos/app',
      desc: '查询快讯详情'
    },
    {
      name: 'appWealthUserInfos',
      method: 'get',
      url: global.loggedBaseURL + '/api/settings/appWealthUserInfos',
      desc: '个人信息查询'
    },
    {
      name: 'updateGesturePasswords',
      method: 'putuser',
      url: global.webApiURL + '/api/settings/gesturePasswords',
      desc: '修改手势密码'
    },
    {
      name: 'gesturePasswords',
      method: 'get',
      url: global.webApiURL + '/api/settings/gesturePasswords',
      desc: '查询手势密码'
    },
    {
      name: 'wealthMessages',
      method: 'get',
      url: global.webApiURL + '/api/wealthMessages',
      desc: '查询财富消息列表'
    },
    {
      name: 'weMessageLogs',
      method: 'put',
      url: global.webApiURL + '/api/weMessageLogs',
      desc: '记录消息状态'
    },
    {
      name: 'setWealthMessages',
      method: 'putuser',
      url: global.loggedBaseURL + '/api/settings/wealthMessages',
      desc: '接收消息设置'
    },
    {
      name: 'getSetWealthMessages',
      method: 'get',
      url: global.loggedBaseURL + '/api/settings/wealthMessages',
      desc: '查询接受消息设置'
    },
    {
      name: 'messageBoards',
      method: 'get',
      url: global.webApiURL + '/api/messageBoards',
      desc: '信息列表'
    },
    {
      name: 'updateMessageBoards',
      method: 'post',
      url: global.webApiURL + '/api/messageBoards',
      desc: '提问/回复'
    },
    {
      name: 'focusCustomers',
      method: 'get',
      url: global.webApiURL + '/api/focusCustomers',
      desc: '查询客户列表'
    },
    {
      name: 'settingPassword',
      method: 'putuser',
      url: global.loggedBaseURL + '/api/settings/passwords',
      desc: '修改密码'
    }
  ]
}
