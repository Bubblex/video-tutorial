import React from 'react'
import { connect } from 'dva'

import LoginForm from './login-form'

class ExampleLogin extends React.Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <LoginForm dispatch={this.props.dispatch} />
      </div>
    )
  }
}

export default connect((state) => {
  return state
})(ExampleLogin)
