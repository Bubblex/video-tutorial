import React from 'react'
import { connect } from 'dva'

import {
  Table,
  message,
} from 'antd'

import FilterForm from './filter'

import adminAuth from '../../../../utils/adminAuth'

class AdminArticleIndex extends React.Component {
  constructor(props) {
    super(props)

    this.USER_TABLE_COLUMNS = [
      {
        title: '编号',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '文章标题',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: '作者',
        dataIndex: 'article_author',
        key: 'article_author',
        render(text) {
          return text.nickname
        },
      },
      {
        title: '文章类型',
        dataIndex: 'type',
        key: 'type',
        render(text) {
          return text.type_name
        },
      },
      {
        title: '发布时间',
        dataIndex: 'created_at',
        key: 'created_at',
      },
      {
        title: '阅读量',
        dataIndex: 'read_num',
        key: 'read_num',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render(text) {
          return text === 1 ? '正常' : '已禁用'
        },
      },
      {
        title: '操作',
        dataIndex: 'id',
        key: 'options',
        render: (text, row, index) => {
          return (
            <span>
              <a style={{ marginRight: 8 }}>查看</a>
              <a style={{ marginRight: 8 }} onClick={() => { this.handleDisable(text, row.status === 1 ? 2 : 1, index) }}>{row.status === 1 ? '禁用' : '启用'}</a>
            </span>
          )
        },
      },
    ]
  }
  handleDisable = (id, disable, index) => {
    this.props.dispatch({
      type: 'admin/disableArticle',
      payload: {
        id,
        disable,
        token: adminAuth.getToken(),
      },
      index,
      message,
    })
  }
  handleFilterSubmit = (data) => {
    this.props.dispatch({
      type: 'admin/fetchArticleList',
      payload: {
        token: adminAuth.getToken(),
        ...data,
      },
    })
  }
  render() {
    const {
      admin: {
        articleList,
        articlePagination,
      },
    } = this.props

    return (
      <div>
        <FilterForm onSubmit={this.handleFilterSubmit} />
        <Table
          rowKey='id'
          columns={this.USER_TABLE_COLUMNS}
          pagination={articlePagination}
          dataSource={articleList}
        />
      </div>
    )
  }
}

export default connect((state) => {
  return state
})(AdminArticleIndex)
