import Vue from 'vue';
import Vuex from 'vuex';
import actions from '@/store/actions';
import getters from '@/store/getters';
import mutations from '@/store/mutations';

Vue.use(Vuex);

const state = {
  author: 'LiuYaXiong',
  loadingState: {
    show: true,
    info: 'loading...',
    user: {},
  },
  defaultLists: [{
    id: 0, des: 'item 000',
  }, {
    id: 1, des: 'item 001',
  }, {
    id: 2, des: 'item 002',
  }, {
    id: 3, des: 'item 003',
  }, {
    id: 4, des: 'item 004',
  }, {
    id: 5, des: 'item 005',
  }, {
    id: 6, des: 'item 006',
  }, {
    id: 7, des: 'item 007',
  }, {
    id: 8, des: 'item 008',
  }, {
    id: 9, des: 'item 009',
  }],
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});

