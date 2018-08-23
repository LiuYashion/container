import { SHOW_LOADING, HIDE_LOADING, SHOW_WARNING, HIDE_WARNING } from '@/store/mutation-type';

export default {
  [SHOW_LOADING](state, info = 'loading') {
    state.loading = { show: true, info };
  },
  [HIDE_LOADING](state, user) {
    state.loading = { show: false, info: 'loaded', user };
  },
  [SHOW_WARNING](state, text = '') {
    state.warning = { state: true, text };
  },
  [HIDE_WARNING](state) {
    state.warning = { state: false, text: '' };
  },
};
