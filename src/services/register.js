import qs from 'qs'
import request from '../utils/request'

import {
  API_REGISTER,
  API_LOGIN,
  API_ACCOUNT_RESET,
} from '../config/api'

export async function userRegister(params) {
  return request(`${API_REGISTER}?${qs.stringify(params)}`, {
    method: 'POST',
  })
}

export async function userLogin(params) {
  return request(`${API_LOGIN}?${qs.stringify(params)}`, {
    method: 'POST',
  })
}

export async function changePwd(params) {
  return request(`${API_ACCOUNT_RESET}?${qs.stringify(params)}`, {
    method: 'POST',
  })
}

