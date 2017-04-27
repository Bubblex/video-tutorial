import qs from 'qs'
import request from '../utils/request'

import {
  API_USER_INFO,
  API_APPLY_LECTURER,
  API_USER_BASIC,
  API_ACCOUNT_UPDATE,
  API_STARS,
  API_FOLLOWERS,
  API_FOLLOW,
  API_UNFOLLOW,
} from '../config/api'

// 3.1.1用户完整信息
export async function userInfo(params) {
  return request(`${API_USER_INFO}?${qs.stringify(params)}`, {
    method: 'POST',
  })
}

// 3.1.2申请成为讲师
export async function userApplyLecturer(params) {
  return request(`${API_APPLY_LECTURER}?${qs.stringify(params)}`, {
    method: 'POST',
  })
}

// 3.1.3获取用户公开数据
export async function userUserBasic(params) {
  return request(`${API_USER_BASIC}?${qs.stringify(params)}`, {
    method: 'POST',
  })
}

// 3.1.4修改个人资料
export async function userAccountUpdata(params) {
  return request(`${API_ACCOUNT_UPDATE}?${qs.stringify(params)}`, {
    method: 'POST',
  })
}

// 3.2.1关注列表
export async function userStars(params) {
  return request(`${API_STARS}?${qs.stringify(params)}`, {
    method: 'POST',
  })
}

// 3.2.2粉丝列表
export async function userFollowers(params) {
  return request(`${API_FOLLOWERS}?${qs.stringify(params)}`, {
    method: 'POST',
  })
}

// 3.2.3关注某个用户
export async function userFollow(params) {
  return request(`${API_FOLLOW}?${qs.stringify(params)}`, {
    method: 'POST',
  })
}

// 3.2.4取消关注某个用户
export async function userUnfollow(params) {
  return request(`${API_UNFOLLOW}?${qs.stringify(params)}`, {
    method: 'POST',
  })
}
