import React from 'react'
import { connect } from 'dva'

import Cookies from 'js-cookie'

import BasicLayout from '../../../components/layout/basic'
import UserData from '../../../components/user-data'

class UserInfo extends React.Component {
  render() {
    console.log(Cookies.get('token'))
    const {
      login: {
        user: {
          avatar,
          nickname,
          summary,
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
      >
        1
      </BasicLayout>
    )
  }
}

export default connect((state) => {
  return state
})(UserInfo)
