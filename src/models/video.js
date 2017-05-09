import { browserHistory } from 'dva/router'

import {
  videoList,
  videoDetail,
  videoCollect,
  videoCancel,
  videoRelease,
  videoDelete,
  userCommendCertification,
} from '../services/video'

import Auth from '../utils/auth.js'

export default {
  namespace: 'video',
  state: {
    videoDataList: [],
    videoListPagination: [],
    videoDetails: {
      video_author: {},
    },
  },
  reducers: {
    saveVideoList(state, { videoDataList }) {
      return {
        ...state,
        videoDataList,
      }
    },
    saveVideoListPagination(state, { videoListPagination }) {
      return {
        ...state,
        videoListPagination,
      }
    },
    savaVideoDetail(state, { videoDetails }) {
      return {
        ...state,
        videoDetails,
      }
    },
  },
  effects: {
    *postVideoRelease({ payload, message }, { call }) {
      const {
        data: {
          errcode,
          errmsg,
        },
      } = yield call(videoRelease, payload)

      if (errcode === 1) {
        message.success(errmsg, 1.5, () => {
          browserHistory.push('/user/video')
        })
      } else {
        message.error(errmsg)
      }
    },
    *postVideoList({ payload, message }, { call, put }) {
      const {
        data: {
          errcode,
          errmsg,
          data,
        },
      } = yield call(videoList, payload)

      if (errcode === 1) {
        yield put({
          type: 'saveVideoList',
          videoDataList: data.list,
        })
        yield put({
          type: 'saveVideoListPagination',
          videoListPagination: data.pagination,
        })
      } else {
        message.error(errmsg)
      }
    },
    *postVideoDetail({ payload, message }, { call, put }) {
      const {
        data: {
          errcode,
          errmsg,
          data,
        },
      } = yield call(videoDetail, payload)

      if (errcode === 1) {
        yield put({
          type: 'savaVideoDetail',
          videoDetails: data,
        })
      } else {
        message.error(errmsg)
      }
    },
    *postCollectVideo({ payload, message, replace, nextPathname }, { call, put }) {
      const {
        data: {
          errcode,
          errmsg,
        },
      } = yield call(videoCollect, payload)

      if (errcode === 1) {
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
    *postCancelCollectVideo({ payload, message }, { call, put }) {
      const {
        data: {
          errcode,
          errmsg,
        },
      } = yield call(videoCancel, payload)

      if (errcode === 1) {
        message.success(errmsg)
      } else {
        message.error(errmsg)
      }
    },
    *postDeleteVideo({ payload, message }, { call, put }) {
      const {
        data: {
          errcode,
          errmsg,
        },
      } = yield call(videoDelete, payload)

      if (errcode === 1) {
        yield put({
          type: 'postVideoList',
          payload: {
            id: Auth.getInfo().id,
          },
        })
        message.success(errmsg)
      } else {
        message.error(errmsg)
      }
    },
  },
  subscriptions: {
    videolist({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/video/list') {
          dispatch({ type: 'postVideoList' })
        }
      })
    },
    videodetail({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/video/detail') {
          dispatch({
            type: 'postVideoDetail',
            payload: {
              token: Auth.getToken(),
              ...query,
            },
          })
        }
      })
    },
    userinfo({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/release/video') {
          dispatch({
            type: 'userinfo/postUserInfo',
            payload: {
              token: Auth.getToken(),
            },
          })
          dispatch({
            type: 'postVideoList',
            payload: {
              pageSize: 6,
            },
          })
        }
      })
    },
  },
}
