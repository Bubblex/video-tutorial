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
  },
  reducers: {
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
  },
}
