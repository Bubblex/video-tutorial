import Cookies from 'js-cookie'
import { browserHistory } from 'dva/router'

import {
  userLogin,
} from '../services/register'


export default {
  namespace: 'login',
  state: {
    uer: '',
  },
  reducers: {
    saveUser(state, { user }) {
      return {
        ...state,
        user,
      }
    },
  },
  effects: {
    *postLogin({ payload, message: messageComponent }, { call, put }) {
      const {
        data: {
          message,
          errcode,
          data,
        },
      } = yield call(userLogin, payload)

      if (errcode === 1) {
        yield put({
          type: 'saveUser',
          user: data.user,
        })
        Cookies.set('token', data.token)
        messageComponent.success(message, 1.5, () => {
          browserHistory.push('/')
        })
      } else {
        messageComponent.error(message)
      }
    },
  },
}
