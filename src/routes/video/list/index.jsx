import React from 'react'
import { connect } from 'dva'

class VideoList extends React.Component {
  render() {
    return (
      <div>视频列表</div>
    )
  }
}

export default connect()(VideoList)
