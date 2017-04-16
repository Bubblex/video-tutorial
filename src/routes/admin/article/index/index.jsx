import React from 'react'
import { connect } from 'dva'
import moment from 'moment'

import {
  Table,
} from 'antd'

import AdminLayout from '../../../../components/layout/admin'

function generateUserTableData(total) {
  const result = []
  for (let i = 1; i <= total; i += 1) {
    result.push({
      id: i,
      title: `文章标题_${i}`,
      author: `文章作者_${i}`,
      release_time: moment().format('YYYY-MM-DD hh:mm:ss'),
      updated_time: moment().format('YYYY-MM-DD hh:mm:ss'),
    })
  }
  return result
}

const USER_TABLE_COLUMNS = [
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
    dataIndex: 'author',
    key: 'author',
  },
  {
    title: '发布时间',
    dataIndex: 'release_time',
    key: 'release_time',
  },
  {
    title: '最后修改时间',
    dataIndex: 'updated_time',
    key: 'updated_time',
  },
  {
    title: '操作',
    dataIndex: 'id',
    key: 'options',
    render() {
      return (
        <span>
          <a>查看</a>
          <a>禁用</a>
        </span>
      )
    },
  },
]

const USER_TABLE_DATA = generateUserTableData(100)

const breadcrumb = [
  {
    text: '文章管理',
  },
]

class AdminArticleIndex extends React.Component {
  render() {
    return (
      <AdminLayout breadcrumb={breadcrumb}>
        <Table rowKey='id' columns={USER_TABLE_COLUMNS} pagination={{ pageSize: 5 }} dataSource={USER_TABLE_DATA} />
      </AdminLayout>
    )
  }
}

export default connect()(AdminArticleIndex)
