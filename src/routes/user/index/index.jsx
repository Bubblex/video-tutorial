import React from 'react'
import { connect } from 'dva'

import {
  Tabs,
  Row,
  Col,
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

  componentDidMount() {
    const {
      dispatch,
    } = this.props

    dispatch({
      type: 'userinfo/postAllUserInfo',
      payload: {
        token: Auth.getToken(),
        id: this.props.routing.locationBeforeTransitions.query.id,
      },
    })
  }

  renderUserFollersList = (key) => {
    const {
      dispatch,
    } = this.props

    if (parseInt(key) === 4) {
      dispatch({
        type: 'star/postUserFollersList',
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
    } = this.props

    const avatar = checkavatar === null ? DEFAULT_AVATAR : checkavatar
    const summary = checksummary === null ? DEFAULT_SUMMARY : checksummary

    const renderFollowersList = this.props.star.userFollowersList === undefined
    ? null
    : this.props.star.userFollowersList.map((arr, index) => {
      return (
        <div key={index}>
          <p>{arr.nickname}</p>
        </div>
      )
    })

    console.log(renderFollowersList)

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
      >
        <Tabs defaultActiveKey='1' onTabClick={this.renderUserFollersList}>
          <TabPane tab='视频教程' key='1'>
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab='文章资讯' key='2'>
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab='关注' key='3'>
            <Row>
              <Col span={8}>
              aa
              </Col>
            </Row>
            Content of Tab Pane 3
          </TabPane>
          <TabPane tab='粉丝' key='4'>
            {renderFollowersList}
            Content of Tab Pane 4
          </TabPane>
        </Tabs>
      </BasicLayout>
    )
  }
}

export default connect((state) => {
  return state
})(UserIndex)
