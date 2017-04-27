import {
  userLogin,
} from '../services/account'

export default {
  namespace: 'home',
  state: {
    isDisplayModal: false,
    user: {},
  },
  reducers: {
    openModal(state) {
      return {
        ...state,
        isDisplayModal: true,
      }
    },

    closeModal(state) {
      return {
        ...state,
        isDisplayModal: false,
      }
    },

    saveUser(state, { user }) {
      return {
        ...state,
        user,
      }
    },
  },
  effects: {
    *postLogin({ payload }, { call, put }) {
      const {
        data: {
          errcode,
          data,
        },
      } = yield call(userLogin, payload)

      if (errcode === 1) {
        yield put({
          type: 'saveUser',
          user: data.user,
        })
      }
    },
  },
}
