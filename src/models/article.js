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
  },
  reducers: {
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
  },
}
