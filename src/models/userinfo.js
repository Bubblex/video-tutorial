import {
  userInfo,
} from '../services/userinfo'

import Auth from '../utils/auth.js'


export default {
  namespace: 'userinfo',
  state: {
  },
  reducers: {
  },
  effects: {
    *postUserInfo({ payload }, { call }) {
      const {
        data: {
          errcode,
          errmsg,
          data,
        },
      } = yield call(userInfo, payload)

      if (errcode === 1) {
        Auth.setInfo(data)
      }
    },
  },
}
