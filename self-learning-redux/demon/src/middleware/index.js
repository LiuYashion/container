/** 中间件 */
// const logger = store => next => action => {
//   console.log('dispatching', action);
//   let result = next(action);
//   console.log('next state', store.getState());
//   return result;
// }
// const error = store => next => action => {
//   try {
//     next(action)
//   } catch(e) {
//     console.log('error ' + e);
//   }
// };
