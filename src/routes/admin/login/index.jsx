import React from 'react'
import { connect } from 'dva'

import {
  message,
} from 'antd'

import LoginForm from './login-form'

import styles from './login.less'

class AdminLogin extends React.Component {
  handleLogin = (data) => {
    this.props.dispatch({
      ...data,
      message,
    })
  }
  render() {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>欢迎登录邮币大讲堂后台</h1>
        <div className={styles.card}>
          <LoginForm dispatch={this.props.dispatch} onSubmit={this.handleLogin} />
        </div>
      </div>
    )
  }
}

export default connect((state) => {
  return state
})(AdminLogin)
