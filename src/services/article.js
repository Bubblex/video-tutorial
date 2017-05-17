import qs from 'qs'
import request from '../utils/request'

import {
  API_ARTICLE_TYPE,
  API_ARTICLE_LIST,
  API_ARTICLE_DETAIL,
  API_ARTICLE_COLLECT,
  API_ARTICLE_CANCEL,
  API_ARTICLE_RELEASE,
  API_ARTICLE_DELETE,
  API_USER_RECOMMEND,
} from '../config/api'

// 3.3.1获取文章分类
export async function articleType(params) {
  return request(`${API_ARTICLE_TYPE}?${qs.stringify(params)}`, {
    method: 'POST',
  })
}

// 3.3.2文章列表
export async function articleList(params) {
  return request(`${API_ARTICLE_LIST}?${qs.stringify(params)}`, {
    method: 'POST',
  })
}

// 3.3.3获取文章详情
export async function articleDetail(params) {
  return request(`${API_ARTICLE_DETAIL}?${qs.stringify(params)}`, {
    method: 'POST',
  })
}

// 3.3.4收藏文章
export async function articleCollect(params) {
  return request(`${API_ARTICLE_COLLECT}?${qs.stringify(params)}`, {
    method: 'POST',
  })
}

// 3.3.5取消收藏文章
export async function articleCancel(params) {
  return request(`${API_ARTICLE_CANCEL}?${qs.stringify(params)}`, {
    method: 'POST',
  })
}

// 3.3.6发布一篇文章
export async function articleRelease(params) {
  return request(`${API_ARTICLE_RELEASE}`, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

// 3.3.7 删除一篇文章
export async function articleDelete(params) {
  return request(`${API_ARTICLE_DELETE}?${qs.stringify(params)}`, {
    method: 'POST',
  })
}

// 3.3.8 文章发布数推荐用户
export async function userRecommend(params) {
  return request(`${API_USER_RECOMMEND}?${qs.stringify(params)}`, {
    method: 'POST',
  })
}

