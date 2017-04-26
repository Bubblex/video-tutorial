import { browserHistory } from 'dva/router'

import {
  userRegister,
} from '../services/register'


export default {
  namespace: 'register',
  state: {
  },
  reducers: {
  },
  effects: {
    *postRegister({ payload, message: messageComponent }, { call }) {
      const {
        data: {
          message,
          errcode,
        },
      } = yield call(userRegister, payload)

      if (errcode === 1) {
        messageComponent.success(message, 1.5, () => {
          browserHistory.push('/account/login')
        })
      } else {
        messageComponent.error(message)
      }
    },
  },
}
