import React from 'react'

import md5 from 'md5'

import {
  Form,
  Input,
  Button,
  message,
} from 'antd'

const {
  Item: FormItem,
} = Form

class LoginForm extends React.Component {

  handleRegisterSubmit = (e) => {
    e.preventDefault()

    const {
      dispatch,
      form: {
        getFieldsValue,
        validateFields,
      },
      nextPathname,
    } = this.props

    validateFields((err) => {
      if (!err) {
        const formValue = getFieldsValue()

        dispatch({
          type: 'login/postLogin',
          payload: {
            ...formValue,
            password: md5(formValue.password),
          },
          message,
          nextPathname,
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
      <div>
        <Form onSubmit={this.handleRegisterSubmit}>
          <FormItem
            label='账号'
          >
            {
              getFieldDecorator('account', {
                rules: [
                  {
                    required: true,
                    message: '账号不能为空',
                  },
                ],
              })(<Input />)
            }
          </FormItem>
          <FormItem
            label='密码'
          >
            {
              getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: '密码不能为空',
                  },
                ],
              })(<Input type='password' />)
            }
          </FormItem >
          <Button type='primary' htmlType='submit' size='large'>登录</Button>
        </Form>
      </div>
    )
  }
}

export default Form.create({

})(LoginForm)
