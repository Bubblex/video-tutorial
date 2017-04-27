import qs from 'qs'
import request from '../utils/request'

import {
  API_USER_INFO,
  API_APPLY_LECTURER,
  API_USER_BASIC,
  API_ACCOUNT_UPDATE,
} from '../config/api'

export async function userInfo(params) {
  return request(`${API_USER_INFO}?${qs.stringify(params)}`, {
    method: 'POST',
  })
}

export async function userApplyLecturer(params) {
  return request(`${API_APPLY_LECTURER}?${qs.stringify(params)}`, {
    method: 'POST',
  })
}

export async function userUserBasic(params) {
  return request(`${API_USER_BASIC}?${qs.stringify(params)}`, {
    method: 'POST',
  })
}

export async function userAccountUpdata(params) {
  return request(`${API_ACCOUNT_UPDATE}?${qs.stringify(params)}`, {
    method: 'POST',
  })
}