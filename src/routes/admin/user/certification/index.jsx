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
import ConfirmForm from './confirm'

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
              <a style={{ marginRight: 8 }} onClick={() => { this.handleCertification(text, 4) }}>通过</a>
              <a style={{ marginRight: 8 }} onClick={() => { this.handleCertification(text, 3) }}>不通过</a>
            </span>
          )
        },
      },
    ]

    this.labelSpan = 8
    this.wrapperSpan = 16
    this.gutter = 16
  }
  handleCertification = (id, result) => {
    const {
      dispatch,
    } = this.props

    if (result === 4) {
      dispatch({
        type: 'admin/userCertification',
        payload: {
          id,
          result,
          token: adminAuth.getToken(),
        },
        message,
        success: this.reloadUserCertificationList,
      })
    } else {
      this.id = id
      this.result = result
      dispatch({ type: 'admin/openCertificationConfirmModal' })
    }
  }
  handleCertificationNo = (data) => {
    this.props.dispatch({
      type: 'admin/userCertification',
      payload: {
        id: this.id,
        result: this.result,
        token: adminAuth.getToken(),
        ...data,
      },
      message,
      success: this.reloadUserCertificationList,
    })
  }
  closeCertificationConfirmModal = () => {
    this.props.dispatch({
      type: 'admin/closeCertificationConfirmModal',
    })
  }
  reloadUserCertificationList = () => {
    const {
      dispatch,
      admin: {
        userCertificationPagination,
        userCertificationOptions,
      },
    } = this.props

    dispatch({
      type: 'admin/fetchUserCertificationList',
      payload: {
        ...userCertificationOptions,
        ...userCertificationPagination,
        token: adminAuth.getToken(),
      },
    })
  }
  viewUserDetail = (index) => {
    this.props.dispatch({
      type: 'admin/saveUserCertificationDetailByIndex',
      index,
    })
  }
  closeUserDetailModal = () => {
    this.props.dispatch({ type: 'admin/clearUserCertificationDetail' })
  }
  handleFilterSubmit = (data) => {
    this.props.dispatch({
      type: 'admin/fetchUserCertificationList',
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
      type: 'admin/fetchUserCertificationList',
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
        userCertificationList,
        userCertificationPagination,
        isDisplayUserCertificationDetailModal,
        isDisplayCertificationConfirmModal,
        userCertificationDetail: {
          account,
          nickname,
          avatar,
          summary,
          created_at: createdAt,
          card_number: cardNumber,
          card_front_image: cardFrontImage,
          card_back_image: cardBackImage,
        },
      },
    } = this.props

    return (
      <div>
        <ConfirmForm
          visible={isDisplayCertificationConfirmModal}
          onCancel={this.closeCertificationConfirmModal}
          onOk={this.handleCertificationNo}
        />
        <Modal
          title={`用户 ${nickname} 的详细资料`}
          visible={isDisplayUserCertificationDetailModal}
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
                <img src={cardFrontImage} className={styles.avatar} alt={cardFrontImage} />
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
                <img src={cardBackImage} className={styles.avatar} alt={cardBackImage} />
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
            ...userCertificationPagination,
            onChange: this.handleChangePage,
          }}
          dataSource={userCertificationList}
        />
      </div>
    )
  }
}

export default connect((state) => {
  return state
})(AdminArticleIndex)
