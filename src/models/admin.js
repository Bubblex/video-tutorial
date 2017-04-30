import {
  URL_ADMIN_USER,
  URL_ADMIN_ARTICLE,
  URL_ADMIN_VIDEO,
} from '../config/web'

export default {
  namespace: 'admin',
  state: {
    selectedMenuKey: 1,
  },
  reducers: {
    selectMenu(state, { key }) {
      return {
        ...state,
        selectedMenuKey: key,
      }
    },
  },
  effects: {
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === URL_ADMIN_USER) {
          dispatch({ type: 'selectMenu', key: '1' })
        } else if (pathname === URL_ADMIN_ARTICLE) {
          dispatch({ type: 'selectMenu', key: '2' })
        } else if (pathname === URL_ADMIN_VIDEO) {
          dispatch({ type: 'selectMenu', key: '3' })
        }
      })
    },
  },
}
