
import './style.scss';
import './style.less';

import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware  } from 'redux';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';

import { composeWithDevTools } from 'redux-devtools-extension'
import { bindActionCreators } from 'redux';

import logger from 'redux-logger';
import thunk from 'redux-thunk';

/////////////////////////////////

import * as types from './actions'

import reducer from './reducers'

import App from './app'



/** 将App和store关联起来 */
const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.getElementById('app')
  );
};



/** 渲染然后监听 */
render()
store.subscribe(render);