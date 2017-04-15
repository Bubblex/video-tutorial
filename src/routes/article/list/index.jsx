import React from 'react'
import { connect } from 'dva'

class ArticleList extends React.Component {
  render() {
    return (
      <div>文章列表</div>
    )
  }
}

export default connect()(ArticleList)
