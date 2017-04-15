import React from 'react'
import { connect } from 'dva'

class UserIndex extends React.Component {
  render() {
    return (
      <div>个人资料</div>
    )
  }
}

export default connect()(UserIndex)
