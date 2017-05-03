import React from 'react'
import md5 from 'md5'

import {
  Form,
  Input,
  Button,
} from 'antd'

import styles from './login.less'

const {
  Item: FormItem,
} = Form

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.formItemOptions = {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 20,
      },
    }
  }
  handleSubmt = (e) => {
    e.preventDefault()
    const {
      form: {
        validateFields,
        getFieldsValue,
      },
    } = this.props

    validateFields((err) => {
      if (!err) {
        const payload = getFieldsValue()
        this.props.onSubmit({
          type: 'admin/adminLogin',
          payload: {
            ...payload,
            password: md5(payload.password),
          },
        })
      }
    })
  }
  render() {
    const {
      form: {
        getFieldDecorator,
      },
    } = this.props

    return (
      <Form onSubmit={this.handleSubmt}>
        <FormItem
          {...this.formItemOptions}
          label='账户'
        >
          {
            getFieldDecorator('account')(<Input />)
          }
        </FormItem>
        <FormItem
          {...this.formItemOptions}
          label='密码'
        >
          {
            getFieldDecorator('password')(<Input type='password' />)
          }
        </FormItem>
        <FormItem
          wrapperCol={{
            span: 20,
            offset: 4,
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <Button type='primary' htmlType='submit' size='large' style={{ width: '40%' }}>登录</Button>
          </div>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(LoginForm)
