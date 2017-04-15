import React from 'react'
import { connect } from 'dva'

class UserLike extends React.Component {
  render() {
    return (
      <div>我的收藏</div>
    )
  }
}

export default connect()(UserLike)
