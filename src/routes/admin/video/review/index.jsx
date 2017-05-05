import React from 'react'
import { connect } from 'dva'

class Review extends React.Component {
  render() {
    return (
      <div>
        审核
      </div>
    )
  }
}

export default connect((state) => {
  return state
})(Review)
