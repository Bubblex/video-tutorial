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

import styles from './article.less'

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
              <a style={{ marginRight: 8 }} onClick={() => { this.openArticleDetailModal(index) }}>查看</a>
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
      message,
    })
  }
  handlePageChange = (page) => {
    const {
      dispatch,
      admin: {
        articleOptions,
      },
    } = this.props

    dispatch({
      type: 'admin/fetchArticleList',
      payload: {
        ...articleOptions,
        token: adminAuth.getToken(),
        page,
      },
      message,
    })
  }
  openArticleDetailModal = (index) => {
    this.props.dispatch({
      type: 'admin/openArticleDetailModal',
      index,
    })
  }
  closeArticleDetailModal = () => {
    this.props.dispatch({ type: 'admin/closeArticleDetailModal' })
  }
  render() {
    const {
      admin: {
        articleList,
        articlePagination,
        articleDetail: {
          id,
          title,
          cover,
          article_author: {
            nickname,
          },
          type: {
            type_name: typeName,
          },
          summary,
          content,
          read_num: readNum,
          created_at: createdAt,
          status,
        },
        isDisplayArticleDetailModal,
      },
    } = this.props

    return (
      <div>
        <FilterForm onSubmit={this.handleFilterSubmit} />
        <Table
          rowKey='id'
          columns={this.USER_TABLE_COLUMNS}
          pagination={{
            ...articlePagination,
            onChange: this.handlePageChange,
          }}
          dataSource={articleList}
        />
        <Modal
          title={title}
          visible={isDisplayArticleDetailModal}
          onCancel={this.closeArticleDetailModal}
          onOk={this.closeArticleDetailModal}
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
              类型：
            </Col>
            <Col span={this.wrapperSpan}>
              <span>{typeName}</span>
            </Col>
          </Row>
          <Row gutter={this.gutter} className={styles.line}>
            <Col span={this.labelSpan} className={styles.label}>
              阅读量：
            </Col>
            <Col span={this.wrapperSpan}>
              <span>{readNum}</span>
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
              内容：
            </Col>
            <Col span={this.wrapperSpan}>
              {/* <span>{content}</span>*/}
              <span dangerouslySetInnerHTML={{ __html: content }} />
            </Col>
          </Row>
        </Modal>
      </div>
    )
  }
}

export default connect((state) => {
  return state
})(AdminArticleIndex)
