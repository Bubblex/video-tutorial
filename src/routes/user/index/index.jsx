import React from 'react'
import { connect } from 'dva'

import BasicLayout from '../../../components/layout/basic'
import UserData from '../../../components/user-data'

import Auth from '../../../utils/auth'

import {
  DEFAULT_AVATAR,
  DEFAULT_SUMMARY,
} from '../../../config'

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
        1
      </BasicLayout>
    )
  }
}

export default connect((state) => {
  return state
})(UserIndex)
