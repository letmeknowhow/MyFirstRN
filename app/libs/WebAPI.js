/* ************************************************************************** */
/*                                                                            */
/* 每位工程师都有保持代码优雅和整洁的义务                                             */
/*                                                                            */
/* ************************************************************************** */
/**
 * Created by saber on 16/1/4.
 */

//'use strict';
require('regenerator/runtime');
import _ from 'lodash';
import config from '../config/WebApiConfig';
import appAuthToken from './AppAuthToken';

import {Alert} from 'react-native';

class WebAPI {
  // 构造
  constructor() {
    this.actions = null;
  }

  /** 网络异常处理*/
  catchHandle(ex) {
    Alert.alert('提示', '网络异常',
      [
        {text: '确定', onPress: () => { webApi.actions.routes.signIn()(); } }
      ]
    );
    throw ex;
  };

  // 从获取本地token
  async _getSessionToken() {
    try {
      let self = this;
      return appAuthToken.getSessionToken().then((token) => {
        self._sessionToken =
          _.isUndefined(token) ? null : token;
      });
    } catch (e) {
      throw e;
    }
  }

  // fetch 的核心方法
  async _fetch(opts) {
    opts = _.extend({
      method: 'GET',
      url: null,
      body: null,
      callback: null
    }, opts);
    let reqOpts = {
      method: opts.method,
      headers: {
        'Content-Type': 'application/json',
        'system_id': 1,
        'clientInfo': 'app'
      }
    };
    await this._getSessionToken();
    if (this._sessionToken) {
      reqOpts.headers.access_token = this._sessionToken.access_token;
      reqOpts.headers.nhic = this._sessionToken.nhic;
    }
    if (opts.method === 'POST' || opts.method === 'PUT') {
      reqOpts.headers.Accept = 'application/json';
      reqOpts.headers['Content-Type'] = 'application/json';
      reqOpts.body = opts.body ? JSON.stringify(opts.body) : '{}';
    }
    return await fetch(opts.url, reqOpts);
  }
}

/** 响应统一处理*/
let responseResolve = (response) => {
  let json = {};
  let backJson = {
    json: {},
    response
  };
  if (response.status === 200 || response.status === 201) {
    try{
      json = JSON.parse(response._bodyInit);
      backJson.json = json;
    } catch (ex) {
      console.error('尝试解析json时失败:  WebApi.js');
    }
    
  }
  if (response.status === 403 || response.status === 401) {
    try {
      // 清除本地token
      webApi.actions.deleteSessionToken();
    }
    catch (ex) {
      console.error('清除本地token失败:  WebApi.js');
    }
  }
  if (response.status === 500) {
  }
  return backJson;
};


let postRequest = (opts) => {
  return async function (data) {
    try {
      return await this._fetch({
        method: 'POST',
        url: opts.url,
        body: data,
      }).then(responseResolve);
    } catch (e) { this.catchHandle(e); }
  };
};
let getRequest = (opts) => {
  return async function (data) {
    let formBody = [];
    for (let property in data) {
      let encodeKey = encodeURIComponent(property);
      let encdeeValue = encodeURIComponent(data[property]);
      formBody.push(encodeKey + '=' + encdeeValue);
    }
    formBody = formBody.join('&');
    try {
      return await this._fetch({
        method: 'GET',
        url: opts.url + '?' + formBody
      }).then(responseResolve);
    } catch (e) {

      this.catchHandle();
      throw e;
    }
  };
};
let putRequest = (opts) => {
  return async function (id, data) {
    try {
      return await this._fetch({
        method: 'PUT',
        url: opts.url + '/' + id,
        body: data
      }).then(responseResolve);
    } catch (e) {

      this.catchHandle();
      throw e;
    }
  };
};
let deleteRequest = (opts) => {
  return async function (id) {
    try {
      return await this._fetch({
        method: 'DELETE',
        url: opts.url + '/' + id
      }).then(responseResolve);
    } catch (e) {

      this.catchHandle();
      throw e;
    }
  };
};
// 下面的几种方法 应该 考虑 用正则的方式 来匹配
let putStatusRequest = (opts) => {
  return async function (id, data) {
    try {
      return await this._fetch({
        method: 'PUT',
        url: opts.url + '/' + id + '/status',
        body: data
      }).then(responseResolve);
    } catch (e) {

      this.catchHandle();
      throw e;
    }
  };
};
let putUserRequest = (opts) => {
  return async function (data) {
    try {
      return await this._fetch({
        method: 'PUT',
        url: opts.url,
        body: data
      }).then(responseResolve);
    } catch (e) {

      this.catchHandle();
      throw e;
    }
  };
};
let getIdRequest = (opts) => {
  return async function (id, data) {
    let formBody = [];
    for (let property in data) {
      let encodeKey = encodeURIComponent(property);
      let encdeeValue = encodeURIComponent(data[property]);
      formBody.push(encodeKey + '=' + encdeeValue);
    }
    formBody = formBody.join('&');
    try {
      return await this._fetch({
        method: 'GET',
        url: opts.url + '/' + id + '?' + formBody
      }).then(responseResolve);
    } catch (e) {

      this.catchHandle();
      throw e;
    }
  };
};
let putTwoRequest = (opts) => {
  return async function (url1, url2, data) {
    try {
      return await this._fetch({
        method: 'PUT',
        url: opts.url + '/' + url1 + '/' + url2,
        body: data
      }).then(responseResolve);
    } catch (e) {

      this.catchHandle();
      throw e;
    }
  };
};
for (let i = 0; i < config.api.length; i++) {
  if (config.api[i].method === 'post') {
    WebAPI.prototype[config.api[i].name] = postRequest(config.api[i]);
  } else if (config.api[i].method === 'get') {
    WebAPI.prototype[config.api[i].name] = getRequest(config.api[i]);
  } else if (config.api[i].method === 'put') {
    WebAPI.prototype[config.api[i].name] = putRequest(config.api[i]);
  } else if (config.api[i].method === 'delete') {
    WebAPI.prototype[config.api[i].name] = deleteRequest(config.api[i]);
  } else if (config.api[i].method === 'putstatus') {
    WebAPI.prototype[config.api[i].name] = putStatusRequest(config.api[i]);
  } else if (config.api[i].method === 'putuser') {
    WebAPI.prototype[config.api[i].name] = putUserRequest(config.api[i]);
  } else if (config.api[i].method === 'getid') {
    WebAPI.prototype[config.api[i].name] = getIdRequest(config.api[i]);
  } else if (config.api[i].method === 'puttwo') {
    WebAPI.prototype[config.api[i].name] = putTwoRequest(config.api[i]);
  }
}
let webApi = new WebAPI();
export default webApi;
