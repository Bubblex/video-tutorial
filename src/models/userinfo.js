import {
  userInfo,
  userUserBasic,
} from '../services/userinfo'

import {
  userAccountUpdata,
  userApplyLecturer,
} from '../services/user'

import Auth from '../utils/auth.js'

export default {
  namespace: 'userinfo',
  state: {
    isChangepwdModalDisplay: false,
    isApplyFormDisplay: false,
    userBasicInfo: {},
    alluserBasicInfo: {},
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

    openApplyFormModal(state) {
      return {
        ...state,
        isApplyFormDisplay: true,
      }
    },

    closeApplyFormModal(state) {
      return {
        ...state,
        isApplyFormDisplay: false,
      }
    },

    saveUserInfo(state, { userBasicInfo }) {
      return {
        ...state,
        userBasicInfo,
      }
    },

    saveAllUserInfo(state, { alluserBasicInfo }) {
      return {
        ...state,
        alluserBasicInfo,
      }
    },
  },
  effects: {
    *postUserInfo({ payload }, { call, put }) {
      const {
        data: {
          errcode,
          data,
        },
      } = yield call(userInfo, payload)

      if (errcode === 1) {
        Auth.setInfo(data)
        yield put({
          type: 'closeChangepwdModal',
        })
        yield put({
          type: 'saveUserInfo',
          userBasicInfo: data,
        })
      }
    },
    *postChangeInfo({ payload, message }, { call, put }) {
      const {
        data: {
          errcode,
          data,
        },
      } = yield call(userAccountUpdata, payload)

      if (errcode === 1) {
        Auth.setInfo(data)
        yield put({
          type: 'closeChangepwdModal',
        })
      }
    },
    *postApplyLecturer({ payload, message }, { call, put }) {
      const {
        data: {
          errcode,
        },
      } = yield call(userApplyLecturer, payload)

      if (errcode === 1) {
        yield put({
          type: 'closeApplyFormModal',
        })

        yield put({
          type: 'postUserInfo',
        })
      }
    },
    *postAllUserInfo({ payload }, { call, put }) {
      const {
        data: {
          errcode,
          data,
        },
      } = yield call(userUserBasic, payload)

      if (errcode === 1) {
        yield put({
          type: 'saveAllUserInfo',
          alluserBasicInfo: data,
        })
      }
    },
  },
}
