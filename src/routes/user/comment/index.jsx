import React from 'react'
import { connect } from 'dva'

class UserComment extends React.Component {
  render() {
    return (
      <div>我的评论</div>
    )
  }
}

export default connect()(UserComment)
