import { browserHistory } from 'dva/router'

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
      yield call(changePwd, payload)
    },
  },
}
