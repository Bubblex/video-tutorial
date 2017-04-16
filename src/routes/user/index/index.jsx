import React from 'react'
import { connect } from 'dva'

import BasicLayout from '../../../components/layout/basic'
import UserData from '../../../components/user-data'

class UserInfo extends React.Component {
  render() {
    return (
      <BasicLayout
        hasSider
        contentBefore={UserData}
      >
        1
      </BasicLayout>
    )
  }
}

export default connect()(UserInfo)
