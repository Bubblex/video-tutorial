import React from 'react'
import { Link } from 'dva/router'

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
    nickname: DEFAULT_USERNAME,
  }

  render() {
    const {
      avatar: avatarcheck,
      title,
      createdAt,
      readNum,
      summary,
      id,
      nickname,
      roleId,
    } = this.props

    const avatar = avatarcheck === null ? DEFAULT_AVATAR : avatarcheck

    return (
      <div>
        <h2 style={{ marginBottom: '15px' }}>{title}</h2>
        <Row>
          <Col span={2}>
            <img src={avatar} alt={nickname} className={styles.avatar} />
          </Col>
          <Col span={22}>
            <div style={{ marginBottom: '10px' }}>发布人：
              <Link to='/user' query={{ id }}>{nickname}</Link>
              {
                roleId === 2
                &&
                <Tag color='#87d068' style={{ marginLeft: '20px' }}>认证讲师</Tag>
              }
            </div>
            <div>
              <span >发布时间：{createdAt}</span>
              <span style={{ marginLeft: '20px' }}>阅读：{readNum}</span>
              <span style={{ marginLeft: '20px' }}>评论：111</span>
              <span style={{ marginLeft: '20px' }}>收藏：111</span>
            </div>
          </Col>
        </Row>
        <p style={{ margin: '20px' }}>{summary}</p>
      </div>
    )
  }
}

export default SummaryCard
