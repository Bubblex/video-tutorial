import { browserHistory } from 'dva/router'

import React from 'react'
import { connect } from 'dva'

import {
  Row,
  Col,
  Icon,
  Button,
} from 'antd'

import styles from './user-data.less'

import Auth from '../../utils/auth'

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

  handleFollowSomeone = () => {
    const {
      dispatch,
    } = this.props

    if (Auth.getToken() === undefined) {
      browserHistory.push('/account/login')
    } else {
      dispatch({
        type: 'star/postFollowSomeone',
        payload: {
          token: Auth.getToken(),
          id: this.props.routing.locationBeforeTransitions.query.id,
        },
      })
    }
  }

  handleUnFollowSomeone = () => {
    const {
      dispatch,
    } = this.props

    dispatch({
      type: 'star/postUnFollowSomeone',
      payload: {
        token: Auth.getToken(),
        id: this.props.routing.locationBeforeTransitions.query.id,
      },
    })
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
      isFollow,
    } = this.props

    const hasFollow = this.props.routing.locationBeforeTransitions.pathname === '/user/info' ? 2 : 1

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
            {
              hasFollow === 1
              &&
              <div className={styles.follow}>
                {
                  isFollow === 2
                  &&
                  <Button
                    className={styles.followButton}
                    size='large'
                    onClick={this.handleFollowSomeone}
                  >
                    <Icon type='heart-o' />
                    关注TA
                  </Button>
                }
                {
                  isFollow === 1
                  &&
                  <Button
                    className={styles.followButton}
                    size='large'
                    onClick={this.handleUnFollowSomeone}
                  >
                    <Icon type='heart' />
                    取消关注
                  </Button>
                }
              </div>
            }
            <div className={styles.summary}>
              {summary}
            </div>
            <div className={styles.detail}>
              <Row>
                <Col span={6}>
                  <p className={styles.num}>{videosNum}</p>
                  <a className={styles.text}>视频教程</a>
                </Col>
                <Col span={6}>
                  <p className={styles.num}>{articlesNum}</p>
                  <a className={styles.text}>文章资讯</a>
                </Col>
                <Col span={6}>
                  <p className={styles.num}>{starsNum}</p>
                  <a className={styles.text}>关注</a>
                </Col>
                <Col span={6}>
                  <p className={styles.num}>{followersNum}</p>
                  <a className={styles.text}>粉丝</a>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect((state) => {
  return state
})(UserData)
