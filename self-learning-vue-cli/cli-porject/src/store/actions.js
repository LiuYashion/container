import {
  SHOW_LOADING,
  HIDE_LOADING,
  SHOW_WARNING,
  HIDE_WARNING,
} from '@/store/mutation-type';

import {
  getquestion,
} from '@/service';

// let debounce = function debounce(fn, interval = 800){
//   let timeout = null;
//   return function () {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => {
//       fn.apply(this, arguments);
//     }, interval);
//   };
// }

let timeout = null;

export default {
  async anqLoading({ commit, state }, payload = '加载中...') {
    commit(SHOW_LOADING, payload);
    await getquestion().then(() => {
      commit(HIDE_LOADING, state);
    });
  },
  // async anqLoading({ commit, state }, payload) {
  //   commit(SHOW_LOADING, '加载中...');
  //   await getquestion().then((res) => {
  //     commit(HIDE_LOADING, state);
  //   });
  // },
  async anqWarning({ commit }, payload) {
    clearTimeout(timeout);
    commit(SHOW_WARNING, payload);
    timeout = setTimeout(() => {
      commit(HIDE_WARNING);
    }, 2000);
  },
};
