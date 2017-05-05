import React from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'

import {
  Breadcrumb,
} from 'antd'

import {
  URL_HOME,
} from '../../../config/web'

import BasicLayout from '../../../components/layout/basic'
import VideoForm from './video-form'

class ReleaseVideo extends React.Component {
  render() {
    const {
      dispatch,
    } = this.props

    return (
      <BasicLayout>
        <Breadcrumb separator='>' style={{ marginBottom: '15px' }}>
          <Breadcrumb.Item><Link to={URL_HOME}>首页</Link></Breadcrumb.Item>
          <Breadcrumb.Item>发布视频</Breadcrumb.Item>
        </Breadcrumb>
        <VideoForm dispatch={dispatch} />
      </BasicLayout>
    )
  }
}

export default connect()(ReleaseVideo)
