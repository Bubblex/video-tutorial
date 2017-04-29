import {
  userStars,
  userFollowers,
  userFollow,
  userUnfollow,
} from '../services/user'

export default {
  namespace: 'star',
  state: {
  },
  reducers: {
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
  },
}
