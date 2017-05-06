import React from 'react'

import {
  Row,
  Col,
  Card,
  Button,
} from 'antd'

import {
  DEFAULT_AVATAR,
  DEFAULT_USERNAME,
} from '../../config'

import styles from './index.less'

class UserCard extends React.Component {
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
      <Card bodyStyle={{ background: '#f8f8f8' }}>
        <Row>
          <Col span={2}>
            <img src={avatar} alt={username} className={styles.avatar} />
          </Col>
          <Col span={18}>
            <p style={{ marginBottom: '8px', fontSize: '16px' }}>{username}</p>
            <p>
              <span >注册于2017-2-2</span>
              <span style={{ marginLeft: '20px' }}>发布了111条文章资讯</span>
              <span style={{ marginLeft: '20px' }}>发布111个视频教程</span>
              <span style={{ marginLeft: '20px' }}>获得111人关注</span>
            </p>
          </Col>
          <Col span={4}>
            <Button size='large'>个人主页</Button>
          </Col>
        </Row>
        <p style={{ marginTop: '8px', borderTop: '1px solid #ccc', padding: '10px' }}>简介简介简介简介简介简介</p>
      </Card>
    )
  }
}

export default UserCard
