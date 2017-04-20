import React from 'react'
import { connect } from 'dva'

import {
  Card,
  Input,
  Button,
} from 'antd'

import BackGroungImg from '../../../assets/account-bg.jpg'
import LOGO from '../../../assets/logo.png'

import styles from './index.less'

class Login extends React.Component {
  render() {
    return (
      <div className={styles.login}>
        <img src={BackGroungImg} className={styles.bg} alt='背景图' />
        <Card className={styles.container}>
          <img src={LOGO} className={styles.logo} alt='背景图' />
          <Input placeholder='账号' size='large' className={styles.input} />
          <Input placeholder='账号' size='large' className={styles.input} />
          <Button size='large' style={{ width: '80%', marginTop: '20px' }}>登录</Button>
          <Button type='primary' size='large' style={{ width: '80%', marginTop: '10px' }}>注册</Button>
        </Card>
      </div>
    )
  }
}

export default connect()(Login)
