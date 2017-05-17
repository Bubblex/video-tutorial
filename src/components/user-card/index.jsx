import React from 'react'
import { Link } from 'dva/router'

import {
  Row,
  Col,
  Card,
  Button,
} from 'antd'

import {
  DEFAULT_AVATAR,
} from '../../config'

import styles from './index.less'

class UserCard extends React.Component {
  render() {
    const {
      avatar: avatarcheck,
      id,
      nickname,
      user_followers_count,
      user_videos_count,
      user_articles_count,
    } = this.props

    const avatar = avatarcheck === null ? DEFAULT_AVATAR : avatarcheck

    return (
      <Card bodyStyle={{ background: '#f8f8f8' }}>
        <Row>
          <Col span={2}>
            <img src={avatar} alt={nickname} className={styles.avatar} />
          </Col>
          <Col span={18}>
            <p style={{ marginBottom: '8px', fontSize: '16px' }}>{nickname}</p>
            <p>
              <span >注册于2017-2-2</span>
              <span style={{ marginLeft: '20px' }}>发布了{user_articles_count}条文章资讯</span>
              <span style={{ marginLeft: '20px' }}>发布{user_videos_count}个视频教程</span>
              <span style={{ marginLeft: '20px' }}>获得{user_followers_count}人关注</span>
            </p>
          </Col>
          <Col span={4}>
            <Link to='/user' query={{ id }}>
              <Button size='large'>个人主页</Button>
            </Link>
          </Col>
        </Row>
        <p style={{ marginTop: '8px', borderTop: '1px solid #ccc', padding: '10px' }}>邮币卡爱好者</p>
      </Card>
    )
  }
}

export default UserCard
