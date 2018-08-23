

import { combineReducers } from 'redux';

import counter from '@/reducers/reducer/counter'
import user from '@/reducers/reducer/user'



const rootReducer = combineReducers({
  counter,
  user
});

export default rootReducer;