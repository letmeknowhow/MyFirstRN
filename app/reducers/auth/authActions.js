/* ************************************************************************** */
/*                                                                            */
/* 每位工程师都有保持代码优雅和整洁的义务                                             */
/*                                                                            */
/* ************************************************************************** */
/**
 * Created by saber on 16/1/4.
 */
//'use strict';
import webApi from '../../libs/WebAPI';
import appAuthToken from '../../libs/AppAuthToken';
import { actions as routerActions } from 'react-native-router-redux';
import global from '../../config/global';
const {
  LOGIN_REQUEST,
  LOGIN_SUCESS,
  LOGIN_FAILURE,
  LOGGED_IN_STATE,
  LOGGED_OUT_STATE
  } = require('../../libs/constants').default;

// loginState
export function loggedInState() {
  return {
    type: LOGGED_IN_STATE
  };
}
// loginoutState
export function loggedOutState() {
  return {
    type: LOGGED_OUT_STATE
  };
}
// 用户登录中
export function loginRequest() {
  return {
    type: LOGIN_REQUEST
  };
}
// 用户登录成功
export function loginSuccess() {
  return {
    type: LOGIN_SUCESS
  };
}
// 用户登录失败
export function loginFailure(err) {
  return {
    type: LOGIN_FAILURE,
    payload: err
  };
}

// 删除 sessiontoken
export function deleteSessionToken() {
  return dispatch => {
    return appAuthToken.deleteSessionToken().then(() => {
      dispatch(loggedOutState());
    });
  }
}

// 保存sessiontoken
export function saveSessionToKen(data) {
  return appAuthToken.storeSessionToken(data.json.accessToken, data.json.checkToken)
    .then(() => {
      return data;
    });
}
export function extendedSessionToken(){
  webApi.extended().then(data => {
    if(data.code === 0){
      appAuthToken.updateSessionTokenTime(Date.now());
    }
  });
}
// 获取sessiontoken
export function getSessionToken() {
  return dispatch => {
    return appAuthToken.getSessionToken().then((token) => {
      if (token) {
        if(token.tokenTime && 
          Date.now() - token.tokenTime < (1000 * 60 * 60 * 24 * global.tokenTime)) {
          extendedSessionToken();
          dispatch(loggedInState());
        }
        
        //dispatch(routerActions.init({ name: 'home', tabBarName: 'tabBar' }
        //routerActions.routes.tabBar.home();
      } else {
        //deleteSessionToken();
        dispatch(loggedOutState());
      }
    });
  };
}

export function login(username, password) {
  return dispatch => {
    return webApi.login({
      username: username,
      password: password
    }).then((data) => {
      // 请求用户成功
      if (data.response.status === 200 || data.response.status === 201) {
        // 存储sessiontoken
        saveSessionToKen(data);
        dispatch(loggedInState());
      }
      return data;
    }, (err) => {
      return err;
    });
  };
}
