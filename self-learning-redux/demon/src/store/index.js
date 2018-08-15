



/** 将reducer注册到store */
const store = createStore(
  reducer,
  composeWithDevTools(),
  // applyMiddleware(logger, error)
  applyMiddleware(logger, thunk)
);

