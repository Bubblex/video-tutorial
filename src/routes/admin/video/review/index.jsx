import React from 'react'
import { connect } from 'dva'

import {
  Row,
  Col,
  Table,
  Modal,
  message,
} from 'antd'
import { Player } from 'video-react'

import FilterForm from './filter'
import ReviewForm from './confirm'

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
              <a style={{ marginRight: 8 }} onClick={() => { this.reviewVideo(text, 1) }}>通过</a>
              <a style={{ marginRight: 8 }} onClick={() => { this.reviewVideo(text, 5) }}>不通过</a>
            </span>
          )
        },
      },
    ]

    this.labelSpan = 8
    this.wrapperSpan = 16
    this.gutter = 16
  }
  reviewVideo = (id, result) => {
    const {
      dispatch,
    } = this.props

    if (result === 1) {
      dispatch({
        type: 'admin/reviewVideo',
        payload: {
          id,
          result,
          token: adminAuth.getToken(),
        },
        message,
        success: this.reloadReviewVideoList,
      })
    } else {
      this.id = id
      this.result = result
      dispatch({ type: 'admin/openVideoReviewDetailModal' })
    }
  }
  closeVideoReviewConfirmModal = () => {
    this.props.dispatch({ type: 'admin/closeVideoReviewConfirmModal' })
  }
  reviewVideoNo = (data) => {
    this.props.dispatch({
      type: 'admin/reviewVideo',
      payload: {
        id: this.id,
        result: this.result,
        token: adminAuth.getToken(),
        ...data,
      },
      message,
      success: this.reloadReviewVideoList,
    })
  }
  reloadReviewVideoList = () => {
    const {
      dispatch,
      admin: {
        videoReviewOptions,
        videoReviewPagination,
      },
    } = this.props

    dispatch({
      type: 'admin/fetchVideoReviewList',
      payload: {
        ...videoReviewOptions,
        ...videoReviewPagination,
        token: adminAuth.getToken(),
      },
    })
  }
  openVideoDetailModal = (index) => {
    this.props.dispatch({
      type: 'admin/openVideoReviewConfirmModal',
      index,
    })
  }
  closeVideoDetailModal = () => {
    this.props.dispatch({ type: 'admin/closeVideoReviewDetailModal' })
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
      type: 'admin/fetchVideoReviewList',
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
      type: 'admin/fetchVideoReviewList',
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
        videoReviewList,
        videoReviewPagination,
        videoReviewDetail: {
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
        isDisplayVideoReviewDetailModal,
        isDisplayVideoReviewConfirmModal,
      },
    } = this.props

    return (
      <div>
        <ReviewForm
          visible={isDisplayVideoReviewConfirmModal}
          onCancel={this.closeVideoReviewConfirmModal}
          onOk={this.reviewVideoNo}
        />
        <FilterForm onSubmit={this.handleFilterSubmit} />
        <Table
          rowKey='id'
          columns={this.USER_TABLE_COLUMNS}
          dataSource={videoReviewList}
          pagination={{
            ...videoReviewPagination,
            onChange: this.handlePageChange,
          }}
        />
        <Modal
          title={title}
          visible={isDisplayVideoReviewDetailModal}
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
              <Player>
                <source src={videoUrl} />
              </Player>
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
