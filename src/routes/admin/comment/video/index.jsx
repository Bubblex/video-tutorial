import React from 'react'
import { connect } from 'dva'

class AdminCommentVideo extends React.Component {
  render() {
    return (
      <div>视频评论管理</div>
    )
  }
}

export default connect()(AdminCommentVideo)

