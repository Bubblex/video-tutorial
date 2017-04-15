import React from 'react'
import { connect } from 'dva'

class UserArticle extends React.Component {
  render() {
    return (
      <div>我的文章</div>
    )
  }
}

export default connect()(UserArticle)
