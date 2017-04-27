import React from 'react'
import { connect } from 'dva'

import {
  Row,
  Col,
  Button,
} from 'antd'

import BasicLayout from '../../../components/layout/basic'
import UserData from '../../../components/user-data'
import Auth from '../../../utils/auth'
import InfoForm from './info-form'

class UserInfo extends React.Component {

  componentDidMount() {
    const {
      dispatch,
    } = this.props

    dispatch({
      type: 'userinfo/postUserInfo',
      payload: {
        token: Auth.getToken('token'),
      },
    })
  }

  handleOpenChangepedModal = () => {
    this.props.dispatch({ type: 'userinfo/openChangepwdModal' })
  }



  render() {
    const {
      avatar,
      nickname,
      summary,
      account,
      role_name: roleName,
      created_at: {
        date,
      },
      authentication,
      followers_num: followersNum,
      articles_num: articlesNum,
      videos_num: videosNum,
      stars_num: starsNum,
    } = Auth.getInfo('info')

    const {
      dispatch,
      userinfo: {
        isChangepwdModalDisplay,
      },
    } = this.props

    return (
      <BasicLayout
        hasSider
        contentBefore={UserData}
        nickname={nickname}
        summary={summary}
        avatar={avatar}
        followers_num={followersNum}
        articles_num={articlesNum}
        videos_num={videosNum}
        stars_num={starsNum}
      >
        <InfoForm
          dispatch={dispatch}
          nickname={nickname}
          summary={summary}
          account={account}
          date={date}
          isChangepwdModalDisplay={isChangepwdModalDisplay}
        />
        <h2 style={{ marginBottom: 24, borderBottom: '1px solid #ccc', paddingBottom: 10 }}>我的资料</h2>
        <Row gutter={16} style={{ marginBottom: 30, fontSize: 16 }}>
          <Col span={3} style={{ textAlign: 'right' }}>账号：</Col>
          <Col span={21}>{account}</Col>
        </Row>
        <Row gutter={16} style={{ marginBottom: 30, fontSize: 16 }}>
          <Col span={3} style={{ textAlign: 'right' }}>昵称：</Col>
          <Col span={21}>{nickname}</Col>
        </Row>
        <Row gutter={16} style={{ marginBottom: 30, fontSize: 16 }}>
          <Col span={3} style={{ textAlign: 'right' }}>签名：</Col>
          <Col span={21}>{summary}</Col>
        </Row>
        <Row gutter={16} style={{ marginBottom: 30, fontSize: 16 }}>
          <Col span={3} style={{ textAlign: 'right' }}>注册时间：</Col>
          <Col span={21}>{date}</Col>
        </Row>
        <Row gutter={16} style={{ marginBottom: 30, fontSize: 16 }}>
          <Col span={3} style={{ textAlign: 'right' }}>职位认证：</Col>
          {
            authentication === 1
            &&
            <div>
              <Col span={5}>未认证</Col>
              <Col span={16}><Button type='default'>申请认证</Button></Col>
            </div>
          }
          {
            authentication === 2
            &&
            <Col span={5}>已认证</Col>
          }
          {
            authentication === 3
            &&
            <div>
              <Col span={5}>认证失败</Col>
              <Col span={16}><Button type='default'>重新申请认证</Button></Col>
              <Col span={16}><Button type='default'>申请认证</Button></Col>
            </div>
          }
          {
            authentication === 4
            &&
            <div>
              <Col span={5}>{roleName}</Col>
            </div>
          }
        </Row>
        <Row gutter={16} style={{ marginBottom: 30, fontSize: 16 }}>
          <Col span={21} offset={3}>
            <Button
              type='primary'
              size='large'
              onClick={this.handleOpenChangepedModal}
            >
              修改资料
            </Button>
          </Col>
        </Row>
      </BasicLayout>
    )
  }
}

export default connect((state) => {
  return state
})(UserInfo)
