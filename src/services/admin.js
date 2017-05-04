import qs from 'qs'
import request from '../utils/request'

import {
  API_ADMIN_LOGIN,
  API_ADMIN_FETCH_USER_LIST,
  API_ADMIN_DISABLE_USER,
  API_ADMIN_FETCH_ARTICLE_LIST,
  API_ADMIN_DISABLE_ARTICLE,
} from '../config/api'


/**
 * 管理员用户登录
 *
 * @export
 * @param {any} params
 * @returns
 */
export async function adminLogin(params) {
  return request(`${API_ADMIN_LOGIN}?${qs.stringify(params)}`, {
    method: 'POST',
  })
}

/**
 * 获取用户列表
 *
 * @export
 * @param {any} params
 * @returns
 */
export async function fetchUserList(params) {
  return request(`${API_ADMIN_FETCH_USER_LIST}?${qs.stringify(params)}`, {
    method: 'POST',
  })
}

/**
 * 禁用用户
 *
 * @export
 * @param {any} params
 * @returns
 */
export async function disableUser(params) {
  return request(`${API_ADMIN_DISABLE_USER}?${qs.stringify(params)}`, {
    method: 'POST',
  })
}

/**
 * 获取文章列表
 *
 * @export
 * @param {any} params
 * @returns
 */
export async function fetchArticleList(params) {
  return request(`${API_ADMIN_FETCH_ARTICLE_LIST}?${qs.stringify(params)}`, {
    method: 'POST',
  })
}


/**
 * 启用 / 禁用文章
 *
 * @export
 * @param {any} params
 * @returns
 */
export async function disableArticle(params) {
  return request(`${API_ADMIN_DISABLE_ARTICLE}?${qs.stringify(params)}`, {
    method: 'POST',
  })
}
