import qs from 'qs'
import request from '../utils/request'

import {
  API_MESSAGE_LIST,
  API_MESSAGE_READ,
  API_MESSAGE_DELETE,
} from '../config/api'

// 3.5.1 消息列表
export async function messageList(params) {
  return request(`${API_MESSAGE_LIST}?${qs.stringify(params)}`, {
    method: 'POST',
  })
}

// 3.5.2 阅读消息
export async function messageRead(params) {
  return request(`${API_MESSAGE_READ}?${qs.stringify(params)}`, {
    method: 'POST',
  })
}

// 3.5.3 删除消息
export async function messageDelete(params) {
  return request(`${API_MESSAGE_DELETE}?${qs.stringify(params)}`, {
    method: 'POST',
  })
}
