import React from 'react'
import { Link } from 'dva/router'
import { connect } from 'dva'

import {
  Breadcrumb,
} from 'antd'

import {
  URL_HOME,
} from '../../../config/web'

import BasicLayout from '../../../components/layout/basic'

class VideoList extends React.Component {
  render() {
    return (
      <BasicLayout>
        <Breadcrumb separator='>' style={{ marginBottom: '15px' }}>
          <Breadcrumb.Item><Link to={URL_HOME}>首页</Link></Breadcrumb.Item>
          <Breadcrumb.Item>视频教程</Breadcrumb.Item>
        </Breadcrumb>
      </BasicLayout>
    )
  }
}

export default connect()(VideoList)
