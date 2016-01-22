/* ************************************************************************** */
/*                                                                            */
/* 每位工程师都有保持代码优雅和整洁的义务                                             */
/*                                                                            */
/* ************************************************************************** */
/**
 * Created by saber on 16/1/4.
 */
//'use strict';

const {
  LOGGED_IN_STATE,
  LOGGED_OUT_STATE
  } = require('../../libs/constants').default;
// 用户的信息的初始数据
let initialState = {
  state: 'newstate'
};
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGGED_IN_STATE:
    case LOGGED_OUT_STATE:
      let nextstate = Object.assign({}, state, {state: action.type});
      return nextstate;
    default:
      return state;
  }
  return state;
}
