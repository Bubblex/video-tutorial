import {
  userStars,
  userFollowers,
  userFollow,
  userUnfollow,
} from '../services/user'

export default {
  namespace: 'star',
  state: {
    userFollowersList: [],
    activeTabKey: '1',
  },
  reducers: {
    saveUserFollersList(state, { userFollowersList }) {
      return {
        ...state,
        userFollowersList,
      }
    },
    changeActiveTabKey(state, { activeTabKey }) {
      return {
        ...state,
        activeTabKey,
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
