import React from 'react'
import { connect } from 'dva'

class AdminCommentArticle extends React.Component {
  render() {
    return (
      <div>文章评论管理</div>
    )
  }
}

export default connect()(AdminCommentArticle)

