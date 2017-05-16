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
    userFollowersListPagination: [],
    userStarrsListPagination: [],
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
    saveUserFollersListPagination(state, { userFollowersListPagination }) {
      return {
        ...state,
        userFollowersListPagination,
      }
    },
    saveUserStarsListPagination(state, { userStarrsListPagination }) {
      return {
        ...state,
        userStarrsListPagination,
      }
    },
  },
  effects: {
    *postFollowSomeone({ payload, message, replace, nextPathname }, { call, put }) {
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
        message.success(errmsg)
      } else if (errcode === 100) {
        message.error(errmsg, 1.5, () => {
          replace({
            pathname: '/account/login',
            state: {
              nextPathname,
            },
          })
        })
      }
    },
    *postUnFollowSomeone({ payload, message }, { call, put }) {
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
        message.success(errmsg)
      } else {
        message.error(errmsg)
      }
    },
    *postUserFollersList({ payload }, { call, put }) {
      const {
        data: {
          errcode,
          data: {
            list,
            pagination,
          },
        },
      } = yield call(userFollowers, payload)

      if (errcode === 1) {
        yield put({
          type: 'saveUserFollersList',
          userFollowersList: list,
        })
        yield put({
          type: 'saveUserFollersListPagination',
          userFollowersListPagination: pagination,
        })
      }
    },
    *postUserStarsList({ payload }, { call, put }) {
      const {
        data: {
          errcode,
          data: {
            list,
            pagination,
          },
        },
      } = yield call(userStars, payload)

      if (errcode === 1) {
        yield put({
          type: 'saveUserStarsList',
          userStarrsList: list,
        })
        yield put({
          type: 'saveUserStarsListPagination',
          userStarrsListPagination: pagination,
        })
      }
    },
  },
}
