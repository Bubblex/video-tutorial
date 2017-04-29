import {
  userStars,
  userFollowers,
  userFollow,
  userUnfollow,
} from '../services/user'

export default {
  namespace: 'star',
  userFollowersList: [],
  state: {
  },
  reducers: {
    saveUserFollersList(state, { userFollowersList }) {
      return {
        ...state,
        userFollowersList,
      }
    },
  },
  effects: {
    *postFollowSomeone({ payload }, { call, put }) {
      const {
        data: {
          errcode,
          errmsg,
        },
      } = yield call(userFollow, payload)

      if (errcode === 1) {
        yield put({
          type: 'userinfo/postAllUserInfo',
          payload,
        })
      }
    },
    *postUnFollowSomeone({ payload }, { call, put }) {
      const {
        data: {
          errcode,
          errmsg,
        },
      } = yield call(userUnfollow, payload)

      if (errcode === 1) {
        yield put({
          type: 'userinfo/postAllUserInfo',
          payload,
        })
      }
    },
    *postUserFollersList({ payload }, { call, put }) {
      const {
        data: {
          errcode,
          errmsg,
          data: {
            list,
          },
        },
      } = yield call(userFollowers, payload)

      if (errcode === 1) {
        yield put({
          type: 'saveUserFollersList',
          userFollowersList: list,
        })
      }
    },
  },
}
