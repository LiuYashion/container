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
import Root from './page/index.jsx';


import { createStore } from 'redux';

const reducer = function(state=0, action={}) {
  switch(action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default: return state;
  }
}

const store = createStore(reducer);


const render = () => {
  ReactDOM.render(
    <Root 
      store={ store }
      onIncrease={()=>{ store.dispatch({ type:"INCREMENT" }) }}
      onDecrease={()=>{ store.dispatch({ type:"DECREMENT" }) }}
    ></Root>,
    document.getElementById('app')
  );
};


render()

store.subscribe(render);
```