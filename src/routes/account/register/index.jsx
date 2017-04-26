import React from 'react'
import { connect } from 'dva'

import RegisterForm from './register-form'

class Register extends React.Component {
  render() {
    return (
      <div>
        <RegisterForm dispatch={this.props.dispatch} />
      </div>
    )
  }
}

export default connect((state) => {
  return state
})(Register)
