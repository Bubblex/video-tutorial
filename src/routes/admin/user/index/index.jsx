import React from 'react'
import { connect } from 'dva'

class AdminArticleIndex extends React.Component {
  render() {
    return (
      <div>用户管理</div>
    )
  }
}

export default connect()(AdminArticleIndex)
