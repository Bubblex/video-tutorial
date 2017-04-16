
import React from 'react'
import { Link } from 'dva/router'

import {
  Icon,
  Menu,
} from 'antd'

import {
  SIDER_WIDTH,
} from '../../config'

import {
  URL_ADMIN_USER,
  URL_ADMIN_ARTICLE,
  URL_ADMIN_VIDEO,
  URL_ADMIN_COMMENT_VIDEO,
} from '../../config/web'

const { Item: MenuItem } = Menu

class AdminSideBar extends React.Component {
  render() {
    return (
      <Menu
        style={{ width: SIDER_WIDTH }}
        mode='inline'
        theme='dark'
        defaultSelectedKeys={['1']}
      >
        <MenuItem key='1'>
          <Link to={URL_ADMIN_USER}><Icon type='user' />用户管理</Link>
        </MenuItem>
        <MenuItem key='2'>
          <Link to={URL_ADMIN_VIDEO}><Icon type='video-camera' />视频管理</Link>
        </MenuItem>
        <MenuItem key='3'>
          <Link to={URL_ADMIN_ARTICLE}><Icon type='file-text' />文章管理</Link>
        </MenuItem>
        <MenuItem key='4'>
          <Link to={URL_ADMIN_COMMENT_VIDEO} ><Icon type='message' />评论管理</Link>
        </MenuItem>
      </Menu>
    )
  }
}

export default AdminSideBar
