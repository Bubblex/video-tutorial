import React from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'

import {
  Tabs,
  Row,
  Col,
  Card,
} from 'antd'

import BasicLayout from '../../../components/layout/basic'
import UserData from '../../../components/user-data'

import Auth from '../../../utils/auth'

import {
  DEFAULT_AVATAR,
  DEFAULT_SUMMARY,
} from '../../../config'

const { TabPane } = Tabs

class UserIndex extends React.Component {

  renderUserFollersList = (key) => {
    const {
      dispatch,
    } = this.props

    dispatch({
      type: 'star/changeActiveTabKey',
      activeTabKey: key,
    })

    if (parseInt(key) === 4) {
      dispatch({
        type: 'star/postUserFollersList',
        payload: {
          id: this.props.routing.locationBeforeTransitions.query.id,
        },
      })
    }

    if (parseInt(key) === 3) {
      dispatch({
        type: 'star/postUserStarsList',
        payload: {
          id: this.props.routing.locationBeforeTransitions.query.id,
        },
      })
    }
  }

  render() {
    const {
      userinfo: {
        alluserBasicInfo: {
          avatar: checkavatar,
          nickname,
          summary: checksummary,
          followers_num: followersNum,
          articles_num: articlesNum,
          videos_num: videosNum,
          stars_num: starsNum,
          is_follow: isFollow,
        },
      },
      star: {
        activeTabKey,
      },
      location: {
        pathname,
        search,
      },
    } = this.props

    const avatar = checkavatar === null ? DEFAULT_AVATAR : checkavatar
    const summary = checksummary === null ? DEFAULT_SUMMARY : checksummary
    const nextPathname = pathname + search

    const renderFollowersList = this.props.star.userFollowersList === undefined
    ? null
    : this.props.star.userFollowersList.map((arr, index) => {
      return (
        <Col span={8} key={index}>
          <Link to='/user' query={{ id: arr.id }}>
            <Card style={{ width: '80%' }}>
              <img
                src={arr.avatar === null ? DEFAULT_AVATAR : arr.avatar}
                alt={arr.nickname}
                style={{ width: '100%', height: '240px,' }}
              />
              <p style={{ textAlign: 'center', marginTop: '20px' }}>{arr.nickname}</p>
              <p style={{ textAlign: 'center', marginTop: '20px' }}>{arr.summary === null ? DEFAULT_SUMMARY : arr.summary}</p>
            </Card>
          </Link>
        </Col>
      )
    })

    const renderStarsList = this.props.star.userStarrsList === undefined
    ? null
    : this.props.star.userStarrsList.map((arr, index) => {
      return (
        <Col span={8} key={index}>
          <Link to='/user' query={{ id: arr.id }}>
            <Card style={{ width: '80%' }}>
              <img
                src={arr.avatar === null ? DEFAULT_AVATAR : arr.avatar}
                alt={arr.nickname}
                style={{ width: '100%', height: '240px,' }}
              />
              <p style={{ textAlign: 'center', marginTop: '20px' }}>{arr.nickname}</p>
              <p style={{ textAlign: 'center', marginTop: '20px' }}>{arr.summary === null ? DEFAULT_SUMMARY : arr.summary}</p>
            </Card>
          </Link>
        </Col>
      )
    })

    return (
      <BasicLayout
        contentBefore={UserData}
        nickname={nickname}
        summary={summary}
        avatar={avatar}
        followers_num={followersNum}
        articles_num={articlesNum}
        videos_num={videosNum}
        stars_num={starsNum}
        isFollow={isFollow}
        nextPathname={nextPathname}
      >
        <Tabs activeKey={activeTabKey} onTabClick={this.renderUserFollersList}>
          <TabPane tab='视频教程' key='1'>
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab='文章资讯' key='2'>
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab='关注' key='3'>
            <Row>
              {renderStarsList}
            </Row>
          </TabPane>
          <TabPane tab='粉丝' key='4'>
            <Row>
              {renderFollowersList}
            </Row>
          </TabPane>
        </Tabs>
      </BasicLayout>
    )
  }
}

export default connect((state) => {
  return state
})(UserIndex)
