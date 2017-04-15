import React from 'react'
import { connect } from 'dva'

class ArticleDetail extends React.Component {
  render() {
    return (
      <div>文章详情</div>
    )
  }
}

export default connect()(ArticleDetail)
