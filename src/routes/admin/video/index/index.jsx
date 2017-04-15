import React from 'react'
import { connect } from 'dva'

class AdminVideoIndex extends React.Component {
  render() {
    return (
      <div>视频管理</div>
    )
  }
}

export default connect()(AdminVideoIndex)
