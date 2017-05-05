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

import styles from './video.less'

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
          const map = ['正常', '已禁用', '已删除', '待审核', '审核失败']
          return map[text - 1]
        },
      },
      {
        title: '操作',
        dataIndex: 'id',
        key: 'options',
        render: (text, row, index) => {
          return (
            <span>
              <a style={{ marginRight: 8 }} onClick={() => { this.openVideoDetailModal(index) }}>查看</a>
              <a style={{ marginRight: 8 }} onClick={() => { this.handleDisable(text, row.status === 1 ? 2 : 1, index) }}>{row.status === 1 ? '禁用' : '启用'}</a>
            </span>
          )
        },
      },
    ]

    this.labelSpan = 8
    this.wrapperSpan = 16
    this.gutter = 16
  }
  openVideoDetailModal = (index) => {
    this.props.dispatch({
      type: 'admin/openVideoDetailModal',
      index,
    })
  }
  closeVideoDetailModal = () => {
    this.props.dispatch({ type: 'admin/closeVideoDetailModal' })
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
        videoDetail: {
          id,
          title,
          cover,
          video_author: {
            nickname,
          },
          summary,
          video_url: videoUrl,
          play_num: playNum,
          created_at: createdAt,
          status,
        },
        isDisplayVideoDetailModal,
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
        <Modal
          title={title}
          visible={isDisplayVideoDetailModal}
          onCancel={this.closeVideoDetailModal}
          onOk={this.closeVideoDetailModal}
        >
          <Row gutter={this.gutter} className={styles.line}>
            <Col span={this.labelSpan} className={styles.label}>
              编号：
            </Col>
            <Col span={this.wrapperSpan}>
              <span>{id}</span>
            </Col>
          </Row>
          <Row gutter={this.gutter} className={styles.line}>
            <Col span={this.labelSpan} className={styles.label}>
              标题：
            </Col>
            <Col span={this.wrapperSpan}>
              <span>{title}</span>
            </Col>
          </Row>
          <Row gutter={this.gutter} className={styles.line}>
            <Col span={this.labelSpan} className={styles.label}>
              作者：
            </Col>
            <Col span={this.wrapperSpan}>
              <span style={{ marginBottom: 5 }}>{nickname}</span>
            </Col>
          </Row>
          <Row gutter={this.gutter} className={styles.line}>
            <Col span={this.labelSpan} className={styles.label}>
              播放数：
            </Col>
            <Col span={this.wrapperSpan}>
              <span>{playNum}</span>
            </Col>
          </Row>
          <Row gutter={this.gutter} className={styles.line}>
            <Col span={this.labelSpan} className={styles.label}>
              状态：
            </Col>
            <Col span={this.wrapperSpan}>
              <span>
                {status === 1 && '正常'}
                {status === 2 && '已禁用'}
              </span>
            </Col>
          </Row>
          <Row gutter={this.gutter} className={styles.line}>
            <Col span={this.labelSpan} className={styles.label}>
              发布时间：
            </Col>
            <Col span={this.wrapperSpan}>
              <span>{createdAt}</span>
            </Col>
          </Row>
          <Row gutter={this.gutter} className={styles.line}>
            <Col span={this.labelSpan} className={styles.label}>
              封面图：
            </Col>
            <Col span={this.wrapperSpan}>
              <img src={cover} alt={title} className={styles.cover} />
            </Col>
          </Row>
          <Row gutter={this.gutter} className={styles.line}>
            <Col span={this.labelSpan} className={styles.label}>
              简介：
            </Col>
            <Col span={this.wrapperSpan}>
              <span>{summary}</span>
            </Col>
          </Row>
          <Row gutter={this.gutter} className={styles.line}>
            <Col span={this.labelSpan} className={styles.label}>
              视频：
            </Col>
            <Col span={this.wrapperSpan}>
              <span>{videoUrl}</span>
            </Col>
          </Row>
        </Modal>
      </div>
    )
  }
}

export default connect((state) => {
  return state
})(AdminVideoIndex)
