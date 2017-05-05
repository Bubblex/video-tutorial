import {
  message,
} from 'antd'

import {
  userInfo,
  userUserBasic,
} from '../services/userinfo'

import {
  userAccountUpdata,
  userApplyLecturer,
} from '../services/user'

import Auth from '../utils/auth.js'

export default {
  namespace: 'userinfo',
  state: {
    isChangepwdModalDisplay: false,
    isApplyFormDisplay: false,
    userBasicInfo: {},
    alluserBasicInfo: {},
  },
  reducers: {
    openChangepwdModal(state) {
      return {
        ...state,
        isChangepwdModalDisplay: true,
      }
    },

    closeChangepwdModal(state) {
      return {
        ...state,
        isChangepwdModalDisplay: false,
      }
    },

    openApplyFormModal(state) {
      return {
        ...state,
        isApplyFormDisplay: true,
      }
    },

    closeApplyFormModal(state) {
      return {
        ...state,
        isApplyFormDisplay: false,
      }
    },

    saveUserInfo(state, { userBasicInfo }) {
      return {
        ...state,
        userBasicInfo,
      }
    },

    saveAllUserInfo(state, { alluserBasicInfo }) {
      return {
        ...state,
        alluserBasicInfo,
      }
    },
  },
  effects: {
    *postUserInfo({ payload }, { call, put }) {
      const {
        data: {
          errcode,
          data,
        },
      } = yield call(userInfo, payload)

      if (errcode === 1) {
        Auth.setInfo(data)
        yield put({
          type: 'closeChangepwdModal',
        })
        yield put({
          type: 'saveUserInfo',
          userBasicInfo: data,
        })
      }
    },
    *postChangeInfo({ payload, message }, { call, put }) {
      const {
        data: {
          errcode,
          data,
        },
      } = yield call(userAccountUpdata, payload)

      if (errcode === 1) {
        Auth.setInfo(data)
        yield put({
          type: 'closeChangepwdModal',
        })
      }
    },
    *postApplyLecturer({ payload, message }, { call, put }) {
      const {
        data: {
          errcode,
          errmsg,
        },
      } = yield call(userApplyLecturer, payload)

      if (errcode === 1) {
        message.success(errmsg)
        yield put({
          type: 'closeApplyFormModal',
        })

        yield put({
          type: 'postUserInfo',
          payload,
        })
      } else {
        message.error(errmsg)
      }
    },
    *postAllUserInfo({ payload, message }, { call, put }) {
      const {
        data: {
          errcode,
          data,
          errmsg,
        },
      } = yield call(userUserBasic, payload)

      if (errcode === 1) {
        yield put({
          type: 'saveAllUserInfo',
          alluserBasicInfo: data,
        })
      } else {
        message.error(errmsg)
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/user') {
          dispatch({ type: 'star/changeActiveTabKey', activeTabKey: '1' })
          dispatch({
            type: 'postAllUserInfo',
            payload: { token: Auth.getToken(), ...query },
            message,
          })
          dispatch({
            type: 'video/postVideoList',
            payload: { token: Auth.getToken(), ...query },
          })
        }
      })
    },
    userarticlelist({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/user/article') {
          dispatch({
            type: 'article/postArticleList',
            payload: {
              id: Auth.getInfo().id,
            },
          })
        }
      })
    },
    userstar({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/user/star') {
          dispatch({
            type: 'star/postUserStarsList',
            payload: {
              id: Auth.getInfo().id,
            },
          })
        }
      })
    },
    userFollow({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/user/follow') {
          dispatch({
            type: 'star/postUserFollersList',
            payload: {
              id: Auth.getInfo().id,
            },
          })
        }
      })
    },
    userLikeArticle({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/user/like') {
          dispatch({
            type: 'article/postArticleList',
            payload: {
              id: Auth.getInfo().id,
            },
          })
        }
      })
    },
    uservideolist({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/user/video') {
          dispatch({
            type: 'video/postVideoList',
            payload: {
              id: Auth.getInfo().id,
            },
          })
        }
      })
    },
  },
}
