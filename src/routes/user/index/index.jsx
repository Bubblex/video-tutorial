import React from 'react'
import { connect } from 'dva'

import BasicLayout from '../../../components/layout/basic'
import UserData from '../../../components/user-data'

import Auth from '../../../utils/auth'

class UserIndex extends React.Component {

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
      avatar,
      nickname,
      summary,
      followers_num: followersNum,
      articles_num: articlesNum,
      videos_num: videosNum,
      stars_num: starsNum,
    } = Auth.getInfo('info')

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
      >
        1
      </BasicLayout>
    )
  }
}

export default connect((state) => {
  return state
})(UserIndex)
