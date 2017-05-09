import React from 'react'
import { connect } from 'dva'
import { Player } from 'video-react'
import { Link } from 'dva/router'

import {
  Row,
  Col,
  Tag,
  Button,
  message,
  Breadcrumb,
} from 'antd'

import BasicLayout from '../../../components/layout/basic'
import SummaryCard from '../../../components/summary-card/index'
import UserCard from '../../../components/user-card/index'
import Comment from '../../../components/comment/index'

import {
  DEFAULT_AVATAR,
  DEFAULT_USERNAME,
} from '../../../config'

import {
  URL_HOME,
  URL_VIDEO_LIST,
} from '../../../config/web'
import Auth from '../../../utils/auth'

const { CheckableTag } = Tag

class VideoDetail extends React.Component {
  static defaultProps = {
    avatar: DEFAULT_AVATAR,
    username: DEFAULT_USERNAME,
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  handleCollectVideo = (e) => {
    e.preventDefault()

    const {
      dispatch,
      location: {
        pathname,
        search,
      },
    } = this.props

    const {
      router: {
        replace,
      },
    } = this.context

    dispatch({
      type: 'video/postCollectVideo',
      payload: {
        token: Auth.getToken(),
        id: this.props.routing.locationBeforeTransitions.query.id,
      },
      message,
      replace,
      nextPathname: pathname + search,
    })

    dispatch({
      type: 'video/postVideoDetail',
      payload: {
        token: Auth.getToken(),
        id: this.props.routing.locationBeforeTransitions.query.id,
      },
    })
  }

  handleCancelCollectVideo = (e) => {
    e.preventDefault()

    const {
      dispatch,
    } = this.props

    dispatch({
      type: 'video/postCancelCollectVideo',
      payload: {
        token: Auth.getToken(),
        id: this.props.routing.locationBeforeTransitions.query.id,
      },
      message,
    })

    dispatch({
      type: 'video/postVideoDetail',
      payload: {
        token: Auth.getToken(),
        id: this.props.routing.locationBeforeTransitions.query.id,
      },
    })
  }

  render() {
    const {
      username,
      video: {
        videoDetails: {
          title,
          summary,
          created_at: createdAt,
          video_url: videoUrl,
          play_num: readNum,
          is_collect: isCollect,
          collects_count: collectsCount,
          video_author: {
            avatar,
            nickname,
            id,
            user_articles_count,
            user_followers_count,
            user_videos_count,
          },
        },
      },
    } = this.props

    return (
      <BasicLayout>
        <Breadcrumb separator='>' style={{ marginBottom: '15px' }}>
          <Breadcrumb.Item><Link to={URL_HOME}>首页</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to={URL_VIDEO_LIST}>视频教程</Link></Breadcrumb.Item>
          <Breadcrumb.Item>视频教程</Breadcrumb.Item>
        </Breadcrumb>
        <SummaryCard
          username={username}
          title={title}
          avatar={avatar}
          readNum={readNum}
          id={id}
          summary={summary}
          createdAt={createdAt}
          nickname={nickname}
          collectsCount={collectsCount}
        />
        <Player>
          <source src={videoUrl} />
        </Player>
        <Row>
          <Col span={1} offset={23}>
            {/* <CheckableTag color='#f50' style={{ marginTop: '10px' }}>投诉</CheckableTag>*/}
          </Col>
        </Row>
        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
          <UserCard
            avatar={avatar}
            nickname={nickname}
            id={id}
            user_articles_count={user_articles_count}
            user_followers_count={user_followers_count}
            user_videos_count={user_videos_count}
          />
        </div>
        {
          isCollect === 2
          &&
          <Button type='primary' icon='heart-o' size='large' onClick={this.handleCollectVideo}>收藏视频 | {collectsCount}</Button>
        }
        {
          isCollect === 1
          &&
          <Button type='primary' icon='heart-o' size='large' onClick={this.handleCancelCollectVideo}>取消收藏 | {collectsCount}</Button>
        }
        <div style={{ marginTop: '30px' }}>
          {/* <h2 style={{ margin: '30px', paddingBottom: '10px', borderBottom: '1px solid rgb(204, 204, 204)' }}>8条评论</h2>
          <Comment />
          <Comment />*/}
        </div>
      </BasicLayout>
    )
  }
}

export default connect((state) => {
  return state
})(VideoDetail)
