import React from 'react'
import { connect } from 'dva'

class Info extends React.Component {

  render() {
    return (
      <div>
        {this.props.info}
      </div>
    )
  }

}

export default connect()(Info)
