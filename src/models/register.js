import { browserHistory } from 'dva/router'
import Cookies from 'js-cookie'

import {
  userRegister,
  changePwd,
} from '../services/register'


export default {
  namespace: 'register',
  state: {
  },
  reducers: {
  },
  effects: {
    *postRegister({ payload, message }, { call }) {
      const {
        data: {
          errmsg,
          errcode,
        },
      } = yield call(userRegister, payload)

      if (errcode === 1) {
        message.success(errmsg, 1.5, () => {
          browserHistory.push('/account/login')
        })
      } else {
        message.error(errmsg)
      }
    },

    *PostChangePwd({ payload, message }, { call }) {
      const {
        data: {
          errmsg,
          errcode,
        },
      } = yield call(changePwd, payload)

      if (errcode === 1) {
        Cookies.remove('token')
        localStorage.removeItem('info')
        message.success(errmsg, 1.5, () => {
          browserHistory.push('/account/login')
        })
      } else {
        message.error(errmsg)
      }
    },
  },
}
