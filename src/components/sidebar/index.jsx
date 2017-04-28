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
  URL_USER_INFO,
  URL_USER_VIDEO,
  URL_USER_ARTICLE,
  URL_USER_LIKE,
  URL_USER_COMMENT,
  URL_USER_CHANGEPWD,
} from '../../config/web'

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
          <Link to={URL_USER_INFO}><Icon type='user' />我的资料</Link>
        </MenuItem>
        <MenuItem key='2'>
          <Link to={URL_USER_VIDEO}><Icon type='video-camera' />我的视频</Link>
        </MenuItem>
        <MenuItem key='3'>
          <Link to={URL_USER_ARTICLE}><Icon type='file-text' />我的文章</Link>
        </MenuItem>
        <MenuItem key='4'>
          <Link to={URL_USER_COMMENT}><Icon type='message' />我的评论</Link>
        </MenuItem>
        <MenuItem key='5'>
          <Link to={URL_USER_LIKE}><Icon type='heart-o' />我的关注</Link>
        </MenuItem>
        <MenuItem key='6'>
          <Link to={URL_USER_CHANGEPWD}><Icon type='lock' />修改密码</Link>
        </MenuItem>
      </Menu>
    )
  }
}

export default SideBar
