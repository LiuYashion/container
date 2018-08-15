# redux是什么

统一状态管理

# reducer
计算新的state

# dispatch
发起改变state的方法

# state
共享的state

# code
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import PropTypes from 'prop-types';

const increment = () => {
  return { type: 'INCREMENT' }
};
const decrement = () => {
  return { type: 'DECREMENT' }
};


/** 定义组件 */
class App extends React.Component {
  render() {
    return (
      <div>
        <h1>{ this.props.counter }</h1>
        <button onClick={ this.props.onIncrease }>Increase</button>
        <button onClick={ this.props.onDecrease }>Decrease</button>
      </div>
    );
  }
}
App.propTypes = {
  counter: PropTypes.number.isRequired
}


/** 与App关联起来，将state，dispatch映射到props中 */
const mapStateToProps = (state) => {
  return {
    counter: state
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onIncrease: (name) => { dispatch(increment(name)) },
    onDecrease: (name) => { dispatch(decrement(name)) }
  };
};
const Root =  connect(mapStateToProps, mapDispatchToProps)(App);



/** 定义reducer处理state */
/** 多个reducer就能使用下面的方法组合起来 */
import { combineReducers } from 'redux';
const reducer = function(state=0, action={}) {
  switch(action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default: return state;
  }
}

/** 将reducer注册到store */
const store = createStore(
  reducer,
  composeWithDevTools()
);


/** 将App和store关联起来 */
const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Root/>
    </Provider>,
    document.getElementById('app')
  );
};

/** 渲染然后监听 */
render()
store.subscribe(render);
```


----------------
上面就是基本的配置使用方法



# 中间件 applyMiddleware
打印一些日志


#  redux-thunk
使得在action中也能使用异步 

> 这里对action做一点解释，action需要是一个简单对象，但是这里我们可能会有异步请求。所以这个热action就可能是函数，或者promise对象。

在redux-chunk中使用ajax



