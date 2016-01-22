/* ************************************************************************** */
/*                                                                            */
/* 每位工程师都有保持代码优雅和整洁的义务                                             */
/*                                                                            */
/* ************************************************************************** */
/**
 * Created by saber on 16/1/5.
 */
//'use strict';
const {
    WEALTHMESSAGE_REQUEST,
    WEALTHMESSAGE_SUCCESS,
    WEALTHMESSAGE_FAILURE,
    WEALTHMESSAGE_OPEN_SUCCESS,
    WEALTHMESSAGE_READ_SUCCESS
    } = require('../../libs/constants').default;
let initialState = {
  list: [],
  registerOpen: 0,
  tradeOpen: 0,
};
// 财富相关的 reducer

export default function wealthMessageReducer(state = initialState, action) {
  let nextstate;
  switch (action.type) {
    // 财富列表消息获取成功
    case WEALTHMESSAGE_SUCCESS:
      nextstate = Object.assign({}, state, {list: action.payload.list});
      return nextstate;
    // 获取财富用户接受信息开关
    case WEALTHMESSAGE_OPEN_SUCCESS:
      nextstate = Object.assign({}, state,
        {
          registerOpen: action.payload.bRegisterOpen,
          tradeOpen: action.payload.bTradeOpen
        });
      return nextstate;
    default:
      return state;
  //case WEALTHMESSAGE_READ_SUCCESS:
  //  nextstate = Object.assign({},state);
  //  for (let i = 0; i < nextstate.list.length; i++ ){
  //    if(action){
  //      break;
  //    }
  //  }
  //  return nextstate;
  }
  return state;
}
