import React from 'react'
import { connect } from 'dva'

class ReleaseVideo extends React.Component {
  render() {
    return (
      <div>发布视频</div>
    )
  }
}

export default connect()(ReleaseVideo)
