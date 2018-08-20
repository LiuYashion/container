

import React from 'react';
import ReactDOM from 'react-dom';
import App from './app'
import { Provider } from 'react-redux';

// import { connect } from 'react-redux';
// import { composeWithDevTools } from 'redux-devtools-extension'
// import { bindActionCreators } from 'redux';
// import { createStore, applyMiddleware  } from 'redux';

import './style/style.scss';
import './style/style.less';


import store from './store'


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
// store.subscribe(render);