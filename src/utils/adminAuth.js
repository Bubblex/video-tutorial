
import Cookies from 'js-cookie'

export default {
  /**
   * 保存用户信息
   * @param {Object} info
   */
  setInfo(info) {
    localStorage.setItem('admin-info', JSON.stringify(info))
  },
  /**
   * 获取用户信息
   * @returns
   */
  getInfo() {
    return JSON.parse(localStorage.getItem('admin-info'))
  },
  /**
   * 更新用户信息
   * @param {Object} info
   * @returns
   */
  updateInfo(info) {
    const nextInfo = {
      ...this.getInfo,
      ...info,
    }
    localStorage.setItem(JSON.stringify(nextInfo))
    return nextInfo
  },
  setToken(token) {
    Cookies.set('token', token)
  },
  getToken() {
    return Cookies.get('token')
  },
}
