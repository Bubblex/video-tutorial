import React from 'react'
import { connect } from 'dva'

class ReleaseArticle extends React.Component {
  render() {
    return (
      <div>发布文章</div>
    )
  }
}

export default connect()(ReleaseArticle)
