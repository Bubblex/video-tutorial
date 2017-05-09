import React from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'

import {
  Card,
  Row,
  Col,
  Icon,
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

import styles from '../../article/list/index.less'

class UserVideo extends React.Component {
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

  handleChangePage = (current) => {
    const {
      dispatch,
    } = this.props
    dispatch({
      type: 'video/postVideoList',
      payload: {
        page: current,
        id: Auth.getInfo().id,
      },
    })
  }

  handleDeleteVideo = (e, index) => {
    e.preventDefault()

    const {
      dispatch,
      video: {
        videoDataList,
      },
    } = this.props

    dispatch({
      type: 'video/postDeleteVideo',
      payload: {
        id: videoDataList[index].id,
        token: Auth.getToken('token'),
      },
      message,
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
      video: {
        videoDataList,
        videoListPagination,
      },
      userinfo: {
        userBasicInfo: {
          role_id: roleId,
        },
      },
    } = this.props

    const renderVideoList = videoDataList.map((arr, index) => {
      return (
        <Card key={index} className={styles.item}>
          <Row>
            <Col span={5}>
              <img src={arr.cover} alt={arr.title} style={{ width: '100%' }} />
            </Col>
            <Col span={18} offset={1}>
              <Row>
                <Col span={20}><h2>{arr.title}</h2></Col>
                <Col span={4}>
                  <Link to='/video/detail' query={{ id: arr.id }} style={{ marginRight: '10px' }}>查看详情</Link>
                  <Popconfirm
                    title='确定删除该条视频'
                    onConfirm={(e) => { this.handleDeleteVideo(e, index) }}
                    okText='是'
                    cancelText='否'
                  >
                    <a href='javascript:'>删除</a>
                  </Popconfirm>
                </Col>
              </Row>
              <p style={{ margin: '10px 0' }}>{arr.summary}</p>
              <Row>
                <Col span={7}>
                  <p>作者：{arr.author.nickname}</p>
                </Col>
                <Col span={11}>
                  <p>发布时间：{arr.created_at}</p>
                </Col>
                <Col span={3}>
                  <p><span>{arr.play_num}</span> <Icon type='eye-o' /></p>
                </Col>
                <Col span={3}>
                  <p><span>{arr.collects_count}</span> <Icon type='heart-o' /></p>
                </Col>
              </Row>
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
        <h2 style={{ marginBottom: 24, borderBottom: '1px solid #ccc', paddingBottom: 10 }}>我发布的视频教程</h2>
        {renderVideoList}
        <Pagination
          {...videoListPagination}
          showQuickJumper
          style={{ float: 'right', margin: '20px' }}
          onChange={this.handleChangePage}
        />
      </BasicLayout>
    )
  }
}

export default connect((state) => {
  return state
})(UserVideo)
