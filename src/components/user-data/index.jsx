import React from 'react'

import {
  Row,
  Col,
  Icon,
  Button,
} from 'antd'

import styles from './user-data.less'

import {
  DEFAULT_AVATAR,
  DEFAULT_USERNAME,
  DEFAULT_SUMMARY,
} from '../../config'

class UserData extends React.Component {
  static defaultProps = {
    avatar: DEFAULT_AVATAR,
    username: DEFAULT_USERNAME,
    summary: DEFAULT_SUMMARY,
  }
  render() {
    const {
      avatar,
      username,
      summary,
    } = this.props

    return (
      <div className={styles.data}>
        <div className={styles.mask}>
          <div className={styles.content}>
            <div className={styles.avatar}>
              <img src={avatar} alt={username} />
            </div>
            <div className={styles.username}>
              {username}
            </div>
            <div className={styles.follow}>
              {/* 未关注 */}
              <Button className={styles.followButton} size='large'><Icon type='heart-o' />关注TA</Button>
              {/*
                已关注关注
                <Button className={styles.followButton} size='large'><Icon type='heart' />取消关注</Button>
              */}
            </div>
            <div className={styles.summary}>
              {summary}
            </div>
            <div className={styles.detail}>
              <Row>
                <Col span={6}>
                  <p className={styles.num}>1</p>
                  <span className={styles.text}>视频</span>
                </Col>
                <Col span={6}>
                  <p className={styles.num}>1</p>
                  <span className={styles.text}>文章</span>
                </Col>
                <Col span={6}>
                  <p className={styles.num}>1</p>
                  <span className={styles.text}>手记</span>
                </Col>
                <Col span={6}>
                  <p className={styles.num}>1</p>
                  <span className={styles.text}>粉丝</span>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UserData
