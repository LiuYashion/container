
import { LOAD_USER_FINISHED, LOAD_USER_FILLED, LOAD_USER_PENDING } from '@/constants';

const defaultState = {
  isfetching: false,
  error: null,
  user: {},
};

export default function (state = defaultState, action = {}) {
  switch (action.type) {
    case LOAD_USER_FINISHED:
      return {
        isfetching: false,
        error: null,
        user: action.payload,
      };
    case LOAD_USER_FILLED:
      return {
        isfetching: false,
        error: '请求失败',
        user: {},
      };
    case LOAD_USER_PENDING:
      return {
        isfetching: true,
        error: null,
        user: {},
      };
    default:
      return state;
  }
}
