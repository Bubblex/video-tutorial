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

class SideBar extends React.Component {
  render() {
    return (
      <Menu
        style={{ width: SIDER_WIDTH }}
        mode='inline'
        theme='dark'
      >
        <MenuItem key='1'>
          <Link><Icon type='user' />我的资料</Link>
        </MenuItem>
        <MenuItem key='2'>
          <Link><Icon type='video-camera' />我的视频</Link>
        </MenuItem>
        <MenuItem key='3'>
          <Link><Icon type='file-text' />我的文章</Link>
        </MenuItem>
        <MenuItem key='4'>
          <Link><Icon type='message' />我的评论</Link>
        </MenuItem>
        <MenuItem key='5'>
          <Link><Icon type='heart-o' />我的关注</Link>
        </MenuItem>
      </Menu>
    )
  }
}

export default SideBar
