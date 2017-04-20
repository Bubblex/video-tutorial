import React from 'react'

import {
  Row,
  Col,
  Tag,
} from 'antd'

import styles from './index.less'

import {
  DEFAULT_AVATAR,
  DEFAULT_USERNAME,
} from '../../config'

class SummaryCard extends React.Component {
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
      <div>
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
        <p style={{ margin: '20px' }}>简介摘要简介摘要简介摘要简介摘要简介摘要简介摘要简介摘要简介摘要</p>
      </div>
    )
  }
}

export default SummaryCard
