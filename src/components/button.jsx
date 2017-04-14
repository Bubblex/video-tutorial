import React from 'react'
import { connect } from 'dva'

class Button extends React.Component {

  render() {
    return (
      <button onClick={this.props.onClick}>
          增加
      </button>
    )
  }

}

export default connect()(Button)
