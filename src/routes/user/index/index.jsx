import React from 'react'
import { connect } from 'dva'

import BasicLayout from '../../../components/layout/basic'
import UserData from '../../../components/user-data'

import Auth from '../../../utils/auth'

class UserInfo extends React.Component {
  render() {
    const {
      login: {
        user: {
          summary,
        },
      },
    } = this.props

    const {
      avatar,
      nickname,
    } = Auth.getInfo('info')

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
