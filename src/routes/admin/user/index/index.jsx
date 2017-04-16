import React from 'react'
import { connect } from 'dva'

import {
  Table,
} from 'antd'

import AdminLayout from '../../../../components/layout/admin'

function generateUserTableData(total) {
  const result = []
  for (let i = 1; i <= total; i += 1) {
    result.push({
      id: i,
      account: `account_${i}`,
      username: `用户昵称_${i}`,
      telephone: '15152111111',
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
    title: '用户名',
    dataIndex: 'account',
    key: 'account',
  },
  {
    title: '昵称',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '联系方式',
    dataIndex: 'telephone',
    key: 'telephone',
  },
  {
    title: '操作',
    dataIndex: 'id',
    key: 'options',
    render() {
      return (
        <span>
          <a style={{ marginRight: 8 }}>查看</a>
          <a style={{ marginRight: 8 }}>禁用</a>
        </span>
      )
    },
  },
]

const USER_TABLE_DATA = generateUserTableData(100)

const breadcrumb = [
  {
    text: '用户管理',
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
