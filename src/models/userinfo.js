import {
  userInfo,
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
          type: 'saveUserInfo',
          userBasicInfo: data,
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
  },
}
