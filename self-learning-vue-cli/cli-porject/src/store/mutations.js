import {
  SHOW_LOADING,
  HIDE_LOADING,
} from '@/store/mutation-type';

export default {
  [SHOW_LOADING](state, info = 'loading') {
    state.loadingState = { show: true, info };
  },
  [HIDE_LOADING](state, user) {
    state.loadingState = { show: false, info: 'loading', user };
  },
};
