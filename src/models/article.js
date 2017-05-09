import { browserHistory } from 'dva/router'

import {
  articleList,
  articleDetail,
  articleCollect,
  articleCancel,
  articleRelease,
  articleDelete,
} from '../services/article'

import Auth from '../utils/auth.js'

export default {
  namespace: 'article',
  state: {
    articleDataList: [],
    articleListPagination: [],
    CheckArticleType: 0,
    articleDetails: {
      author: {},
    },
    articleContent: '',
  },
  reducers: {
    saveArticleList(state, { articleDataList }) {
      return {
        ...state,
        articleDataList,
      }
    },
    saveArticleListPagination(state, { articleListPagination }) {
      return {
        ...state,
        articleListPagination,
      }
    },
    changeCheckedTag(state, { CheckArticleType }) {
      return {
        ...state,
        CheckArticleType,
      }
    },
    savaArticleDetail(state, { articleDetails }) {
      return {
        ...state,
        articleDetails,
      }
    },
    saveArticleContent(state, { articleContent }) {
      return {
        ...state,
        articleContent,
      }
    },
  },
  effects: {
    *postArticleRelease({ payload, message }, { call }) {
      const {
        data: {
          errcode,
          errmsg,
        },
      } = yield call(articleRelease, payload)

      if (errcode === 1) {
        message.success(errmsg, 1.5, () => {
          browserHistory.push('/article/list')
        })
      } else {
        message.error(errmsg)
      }
    },
    *postArticleList({ payload, message }, { call, put }) {
      const {
        data: {
          errcode,
          errmsg,
          data,
        },
      } = yield call(articleList, payload)

      if (errcode === 1) {
        yield put({
          type: 'saveArticleList',
          articleDataList: data.list,
        })
        yield put({
          type: 'saveArticleListPagination',
          articleListPagination: data.pagination,
        })
      } else {
        message.error(errmsg)
      }
    },
    *postArticleDetail({ payload, message }, { call, put }) {
      const {
        data: {
          errcode,
          data,
        },
      } = yield call(articleDetail, payload)

      if (errcode === 1) {
        yield put({
          type: 'savaArticleDetail',
          articleDetails: data,
        })
      }
    },
    *postCollectArticle({ payload, message, replace, nextPathname }, { call, put }) {
      const {
        data: {
          errcode,
          errmsg,
        },
      } = yield call(articleCollect, payload)

      if (errcode === 1) {
        yield put({
          type: 'postArticleDetail',
        })
        message.success(errmsg)
      } else if (errcode === 100) {
        message.error(errmsg, 1.5, () => {
          // browserHistory.pushState(history,'/account/login')
          replace({
            pathname: '/account/login',
            state: {
              nextPathname,
            },
          })
        })
      }
    },
    *postCancelCollectArticle({ payload, message }, { call, put }) {
      const {
        data: {
          errcode,
          errmsg,
        },
      } = yield call(articleCancel, payload)

      if (errcode === 1) {
        yield put({
          type: 'postArticleDetail',
        })
        message.success(errmsg)
      } else {
        message.error(errmsg)
      }
    },
    *postDeleteArticle({ payload, message }, { call, put }) {
      const {
        data: {
          errcode,
          errmsg,
        },
      } = yield call(articleDelete, payload)

      if (errcode === 1) {
        yield put({
          type: 'postArticleList',
          payload: {
            id: Auth.getInfo().id,
          },
        })
        message.success(errmsg)
      } else {
        message.error(errmsg)
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/article/list') {
          dispatch({ type: 'postArticleList' })
        }
      })
    },
    articledetail({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/article/detail') {
          dispatch({
            type: 'postArticleDetail',
            payload: {
              token: Auth.getToken(),
              ...query,
            },
          })
        }
      })
    },
  },
}
