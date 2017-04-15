import React from 'react'
import { connect } from 'dva'

class UserInfo extends React.Component {
  render() {
    return (
      <div>个人主页</div>
    )
  }
}

export default connect()(UserInfo)
