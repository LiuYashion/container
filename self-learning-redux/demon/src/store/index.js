

import { createStore, applyMiddleware  } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from '../reducers'

// import logger from 'redux-logger';
// import thunk from 'redux-thunk';

/** 将reducer注册到store */
const store = createStore(
  reducer,
  // composeWithDevTools(),
  // applyMiddleware(logger, error)
  // applyMiddleware(logger, thunk)
);

