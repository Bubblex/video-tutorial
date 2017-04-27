import {
  userInfo,
} from '../services/userinfo'

import Auth from '../utils/auth.js'


export default {
  namespace: 'userinfo',
  state: {
    isChangepwdModalDisplay: false,
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
  },
  effects: {
    *postUserInfo({ payload }, { call }) {
      const {
        data: {
          errcode,
          data,
        },
      } = yield call(userInfo, payload)

      if (errcode === 1) {
        Auth.setInfo(data)
      }
    },
  },
}
