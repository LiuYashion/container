import Vue from 'vue';
import Vuex from 'vuex';
import actions from '@/store/actions';
import getters from '@/store/getters';
import mutations from '@/store/mutations';

Vue.use(Vuex);

const state = {
  author: 'LiuYaXiong',
  warning: {
    state: false,
    text: '系统繁忙请稍后再试',
  },
  inform: {
    state: true,
    text: '系统繁忙请稍后再试',
  },
  loading: {
    show: true,
    info: 'loaded',
    user: {},
  },
  defaultLists: [{
    id: 0, des: 'item 000',
  }, {
    id: 1, des: 'item 001',
  }, {
    id: 2, des: 'item 002',
  }],
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});

