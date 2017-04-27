import React from 'react'
import { connect } from 'dva'

class UserLike extends React.Component {
  render() {
    return (
      <div>修改密码</div>
    )
  }
}

export default connect()(UserLike)
