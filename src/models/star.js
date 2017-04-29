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
        errcode,
        errmsg,
      } = yield call(userFollow, payload)

      if (errcode === 1) {
        yield put({
          type: 'userinfo/postAllUserInfo',
        })
      }
    },
  },
}
