import {
  articleType,
  articleList,
  articleDetail,
  articleCollect,
  articleCancel,
  articleRelease,
} from '../services/article'

export default {
  namespace: 'article',
  state: {
    articleDataList: [],
    articleListPagination: [],
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
        message.success(errmsg)
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
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/article/list') {
          dispatch({ type: 'postArticleList' })
        }
      })
    },
  },
}
