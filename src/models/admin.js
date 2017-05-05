import { browserHistory } from 'dva/router'

import adminAuth from '../utils/adminAuth'

import {
  URL_ADMIN_USER,
  URL_ADMIN_ARTICLE,
  URL_ADMIN_VIDEO,
  URL_ADMIN_USER_CERTIFICATION,
  URL_ADMIN_VIDEO_REVIEW,
} from '../config/web'

import {
  adminLogin,
  fetchUserList,
  disableUser,
  fetchArticleList,
  disableArticle,
  fetchVideoList,
  disableVideo,
  fetchUserCertificationList,
  userCertification,
  fetchVideoReviewList,
  videoReview,
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

    userCertificationList: [],
    userCertificationPagination: {},
    userCertificationOptions: {},
    userCertificationDetail: {
      role: {},
    },
    isDisplayUserCertificationDetailModal: false,

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

    videoReviewList: [],
    videoReviewPagination: {},
    videoReviewOptions: {},
    videoReviewDetail: {
      video_author: {},
    },
    isDisplayVideoReviewDetailModal: false,

    adminInfo: {},
    isDisplayCertificationConfirmModal: false,
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

    saveUserCertificationList(state, { list, pagination }) {
      return {
        ...state,
        userCertificationList: list,
        userCertificationPagination: pagination,
      }
    },

    saveUserCertificationOptions(state, { options }) {
      return {
        ...state,
        userCertificationOptions: options,
      }
    },

    saveUserCertificationDetailByIndex(state, { index }) {
      return {
        ...state,
        userCertificationDetail: state.userCertificationList[index],
        isDisplayUserCertificationDetailModal: true,
      }
    },

    clearUserCertificationDetail(state) {
      return {
        ...state,
        isDisplayUserCertificationDetailModal: false,
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

    openVideoDetailModal(state, { index }) {
      return {
        ...state,
        videoDetail: state.videoList[index],
        isDisplayVideoDetailModal: true,
      }
    },

    closeVideoDetailModal(state) {
      return {
        ...state,
        isDisplayVideoDetailModal: false,
      }
    },

    openCertificationConfirmModal(state) {
      return {
        ...state,
        isDisplayCertificationConfirmModal: true,
      }
    },

    closeCertificationConfirmModal(state) {
      return {
        ...state,
        isDisplayCertificationConfirmModal: false,
      }
    },

    saveVideoReviewList(state, { list, pagination }) {
      return {
        ...state,
        videoReviewList: list,
        videoReviewPagination: pagination,
      }
    },

    saveVideoReviewOptions(state, { options }) {
      return {
        ...state,
        videoReviewOptions: options,
      }
    },

    openVideoReviewDetailModal(state) {
      return {
        ...state,
        isDisplayVideoReviewConfirmModal: true,
      }
    },

    closeVideoReviewConfirmModal(state) {
      return {
        ...state,
        isDisplayVideoReviewConfirmModal: false,
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

    *fetchUserCertificationList({ payload }, { call, put }) {
      const {
        data: {
          data,
          errcode,
        },
      } = yield call(fetchUserCertificationList, payload)

      if (errcode === 1) {
        yield put({
          type: 'saveUserCertificationList',
          ...data,
        })
        yield put({
          type: 'saveUserCertificationOptions',
          options: {
            filter: payload.filter,
          },
        })
      }
    },

    *userCertification({ payload, message, success = () => {} }, { call }) {
      const {
        data: {
          errcode,
          errmsg,
        },
      } = yield call(userCertification, payload)

      if (errcode === 1) {
        success()
        message.success(errmsg)
      } else {
        message.error(errmsg)
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

    *fetchVideoReviewList({ payload, message }, { call, put }) {
      const {
        data: {
          data,
          errcode,
          errmsg,
        },
      } = yield call(fetchVideoReviewList, payload)

      if (errcode === 1) {
        yield put({
          type: 'saveVideoReviewList',
          ...data,
        })
        yield put({
          type: 'saveVideoReviewOptions',
          options: {
            filter: payload.filter,
          },
        })
      } else {
        message.error(errmsg)
      }
    },

    *reviewVideo({ payload, message, success = () => {} }, { call }) {
      const {
        data: {
          errcode,
          errmsg,
        },
      } = yield call(videoReview, payload)

      if (errcode === 1) {
        success()
        message.success(errmsg)
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
      } = yield call(disableVideo, payload)

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
        } else if (pathname === URL_ADMIN_USER_CERTIFICATION) {
          dispatch({ type: 'selectMenu', key: '4' })
          dispatch({
            type: 'fetchUserCertificationList',
            payload: {
              ...params,
              token: adminAuth.getToken(),
            },
          })
        } else if (pathname === URL_ADMIN_VIDEO_REVIEW) {
          dispatch({ type: 'selectMenu', key: '5' })
          dispatch({
            type: 'fetchVideoReviewList',
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
