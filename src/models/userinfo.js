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

import {
  messageList,
  messageRead,
  messageDelete,
} from '../services/message'

import Auth from '../utils/auth.js'

export default {
  namespace: 'userinfo',
  state: {
    isChangepwdModalDisplay: false,
    isApplyFormDisplay: false,
    userBasicInfo: {},
    alluserBasicInfo: {},
    userMessageList: [],
    isMessageDetailModalPlay: false,
    showMessageDetail: {},
    userMessageListPagination: [],
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

    saveUserMessageList(state, { userMessageList, userMessageListPagination }) {
      return {
        ...state,
        userMessageList,
        userMessageListPagination,
      }
    },

    openMessageDetailModal(state) {
      return {
        ...state,
        isMessageDetailModalPlay: true,
      }
    },

    closeMessageDetailModal(state) {
      return {
        ...state,
        isMessageDetailModalPlay: false,
      }
    },

    saveShowMessageDetail(state, { showMessageDetail }) {
      return {
        ...state,
        showMessageDetail,
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
    *postUserMessageList({ payload }, { call, put }) {
      const {
        data: {
          errcode,
          data,
          errmsg,
        },
      } = yield call(messageList, payload)

      if (errcode === 1) {
        yield put({
          type: 'saveUserMessageList',
          userMessageList: data.list,
          userMessageListPagination: data.pagination,
        })
      } else {
        message.error(errmsg)
      }
    },
    *postReadMessage({ payload }, { call }) {
      yield call(messageRead, payload)
    },
    *postDeleteMessage({ payload, message }, { call, put }) {
      const {
        data: {
          errcode,
          errmsg,
        },
      } = yield call(messageDelete, payload)

      if (errcode === 1) {
        yield put({
          type: 'postUserMessageList',
          payload: {
            token: Auth.getToken(),
          },
        })
        message.success(errmsg)
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
              pageSize: 9,
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
              type: 2,
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
    userlikevideolist({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/user/likevideo') {
          dispatch({
            type: 'video/postVideoList',
            payload: {
              id: Auth.getInfo().id,
              type: 2,
            },
          })
        }
      })
    },
    usermessagelist({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/user/message') {
          dispatch({
            type: 'postUserMessageList',
            payload: {
              token: Auth.getToken(),
            },
          })
        }
      })
    },
  },
}
