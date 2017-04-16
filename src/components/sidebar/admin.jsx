
import React from 'react'
import { Link } from 'dva/router'

import {
  Icon,
  Menu,
} from 'antd'

import {
  SIDER_WIDTH,
} from '../../config'

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
          <Link><Icon type='user' />用户管理</Link>
        </MenuItem>
        <MenuItem key='2'>
          <Link><Icon type='video-camera' />视频管理</Link>
        </MenuItem>
        <MenuItem key='3'>
          <Link><Icon type='file-text' />文章管理</Link>
        </MenuItem>
        <MenuItem key='4'>
          <Link><Icon type='message' />评论管理</Link>
        </MenuItem>
      </Menu>
    )
  }
}

export default AdminSideBar
