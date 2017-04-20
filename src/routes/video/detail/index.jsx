import React from 'react'
import { connect } from 'dva'
import { Player } from 'video-react'
import { Link } from 'dva/router'

import {
  Row,
  Col,
  Tag,
  Button,
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

const { CheckableTag } = Tag

class VideoDetail extends React.Component {
  static defaultProps = {
    avatar: DEFAULT_AVATAR,
    username: DEFAULT_USERNAME,
  }
  render() {
    const {
      avatar,
      username,
    } = this.props

    return (
      <BasicLayout>
        <Breadcrumb separator='>' style={{ marginBottom: '15px' }}>
          <Breadcrumb.Item><Link to={URL_HOME}>首页</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to={URL_VIDEO_LIST}>视频教程</Link></Breadcrumb.Item>
          <Breadcrumb.Item>视频教程</Breadcrumb.Item>
        </Breadcrumb>
        <SummaryCard avatar={avatar} username={username} />
        <Player>
          <source src='https://media.w3.org/2010/05/sintel/trailer_hd.mp4' />
        </Player>
        <Row>
          <Col span={1} offset={23}>
            <CheckableTag color='#f50' style={{ marginTop: '10px' }}>投诉</CheckableTag>
          </Col>
        </Row>
        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
          <UserCard avatar={avatar} username={username} />
        </div>
        <Button type='primary' icon='heart-o' size='large'>收藏视频 | 111</Button>
        <div style={{ marginTop: '30px' }}>
          <h2 style={{ margin: '30px', paddingBottom: '10px', borderBottom: '1px solid rgb(204, 204, 204)' }}>8条评论</h2>
          <Comment />
          <Comment />
        </div>
      </BasicLayout>
    )
  }
}

export default connect()(VideoDetail)
