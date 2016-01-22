/* ************************************************************************** */
/*                                                                            */
/* 每位工程师都有保持代码优雅和整洁的义务                                             */
/*                                                                            */
/* ************************************************************************** */
/**
 * Created by saber on 16/1/5.
 */
//'use strict';
import webApi from '../../libs/WebAPI';
const {
  WEALTHMESSAGE_REQUEST,
  WEALTHMESSAGE_SUCCESS,
  WEALTHMESSAGE_FAILURE,
  WEALTHMESSAGE_OPEN_SUCCESS,
  WEALTHMESSAGE_UPDATE_OPEN_SUCCESS,
  WEALTHMESSAGE_READ_SUCCESS

  } = require('../../libs/constants').default;
export function wealthMessageRequest() {
  return {
    type: WEALTHMESSAGE_REQUEST
  };
}
export function wealthMessageSuccess(data) {
  return {
    type: WEALTHMESSAGE_SUCCESS,
    payload: data
  };
}
export function wealthMessageFailure() {
  return {
    type: WEALTHMESSAGE_FAILURE
  };
}
// 异步请求财富列表数据
export function wealthMessages(opts) {
  return dispatch => {
    webApi.wealthMessages(opts).then(data => {
      // 请求成功后且请求是200或者201
      if (data.response.status === 200 || data.response.status === 201) {
        dispatch(wealthMessageSuccess(data.json));
      }
      return data;
    });
  };
}
// 获取接受信息的开关
export function wealthMessageOpenSuccess(data) {
  return {
    type: WEALTHMESSAGE_OPEN_SUCCESS,
    payload: data
  };
}
export function getSetWealthMessages() {
  return dispatch => {
    webApi.getSetWealthMessages().then(data => {
      // 请求成功后且请求是200或者201
      if (data.response.status === 200 || data.response.status === 201) {
        dispatch(wealthMessageOpenSuccess(data.json));
      }
      return data;
    });
  };
}
// 设置接受消息的开关
export function wealthMessageUpdateOpenSuccess() {
  return {
    type: WEALTHMESSAGE_UPDATE_OPEN_SUCCESS
  };
}
export function setWealthMessages(opts) {
  return dispatch => {
    webApi.setWealthMessages(opts).then(data => {
      // 请求成功后且请求是200或者201
      if (data.response.status === 200 || data.response.status === 201) {
        //dispatch(wealthMessageOpenSuccess(data.json))
      }
      return data;
    });
  };
}
// 将消息改为阅读后
export function weMessageLogsSuccess(payload) {
  return {
    type: WEALTHMESSAGE_READ_SUCCESS,
    payload: payload
  };
}
export function weMessageLogs(id, data) {
  return dispatch => {
    webApi.weMessageLogs(id, data).then(json => {
      if (json.response.status === 200 || json.response.status === 201) {
        //dispatch(weMessageLogsSuccess(id));
      }
      return json;
    });
  };
}
