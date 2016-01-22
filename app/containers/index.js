import React, { Component, StatusBarIOS } from 'react-native';
import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { Provider, } from 'react-redux/native';

import * as reducers from '../reducers/index';
import Application from './app';

const reducer = combineReducers(reducers);
//const store = createStore(reducer);

const createStoreWithMiddleware = applyMiddleware(
    thunk
)(createStore);
const store = createStoreWithMiddleware(reducer,{});

class AppContainer extends Component {
  
  render() {
    return (
      <Provider store={store}>
        {() => <Application />}
      </Provider>
    );
  }
}

export default AppContainer;
