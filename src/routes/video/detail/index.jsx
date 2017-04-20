import React from 'react'
import { connect } from 'dva'
import { Player } from 'video-react'

import {
  Row,
  Col,
  Tag,
  Button,
} from 'antd'

import BasicLayout from '../../../components/layout/basic'
import UserCard from '../../../components/user-card/index'
import Comment from '../../../components/comment/index'

import {
  DEFAULT_AVATAR,
  DEFAULT_USERNAME,
} from '../../../config'

import styles from './index.less'

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
        <h2 style={{ marginBottom: '15px' }}>视频教程标题</h2>
        <Row>
          <Col span={2}>
            <img src={avatar} alt={username} className={styles.avatar} />
          </Col>
          <Col span={22}>
            <div style={{ marginBottom: '10px' }}>发布人：{username}
              <Tag color='#87d068' style={{ marginLeft: '20px' }}>认证讲师</Tag>
              <Tag color='#f50' style={{ marginLeft: '10px' }}>关注</Tag>
            </div>
            <div>
              <span >发布时间：2017-2-2</span>
              <span style={{ marginLeft: '20px' }}>阅读：111</span>
              <span style={{ marginLeft: '20px' }}>评论：111</span>
              <span style={{ marginLeft: '20px' }}>收藏：111</span>
            </div>
          </Col>
        </Row>
        <p style={{ margin: '20px' }}>视频教程简介视频教程简介视频教程简介视频教程简介</p>
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
