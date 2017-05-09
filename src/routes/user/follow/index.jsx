import React from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'

import {
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

class UserFollow extends React.Component {
  componentDidMount() {
    const {
      dispatch,
    } = this.props

    dispatch({
      type: 'userinfo/postUserInfo',
      payload: {
        token: Auth.getToken('token'),
      },
    })
  }

  render() {
    const {
      avatar: checkavatar,
      nickname,
      summary: checksummary,
      account,
      followers_num: followersNum,
      articles_num: articlesNum,
      videos_num: videosNum,
      stars_num: starsNum,
      authentication,
    } = Auth.getInfo('info')

    const avatar = checkavatar === null ? DEFAULT_AVATAR : checkavatar
    const summary = checksummary === null ? DEFAULT_SUMMARY : checksummary

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

    const {
      userinfo: {
        userBasicInfo: {
          role_id: roleId,
        },
      },
    } = this.props

    return (
      <BasicLayout
        hasSider
        contentBefore={UserData}
        nickname={nickname}
        summary={summary}
        avatar={avatar}
        followers_num={followersNum}
        articles_num={articlesNum}
        videos_num={videosNum}
        stars_num={starsNum}
        account={account}
        authenticate={authentication}
        roleId={roleId}
      >
        <h2 style={{ marginBottom: 24, borderBottom: '1px solid #ccc', paddingBottom: 10 }}>我的粉丝</h2>
        {renderFollowersList}
      </BasicLayout>
    )
  }
}

export default connect((state) => {
  return state
})(UserFollow)
