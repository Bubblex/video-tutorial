import qs from 'qs'
import request from '../utils/request'

import {
  API_VIDEO_LIST,
  API_VIDEO_DETAIL,
  API_VIDEO_COLLECT,
  API_VIDEO_CANCEL,
  API_VIDEO_RELEASE,
  API_VIDEO_DELETE,
  API_USER_RECOMMEND_CERTIFICATION,
} from '../config/api'

// 3.4.1视频列表
export async function videoList(params) {
  return request(`${API_VIDEO_LIST}?${qs.stringify(params)}`, {
    method: 'POST',
  })
}

// 3.4.2 视频详情
export async function videoDetail(params) {
  return request(`${API_VIDEO_DETAIL}?${qs.stringify(params)}`, {
    method: 'POST',
  })
}

// 3.4.3 收藏视频
export async function videoCollect(params) {
  return request(`${API_VIDEO_COLLECT}?${qs.stringify(params)}`, {
    method: 'POST',
  })
}

// 3.4.4 取消收藏视频
export async function videoCancel(params) {
  return request(`${API_VIDEO_CANCEL}?${qs.stringify(params)}`, {
    method: 'POST',
  })
}

// 3.4.5 发布 / 修改视频
export async function videoRelease(params) {
  return request(`${API_VIDEO_RELEASE}?${qs.stringify(params)}`, {
    method: 'POST',
  })
}

// 3.4.6 删除一条视频
export async function videoDelete(params) {
  return request(`${API_VIDEO_DELETE}?${qs.stringify(params)}`, {
    method: 'POST',
  })
}

// 3.4.7 视频发布数推荐讲师
export async function userCommendCertification(params) {
  return request(`${API_USER_RECOMMEND_CERTIFICATION}?${qs.stringify(params)}`, {
    method: 'POST',
  })
}
