import Cookies from 'js-cookie'
import { browserHistory } from 'dva/router'

import Auth from '../utils/auth.js'

import {
  userLogin,
} from '../services/register'


export default {
  namespace: 'login',
  state: {
    user: '',
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
    *postLogin({ payload, message, nextPathname }, { call, put }) {
      const {
        data: {
          errmsg,
          errcode,
          data,
        },
      } = yield call(userLogin, payload)

      if (errcode === 1) {
        yield put({
          type: 'saveUser',
          user: data.user,
        })
        Auth.setInfo(data.user)
        Cookies.set('token', data.token)
        message.success(errmsg, 1.5, () => {
          browserHistory.push(nextPathname)
        })
      } else {
        message.error(errmsg)
      }
    },
  },
}
