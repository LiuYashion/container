

import { combineReducers } from 'redux';



/** 定义reducer处理state */
const reducer = function(state=0, action={}) {
  switch(action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default: return state;
  }
}


const rootReducer = combineReducers({
  reducer
});

export default rootReducer;