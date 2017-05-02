import React from 'react'
import { connect } from 'dva'

import { Link } from 'dva/router'

import {
  Card,
} from 'antd'

import LoginForm from './login-form'
// import BackGroungImg from '../../../assets/account-bg.jpg'
import LOGO from '../../../assets/logo.png'

import styles from './index.less'

class Login extends React.Component {

  render() {
    const {
      dispatch,
      location: {
        state,
      },
    } = this.props

    console.log(this.props)
    const nextPathname = state === null ? '/' : state.nextPathname

    return (
      <div className={styles.login}>
        {/* <img src={BackGroungImg} className={styles.bg} alt='背景图' />*/}
        <Card className={styles.container}>
          <img src={LOGO} className={styles.logo} alt='背景图' />
          <LoginForm dispatch={dispatch} nextPathname={nextPathname} />
          <Link to='/account/register'>注册</Link>
        </Card>
      </div>
    )
  }
}

export default connect()(Login)
