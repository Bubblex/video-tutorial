import { browserHistory } from 'dva/router'

import {
  articleList,
  articleDetail,
  articleCollect,
  articleCancel,
  articleRelease,
  articleDelete,
  userRecommend,
} from '../services/article'

import Auth from '../utils/auth.js'

export default {
  namespace: 'article',
  state: {
    articleDataList: [],
    articleListPagination: [],
    CheckArticleType: 0,
    articleDetails: {
      article_author: {},
    },
    articleContent: '',
    userRecommendList: [],
    articleFileList: [],
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
    saveArticleFileList(state, { articleFileList }) {
      return {
        ...state,
        articleFileList,
      }
    },
    saveArticleContent(state, { articleContent }) {
      return {
        ...state,
        articleContent,
      }
    },
    saveUserCommend(state, { userRecommendList }) {
      return {
        ...state,
        userRecommendList,
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
        yield put({
          type: 'saveArticleFileList',
          articleFileList: [{
            uid: -1,
            status: 'done',
            url: data.cover,
          }],
        })
      }
    },
    *postCollectArticle({ payload, message, replace, nextPathname }, { call }) {
      const {
        data: {
          errcode,
          errmsg,
        },
      } = yield call(articleCollect, payload)

      if (errcode === 1) {
        message.success(errmsg)
      } else if (errcode === 100) {
        message.error(errmsg, 1.5, () => {
          replace({
            pathname: '/account/login',
            state: {
              nextPathname,
            },
          })
        })
      } else {
        message.error(errmsg)
      }
    },
    *postCancelCollectArticle({ payload, message }, { call }) {
      const {
        data: {
          errcode,
          errmsg,
        },
      } = yield call(articleCancel, payload)

      if (errcode === 1) {
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
    *postUserRecommend({ payload }, { call, put }) {
      const {
        data: {
          errcode,
          data,
        },
      } = yield call(userRecommend, payload)

      if (errcode === 1) {
        yield put({
          type: 'saveUserCommend',
          userRecommendList: data,
        })
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/article/list') {
          dispatch({ type: 'postArticleList' })
          dispatch({ type: 'postUserRecommend' })
        } else if (pathname === '/') {
          dispatch({
            type: 'postArticleList',
            payload: {
              pageSize: 5,
            },
          })
        } else if (pathname === '/article/detail') {
          dispatch({
            type: 'postArticleDetail',
            payload: {
              token: Auth.getToken(),
              ...query,
            },
          })
        } else if (pathname === '/release/article' && query.id !== undefined) {
          dispatch({
            type: 'postArticleDetail',
            payload: {
              token: Auth.getToken(),
              ...query,
            },
          })
        } else if (pathname === '/release/article' && query.id === undefined) {
          dispatch({
            type: 'savaArticleDetail',
            articleDetails: {
              article_author: {},
            },
          })
          dispatch({
            type: 'saveArticleFileList',
            articleFileList: [],
          })
          dispatch({
            type: 'saveArticleContent',
            articleContent: '',
          })
        }
      })
    },
  },
}
