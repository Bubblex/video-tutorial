import { browserHistory } from 'dva/router'

import adminAuth from '../utils/adminAuth'

import {
  URL_ADMIN_USER,
  URL_ADMIN_ARTICLE,
  URL_ADMIN_VIDEO,
} from '../config/web'

import {
  adminLogin,
  fetchUserList,
  disableUser,
  fetchArticleList,
  disableArticle,
  fetchVideoList,
  disableVideo,
} from '../services/admin'

export default {
  namespace: 'admin',
  state: {
    selectedMenuKey: 1,

    userList: [],
    userPagination: {},
    userOptions: {},
    userDetail: {
      role: {},
    },
    isDisplayUserDetailModal: false,

    articleList: [],
    articlePagination: {},
    articleOptions: {},
    articleDetail: {
      type: {},
      article_author: {},
    },
    isDisplayArticleDetailModal: false,

    videoList: [],
    videoPagination: {},
    videoOptions: {},
    videoDetail: {
      video_author: {},
    },
    isDisplayVideoDetailModal: false,

    adminInfo: {},
  },
  reducers: {
    /**
     * 选中菜单
     *
     * @param {any} state
     * @param {any} { key }
     * @returns
     */
    selectMenu(state, { key }) {
      return {
        ...state,
        selectedMenuKey: key,
      }
    },

    /**
     * 保存管理员信息
     *
     * @param {any} state
     * @param {any} { info }
     * @returns
     */
    saveAdminInfo(state, { info }) {
      return {
        ...state,
        adminInfo: info,
      }
    },

    /**
     * 保存用户信息
     *
     * @param {any} state
     * @param {any} { list }
     * @returns
     */
    saveUserList(state, { list, pagination }) {
      return {
        ...state,
        userList: list,
        userPagination: pagination,
      }
    },

    updateUserStatus(state, { index, status }) {
      const immute = state.userList.slice()
      immute[index].status = status

      return {
        ...state,
        userList: immute,
      }
    },

    saveUserDetailByIndex(state, { index }) {
      return {
        ...state,
        userDetail: state.userList[index],
        isDisplayUserDetailModal: true,
      }
    },

    clearUserDetail(state) {
      return {
        ...state,
        isDisplayUserDetailModal: false,
      }
    },

    saveUserOptions(state, { options }) {
      return {
        ...state,
        userOptions: options,
      }
    },

    saveArticleList(state, { list, pagination }) {
      return {
        ...state,
        articleList: list,
        articlePagination: pagination,
      }
    },

    saveArticleOptions(state, { options }) {
      return {
        ...state,
        articleOptions: options,
      }
    },

    updateArticleStatus(state, { index, status }) {
      const immute = state.articleList.slice()
      immute[index].status = status

      return {
        ...state,
        articleList: immute,
      }
    },

    openArticleDetailModal(state, { index }) {
      return {
        ...state,
        articleDetail: state.articleList[index],
        isDisplayArticleDetailModal: true,
      }
    },

    closeArticleDetailModal(state) {
      return {
        ...state,
        isDisplayArticleDetailModal: false,
      }
    },

    saveVideoList(state, { list, pagination }) {
      return {
        ...state,
        videoList: list,
        videoPagination: pagination,
      }
    },

    saveVideoOptions(state, { options }) {
      return {
        ...state,
        videoOptions: options,
      }
    },

    updateVideoStatus(state, { index, status }) {
      const immute = state.videoList.slice()
      immute[index].status = status

      return {
        ...state,
        videoList: immute,
      }
    },
  },
  effects: {
    *adminLogin({ payload, message }, { call, put }) {
      const {
        data: {
          data,
          errcode,
          errmsg,
        },
      } = yield call(adminLogin, payload)

      if (errcode === 1) {
        message.success(errmsg, 1.5, () => {
          browserHistory.push('/admin/user')
        })
        adminAuth.setToken(data.token)
        adminAuth.setInfo(data)
        yield put({
          type: 'saveAdminInfo',
          info: data,
        })
      } else {
        message.error(errmsg)
      }
    },

    *fetchUserList({ payload }, { call, put }) {
      const {
        data: {
          data,
          errcode,
        },
      } = yield call(fetchUserList, payload)

      if (errcode === 1) {
        yield put({
          type: 'saveUserList',
          ...data,
        })
        yield put({
          type: 'saveUserOptions',
          options: {
            filter: payload.filter,
          },
        })
      }
    },

    *disableUser({ payload, message, index }, { call, put }) {
      const {
        data: {
          errcode,
          errmsg,
        },
      } = yield call(disableUser, payload)

      if (errcode === 1) {
        message.success(errmsg)
        yield put({
          index,
          type: 'updateUserStatus',
          status: payload.disable,
        })
      } else {
        message.error(errmsg)
      }
    },

    *fetchArticleList({ payload, message }, { call, put }) {
      const {
        data: {
          data,
          errcode,
          errmsg,
        },
      } = yield call(fetchArticleList, payload)

      if (errcode === 1) {
        yield put({
          type: 'saveArticleList',
          ...data,
        })
        yield put({
          type: 'saveArticleOptions',
          options: {
            filter: payload.filter,
          },
        })
      } else {
        message.error(errmsg)
      }
    },

    *disableArticle({ payload, message, index }, { call, put }) {
      const {
        data: {
          errcode,
          errmsg,
        },
      } = yield call(disableArticle, payload)

      if (errcode === 1) {
        message.success(errmsg)
        yield put({
          type: 'updateArticleStatus',
          index,
          status: payload.disable,
        })
      } else {
        message.error(errmsg)
      }
    },

    *fetchVideoList({ payload, message }, { call, put }) {
      const {
        data: {
          data,
          errcode,
          errmsg,
        },
      } = yield call(fetchVideoList, payload)

      if (errcode === 1) {
        yield put({
          type: 'saveVideoList',
          ...data,
        })
        yield put({
          type: 'saveVideoOptions',
          options: {
            filter: payload.filter,
          },
        })
      } else {
        message.error(errmsg)
      }
    },

    *disableVideo({ payload, message, index }, { call, put }) {
      const {
        data: {
          errcode,
          errmsg,
        },
      } = yield call(disableUser, payload)

      if (errcode === 1) {
        message.success(errmsg)
        yield put({
          type: 'updateVideoStatus',
          index,
          status: payload.disable,
        })
      } else {
        message.error(errmsg)
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, params }) => {
        if (pathname === URL_ADMIN_USER) {
          dispatch({ type: 'selectMenu', key: '1' })
          dispatch({
            type: 'fetchUserList',
            payload: {
              ...params,
              token: adminAuth.getToken(),
            },
          })
        } else if (pathname === URL_ADMIN_ARTICLE) {
          dispatch({ type: 'selectMenu', key: '2' })
          dispatch({
            type: 'fetchArticleList',
            payload: {
              ...params,
              token: adminAuth.getToken(),
            },
          })
        } else if (pathname === URL_ADMIN_VIDEO) {
          dispatch({ type: 'selectMenu', key: '3' })
          dispatch({
            type: 'fetchVideoList',
            payload: {
              ...params,
              token: adminAuth.getToken(),
            },
          })
        }
      })
    },
  },
}
