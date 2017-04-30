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
    userStarrsList: [],
    activeTabKey: '1',
  },
  reducers: {
    saveUserFollersList(state, { userFollowersList }) {
      return {
        ...state,
        userFollowersList,
      }
    },
    saveUserStarsList(state, { userStarrsList }) {
      return {
        ...state,
        userStarrsList,
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
    *postUserStarsList({ payload }, { call, put }) {
      const {
        data: {
          errcode,
          data: {
            list,
          },
        },
      } = yield call(userStars, payload)

      if (errcode === 1) {
        yield put({
          type: 'saveUserStarsList',
          userStarrsList: list,
        })
      }
    },
  },
}
