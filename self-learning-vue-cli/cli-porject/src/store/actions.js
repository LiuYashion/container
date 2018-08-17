import {
  SHOW_LOADING,
  HIDE_LOADING,
} from '@/store/mutation-type';

import {
  getquestion,
} from '@/service';

export default {
  async getTestUser({ commit, state }) {
    commit(SHOW_LOADING);
    await getquestion().then((res) => {
      console.log(res);
      commit(HIDE_LOADING, state);
    });
  },
};
