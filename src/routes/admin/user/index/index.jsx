import React from 'react'
import { connect } from 'dva'

import {
  Row,
  Col,
  Table,
  Modal,
  message,
} from 'antd'

import FilterForm from './filter'

import adminAuth from '../../../../utils/adminAuth'

import {
  DEFAULT_AVATAR,
} from '../../../../config'

import styles from './user.less'

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
        title: '用户名',
        dataIndex: 'account',
        key: 'account',
      },
      {
        title: '昵称',
        dataIndex: 'nickname',
        key: 'nickname',
      },
      {
        title: '用户角色',
        dataIndex: 'role',
        key: 'role',
        render(text) {
          return text.role_name
        },
      },
      {
        title: '用户状态',
        dataIndex: 'status',
        key: 'status',
        render(text) {
          return text === 1 ? '正常' : '已禁用'
        },
      },
      {
        title: '注册时间',
        dataIndex: 'created_at',
        key: 'created_at',
      },
      {
        title: '操作',
        dataIndex: 'id',
        key: 'options',
        render: (text, data, index) => {
          return (
            <span>
              <a style={{ marginRight: 8 }} onClick={() => { this.viewUserDetail(index) }}>查看</a>
              {
                data.role_id !== 3
                &&
                <a style={{ marginRight: 8 }} onClick={() => { this.disableUser(text, data.status === 1 ? 2 : 1, index) }}>{data.status === 1 ? '禁用' : '启用'}</a>
              }
            </span>
          )
        },
      },
    ]

    this.labelSpan = 8
    this.wrapperSpan = 16
    this.gutter = 16
  }
  disableUser(id, disable, index) {
    this.props.dispatch({
      type: 'admin/disableUser',
      payload: {
        id,
        disable,
        token: adminAuth.getToken(),
      },
      index,
      message,
    })
  }
  viewUserDetail = (index) => {
    this.props.dispatch({
      type: 'admin/saveUserDetailByIndex',
      index,
    })
  }
  closeUserDetailModal = () => {
    this.props.dispatch({ type: 'admin/clearUserDetail' })
  }
  handleFilterSubmit = (data) => {
    this.props.dispatch({
      type: 'admin/fetchUserList',
      payload: {
        token: adminAuth.getToken(),
        ...data,
      },
    })
  }
  handleChangePage = (page) => {
    const {
      dispatch,
      admin: {
        userOptions,
      },
    } = this.props

    dispatch({
      type: 'admin/fetchUserList',
      payload: {
        ...userOptions,
        token: adminAuth.getToken(),
        page,
      },
    })
  }
  render() {
    const {
      admin: {
        userList,
        userPagination,
        isDisplayUserDetailModal,
        userDetail: {
          account,
          nickname,
          avatar,
          role: {
            role_name: roleName,
          },
          summary,
          created_at: createdAt,
          card_number: cardNumber,
          card_front_image: cardFrontImage,
          card_back_image: cardBackImage,
          authentication,
        },
      },
    } = this.props

    return (
      <div>
        <Modal
          title={`用户 ${nickname} 的详细资料`}
          visible={isDisplayUserDetailModal}
          onOk={this.closeUserDetailModal}
          onCancel={this.closeUserDetailModal}
        >
          <Row gutter={this.gutter} className={styles.line}>
            <Col span={this.labelSpan} className={styles.label}>
              账户：
            </Col>
            <Col span={this.wrapperSpan}>
              <span>{account}</span>
            </Col>
          </Row>
          <Row gutter={this.gutter} className={styles.line}>
            <Col span={this.labelSpan} className={styles.label}>
              头像：
            </Col>
            <Col span={this.wrapperSpan}>
              <img src={avatar || DEFAULT_AVATAR} className={styles.avatar} alt={nickname} />
            </Col>
          </Row>
          <Row gutter={this.gutter} className={styles.line}>
            <Col span={this.labelSpan} className={styles.label}>
              昵称：
            </Col>
            <Col span={this.wrapperSpan}>
              <span>{nickname}</span>
            </Col>
          </Row>
          <Row gutter={this.gutter} className={styles.line}>
            <Col span={this.labelSpan} className={styles.label}>
              角色：
            </Col>
            <Col span={this.wrapperSpan}>
              <span>{roleName}</span>
            </Col>
          </Row>
          {
            summary
            &&
            <Row gutter={this.gutter} className={styles.line}>
              <Col span={this.labelSpan} className={styles.label}>
                个人简介：
              </Col>
              <Col span={this.wrapperSpan}>
                <span>{summary}</span>
              </Col>
            </Row>
          }
          <Row gutter={this.gutter} className={styles.line}>
            <Col span={this.labelSpan} className={styles.label}>
              账户状态：
            </Col>
            <Col span={this.wrapperSpan}>
              <span>{status === 1 ? '正常' : '已禁用'}</span>
            </Col>
          </Row>
          {
            authentication > 1
            &&
            <Row gutter={this.gutter} className={styles.line}>
              <Col span={this.labelSpan} className={styles.label}>
                讲师认证状态
              </Col>
              <Col span={this.wrapperSpan}>
                <span>
                  {authentication === 2 && '认证中'}
                  {authentication === 3 && '认证失败'}
                  {authentication === 4 && '认证成功'}
                </span>
              </Col>
            </Row>
          }
          <Row gutter={this.gutter} className={styles.line}>
            <Col span={this.labelSpan} className={styles.label}>
              注册时间：
            </Col>
            <Col span={this.wrapperSpan}>
              <span>{createdAt}</span>
            </Col>
          </Row>
          {
            cardNumber
            &&
            <Row gutter={this.gutter} className={styles.line}>
              <Col span={this.labelSpan} className={styles.label}>
                身份证号：
              </Col>
              <Col span={this.wrapperSpan}>
                <span>{cardNumber}</span>
              </Col>
            </Row>
          }
          {
            cardFrontImage
            &&
            <Row gutter={this.gutter} className={styles.line}>
              <Col span={this.labelSpan} className={styles.label}>
                身份证正面照：
              </Col>
              <Col span={this.wrapperSpan}>
                <span>{cardFrontImage}</span>
              </Col>
            </Row>
          }
          {
            cardBackImage
            &&
            <Row gutter={this.gutter} className={styles.line}>
              <Col span={this.labelSpan} className={styles.label}>
                身份证背面照：
              </Col>
              <Col span={this.wrapperSpan}>
                <span>{cardBackImage}</span>
              </Col>
            </Row>
          }
        </Modal>
        <div className={styles.filter}>
          <FilterForm onSubmit={this.handleFilterSubmit} />
        </div>
        <Table
          rowKey='id'
          columns={this.USER_TABLE_COLUMNS}
          pagination={{
            ...userPagination,
            onChange: this.handleChangePage,
          }}
          dataSource={userList}
        />
      </div>
    )
  }
}

export default connect((state) => {
  return state
})(AdminArticleIndex)
