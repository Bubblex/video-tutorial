import React from 'react'
import { connect } from 'dva'

import {
  Table,
  message,
} from 'antd'

import FilterForm from './filter'

import adminAuth from '../../../../utils/adminAuth'

class AdminVideoIndex extends React.Component {
  constructor(props) {
    super(props)

    this.USER_TABLE_COLUMNS = [
      {
        title: '编号',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '视频标题',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: '作者',
        dataIndex: 'video_author',
        key: 'video_author',
        render(text) {
          return text.nickname
        },
      },
      {
        title: '发布时间',
        dataIndex: 'created_at',
        key: 'created_at',
      },
      {
        title: '播放数',
        dataIndex: 'play_num',
        key: 'play_num',
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
              <a style={{ marginRight: 8 }} onClick={() => { this.openArticleDetailModal(index) }}>查看</a>
              <a style={{ marginRight: 8 }} onClick={() => { this.handleDisable(text, row.status === 1 ? 2 : 1, index) }}>{row.status === 1 ? '禁用' : '启用'}</a>
            </span>
          )
        },
      },
    ]
  }
  handleDisable(id, disable, index) {
    this.props.dispatch({
      type: 'admin/disableVideo',
      payload: {
        id,
        disable,
        token: adminAuth.getToken(),
      },
      index,
      message,
    })
  }
  handlePageChange = (page) => {
    const {
      dispatch,
      admin: {
        videoOptions,
      },
    } = this.props

    dispatch({
      type: 'admin/fetchVideoList',
      payload: {
        ...videoOptions,
        page,
        token: adminAuth.getToken(),
      },
      message,
    })
  }
  handleFilterSubmit = (data) => {
    this.props.dispatch({
      type: 'admin/fetchVideoList',
      payload: {
        ...data,
        token: adminAuth.getToken(),
      },
      message,
    })
  }
  render() {
    const {
      admin: {
        videoList,
        videoPagination,
      },
    } = this.props

    return (
      <div>
        <FilterForm onSubmit={this.handleFilterSubmit} />
        <Table
          rowKey='id'
          columns={this.USER_TABLE_COLUMNS}
          dataSource={videoList}
          pagination={{
            ...videoPagination,
            onChange: this.handlePageChange,
          }}
        />
      </div>
    )
  }
}

export default connect((state) => {
  return state
})(AdminVideoIndex)
