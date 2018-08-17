import {
  FILTER_ODD_ITEM,
  FILTER_EVEN_ITEM,
} from '@/store/mutation-type';

export default {
  [FILTER_ODD_ITEM](state) {
    return state.defaultLists.filter(item => item.id % 2);
  },
  [FILTER_EVEN_ITEM](state) {
    return state.defaultLists.filter(item => !(item.id % 2));
  },
};
