import React from 'react'
import { connect } from 'dva'

import ChangepwdForm from './changepwd-form'

class UserLike extends React.Component {
  render() {
    const {
      dispatch,
    } = this.props
    return (
      <div>修改密码
        <ChangepwdForm dispatch={dispatch} />
      </div>
    )
  }
}

export default connect()(UserLike)
