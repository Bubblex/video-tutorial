import React from 'react'
import { connect } from 'dva'

import RegisterForm from './register-form'

class Register extends React.Component {
  render() {
    return (
      <div>
        <RegisterForm />
      </div>
    )
  }
}

export default connect()(Register)
