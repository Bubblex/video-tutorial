import React from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'

import {
  Col,
  Card,
  Row,
  Modal,
  Pagination,
  Popconfirm,
  message,
} from 'antd'

import BasicLayout from '../../../components/layout/basic'
import UserData from '../../../components/user-data'
import Auth from '../../../utils/auth'

import {
  DEFAULT_AVATAR,
  DEFAULT_SUMMARY,
} from '../../../config'

class UserMessage extends React.Component {
  componentDidMount() {
    const {
      dispatch,
    } = this.props

    dispatch({
      type: 'userinfo/postUserInfo',
      payload: {
        token: Auth.getToken('token'),
      },
    })
  }

  showMessageDetailModal = (e, index) => {
    e.preventDefault()

    const {
      dispatch,
      userinfo: {
        userMessageList,
      },
    } = this.props

    dispatch({
      type: 'userinfo/openMessageDetailModal',
    })

    dispatch({
      type: 'userinfo/saveShowMessageDetail',
      showMessageDetail: userMessageList[index],
    })

    dispatch({
      type: 'userinfo/postReadMessage',
      payload: {
        id: userMessageList[index].id,
        token: Auth.getToken('token'),
      },
    })
  }

  handleDeleteMessage = (e, index) => {
    e.preventDefault()

    const {
      dispatch,
      userinfo: {
        userMessageList,
      },
    } = this.props

    dispatch({
      type: 'userinfo/postDeleteMessage',
      payload: {
        id: userMessageList[index].id,
        token: Auth.getToken('token'),
      },
      message,
    })
  }

  closeMessageDetailModal = (e) => {
    e.preventDefault()

    const {
      dispatch,
    } = this.props

    dispatch({
      type: 'userinfo/closeMessageDetailModal',
    })

    dispatch({
      type: 'userinfo/postUserMessageList',
      payload: {
        token: Auth.getToken(),
      },
    })
  }

  render() {
    const {
      avatar: checkavatar,
      nickname,
      summary: checksummary,
      account,
      followers_num: followersNum,
      articles_num: articlesNum,
      videos_num: videosNum,
      stars_num: starsNum,
      authentication,
    } = Auth.getInfo('info')

    const avatar = checkavatar === null ? DEFAULT_AVATAR : checkavatar
    const summary = checksummary === null ? DEFAULT_SUMMARY : checksummary

    const {
      userinfo: {
        userMessageList,
        isMessageDetailModalPlay,
        showMessageDetail: {
          title,
          content,
        },
        userMessageListPagination,
        userBasicInfo: {
          role_id: roleId,
        },
      },
    } = this.props

    const renderMessageList = userMessageList === undefined
    ? null
    : userMessageList.map((arr, index) => {
      return (
        <Card key={index} style={{ marginBottom: '20px' }}>
          <Row style={{ marginBottom: '10px' }}>
            <Col span={20}>
              {
                arr.status === 1
                &&
                <p style={{ color: 'red' }}>系统通知：{arr.title}</p>
              }
              {
                arr.status === 2
                &&
                <p>系统通知：{arr.title}</p>
              }
            </Col>
            <Col span={4}><a onClick={(e) => { this.showMessageDetailModal(e, index) }}>查看详情</a></Col>
          </Row>
          <Row>
            <Col span={20}>
              {
                arr.status === 1
                &&
                <p style={{ color: 'red' }}>时间：{arr.created_at}</p>
              }
              {
                arr.status === 2
                &&
                <p>时间：{arr.created_at}</p>
              }
            </Col>
            <Col span={4}>
              <Popconfirm
                title='确定删除该条信息'
                onConfirm={(e) => { this.handleDeleteMessage(e, index) }}
                okText='是'
                cancelText='否'
              >
                <a href='javascript:'>删除</a>
              </Popconfirm>
            </Col>
          </Row>
        </Card>
      )
    })

    return (
      <BasicLayout
        hasSider
        contentBefore={UserData}
        nickname={nickname}
        summary={summary}
        avatar={avatar}
        followers_num={followersNum}
        articles_num={articlesNum}
        videos_num={videosNum}
        stars_num={starsNum}
        account={account}
        authenticate={authentication}
        roleId={roleId}
      >
        <h2 style={{ marginBottom: 24, borderBottom: '1px solid #ccc', paddingBottom: 10 }}>我收到的信息</h2>
        {renderMessageList}
        <Pagination
          {...userMessageListPagination}
          showQuickJumper
          style={{ float: 'right', margin: '20px' }}
          onChange={this.handleChangePage}
        />
        <Modal
          title={title}
          visible={isMessageDetailModalPlay}
          onOk={this.closeMessageDetailModal}
          onCancel={this.closeMessageDetailModal}
        >
          <p>{content}</p>
        </Modal>
      </BasicLayout>
    )
  }
}

export default connect((state) => {
  return state
})(UserMessage)
