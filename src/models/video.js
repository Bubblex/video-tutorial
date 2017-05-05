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
  },
  subscriptions: {
    videolist({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/video/list') {
          dispatch({ type: 'postVideoList' })
        }
      })
    },
  },
}
