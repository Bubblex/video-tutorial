import React from 'react'
import { connect } from 'dva'

class UserVideo extends React.Component {
  render() {
    return (
      <div>我的视频</div>
    )
  }
}

export default connect()(UserVideo)
