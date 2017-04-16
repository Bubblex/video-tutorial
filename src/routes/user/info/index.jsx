import React from 'react'
import { connect } from 'dva'

import BasicLayout from '../../../components/layout/basic'
import UserData from '../../../components/user-data'

class UserIndex extends React.Component {
  render() {
    return (
      <BasicLayout
        hasSider
        contentBefore={UserData}
      >
    
      </BasicLayout>
    )
  }
}

export default connect()(UserIndex)
