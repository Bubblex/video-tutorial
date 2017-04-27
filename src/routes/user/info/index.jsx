import React from 'react'
import { connect } from 'dva'

import {
  Row,
  Col,
  Icon,
  Button,
  Modal,
  Form,
  Input,
  Upload,
  InputNumber,
} from 'antd'

import BasicLayout from '../../../components/layout/basic'
import UserData from '../../../components/user-data'

import Auth from '../../../utils/auth'


const { Item: FormItem } = Form

class UserInfo extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      displayModal: false,
    }
  }
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

  render() {
    const formItemOptions = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 14,
      },
    }

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

    console.log(Auth.getInfo('info'))

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
        <Modal
          title='修改个人资料'
          visible={this.state.displayModal}
          onCancel={() => { this.setState({ displayModal: false }) }}
        >
          <Form>
            <FormItem
              {...formItemOptions}
              label='昵称'
            >
              <Input />
            </FormItem>
            <FormItem
              {...formItemOptions}
              label='个人简介'
            >
              <Input />
            </FormItem>
            <FormItem
              {...formItemOptions}
              label='年龄'
            >
              <InputNumber style={{ width: '100%' }} />
            </FormItem>
            <FormItem
              {...formItemOptions}
              label='职业'
            >
              <Input />
            </FormItem>
            <FormItem
              {...formItemOptions}
              label='邮箱'
            >
              <Input />
            </FormItem>
            <FormItem
              {...formItemOptions}
              label='上传头像'
            >
              <Upload name='logo' action='/upload.do' listType='picture'>
                <Button>
                  <Icon type='upload' /> 上传
                </Button>
              </Upload>
            </FormItem>
          </Form>
        </Modal>
        <h2 style={{ marginBottom: 24, borderBottom: '1px solid #ccc', paddingBottom: 10 }}>我的资料</h2>
        <Row gutter={16} style={{ marginBottom: 30, fontSize: 16 }}>
          <Col span={3} style={{ textAlign: 'right' }}>用户名：</Col>
          <Col span={21}>{account}</Col>
        </Row>
        <Row gutter={16} style={{ marginBottom: 30, fontSize: 16 }}>
          <Col span={3} style={{ textAlign: 'right' }}>昵称：</Col>
          <Col span={21}>{nickname}</Col>
        </Row>
        <Row gutter={16} style={{ marginBottom: 30, fontSize: 16 }}>
          <Col span={3} style={{ textAlign: 'right' }}>年龄：</Col>
          <Col span={21}>21</Col>
        </Row>
        <Row gutter={16} style={{ marginBottom: 30, fontSize: 16 }}>
          <Col span={3} style={{ textAlign: 'right' }}>邮箱：</Col>
          <Col span={21}>example@email.com</Col>
        </Row>
        <Row gutter={16} style={{ marginBottom: 30, fontSize: 16 }}>
          <Col span={3} style={{ textAlign: 'right' }}>职业：</Col>
          <Col span={21}>邮币大讲堂讲师</Col>
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
          <Col span={21} offset={3}><Button type='primary' size='large' onClick={() => { this.setState({ displayModal: true }) }}>修改资料</Button></Col>
        </Row>
      </BasicLayout>
    )
  }
}

export default connect((state) => {
  return state
})(UserInfo)
