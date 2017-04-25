import qs from 'qs'
import request from '../utils/request'

import {
  API_LOGIN,
} from '../config/api'

export async function userLogin(params) {
  return request(`${API_LOGIN}?${qs.stringify(params)}`, {
    method: 'POST',
  })
}
