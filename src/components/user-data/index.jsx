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
    nickname: DEFAULT_USERNAME,
    summary: DEFAULT_SUMMARY,
  }
  render() {
    const {
      avatar,
      nickname,
      summary,
      followers_num: followersNum,
      articles_num: articlesNum,
      videos_num: videosNum,
      stars_num: starsNum,
    } = this.props

    return (
      <div className={styles.data}>
        <div className={styles.mask}>
          <div className={styles.content}>
            <div className={styles.avatar}>
              <img src={avatar} alt={nickname} />
            </div>
            <div className={styles.username}>
              {nickname}
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
                  <p className={styles.num}>{videosNum}</p>
                  <span className={styles.text}>视频教程</span>
                </Col>
                <Col span={6}>
                  <p className={styles.num}>{articlesNum}</p>
                  <span className={styles.text}>文章资讯</span>
                </Col>
                <Col span={6}>
                  <p className={styles.num}>{starsNum}</p>
                  <span className={styles.text}>关注</span>
                </Col>
                <Col span={6}>
                  <p className={styles.num}>{followersNum}</p>
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
