import { browserHistory } from 'dva/router'

import {
  videoList,
  videoDetail,
  videoCollect,
  videoCancel,
  videoRelease,
} from '../services/video'

import Auth from '../utils/auth.js'

export default {
  namespace: 'video',
  state: {
    videoDataList: [],
    videoListPagination: [],
    videoDetails: {
      author: {},
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
  },
}