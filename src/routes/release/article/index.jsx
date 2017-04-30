import React from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'

import {
  Breadcrumb,
} from 'antd'

import BasicLayout from '../../../components/layout/basic'
import ArticleForm from './article-form'

import {
  URL_HOME,
} from '../../../config/web'

class ReleaseArticle extends React.Component {

  render() {
    return (
      <div>
        <BasicLayout>
          <Breadcrumb separator='>' style={{ marginBottom: '15px' }}>
            <Breadcrumb.Item><Link to={URL_HOME}>首页</Link></Breadcrumb.Item>
            <Breadcrumb.Item>发布资讯</Breadcrumb.Item>
          </Breadcrumb>
          <ArticleForm dispatch={this.props.dispatch} />
        </BasicLayout>
      </div>
    )
  }
}

export default connect()(ReleaseArticle)
