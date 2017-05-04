import React from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'

import {
  Card,
} from 'antd'

import RegisterForm from './register-form'
import BackGroungImg from '../../../assets/account-bg.jpg'
import LOGO from '../../../assets/logo.png'

import styles from '../login/index.less'

class Register extends React.Component {
  render() {
    return (
      <div className={styles.login}>
        <img src={BackGroungImg} className={styles.bg} alt='背景图' />
        <Card className={styles.container}>
          <img src={LOGO} className={styles.logo} alt='背景图' />
          <RegisterForm dispatch={this.props.dispatch} />
          <Link to='/account/login'>已有账号，去登录</Link>
        </Card>
      </div>
    )
  }
}

export default connect((state) => {
  return state
})(Register)
