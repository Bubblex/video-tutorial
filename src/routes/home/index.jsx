import React from 'react'
import { connect } from 'dva'

import {
  Button,
  Modal,
} from 'antd'

import BasicLayout from '../../components/layout/basic'

class Home extends React.Component {
  openModal = () => {
    this.props.dispatch({ type: 'home/openModal' })
  }
  closeModal = () => {
    this.props.dispatch({ type: 'home/closeModal' })
  }
  render() {
    console.log(this.props)
    const {
      home: {
        isDisplayModal,
      },
      login: {
        user: {
          avatar,
          nickname,
          summary,
        },
      },
    } = this.props

    return (
      <BasicLayout
        nickname={nickname}
        summary={summary}
        avatar={avatar}
      >
        <Button onClick={this.openModal} type='primary'>打开弹框</Button>
        <Modal
          title='我的弹框标题'
          visible={isDisplayModal}
          onCancel={this.closeModal}
        >
          我是弹框内容
        </Modal>
      </BasicLayout>
    )
  }
}

export default connect(({ home, login }) => {
  return {
    home,
    login,
  }
})(Home)
