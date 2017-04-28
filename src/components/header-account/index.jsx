import React from 'react'
import { Link } from 'dva/router'
import Cookies from 'js-cookie'

import {
  Menu,
} from 'antd'

import {
  URL_LOGIN,
  URL_REGISTER,
  URL_USER_INFO,
} from '../../config/web'

import {
  DEFAULT_AVATAR,
  DEFAULT_USERNAME,
} from '../../config'


import styles from './header-account.less'

import Auth from '../../utils/auth'

const { Item: MenuItem } = Menu

/**
 * 头部的登录状态组件
 * 共有两种状态
 * 1: 已登录
 * 2: 未登录
 *
 * @class HeaderAccount
 * @extends {React.Component}
 * @param {Number} status 登录状态 1: 未登录 2: 已登录
 * @example
 * <HeaderAccount status />
 */
class HeaderAccount extends React.Component {
  static defaultProps = {
    avatar: DEFAULT_AVATAR,
    nickname: DEFAULT_USERNAME,
  }

  handleExitLogin = () => {
    Cookies.remove('token')
    localStorage.removeItem('info')
  }

  render() {
    const info = Auth.getInfo()
    const status = info === null ? 1 : 2
    const avatar = info.avatar === null ? DEFAULT_AVATAR : info.avatar

    return (
      <div className={styles.headerAccount}>
        {
          status === 1
          &&
          <Menu
            theme='dark'
            mode='horizontal'
            style={{ lineHeight: '64px' }}
          >
            <MenuItem key='1' style={{ padding: '0 8px' }}>
              <Link to={URL_LOGIN}>登录</Link>
            </MenuItem>
            <MenuItem key='2' style={{ padding: '0 8px' }}>
              <Link to={URL_REGISTER}>注册</Link>
            </MenuItem>
          </Menu>
        }
        {
          status === 2
          &&
          <Menu
            theme='dark'
            mode='horizontal'
            style={{ lineHeight: '64px' }}
          >
            <MenuItem key='1' style={{ padding: '0 8px' }}>
              <img src={avatar} alt={info.nickname} className={styles.avatar} />
            </MenuItem>
            <MenuItem key='2' style={{ padding: '0 8px' }}>
              <Link to={URL_USER_INFO}>{info.nickname}</Link>
            </MenuItem>
            <MenuItem key='3' style={{ padding: '0 8px' }}>
              <Link
                to={URL_LOGIN}
                onClick={this.handleExitLogin}
              >
                退出登录
              </Link>
            </MenuItem>
          </Menu>
        }
      </div>
    )
  }
}

export default HeaderAccount
