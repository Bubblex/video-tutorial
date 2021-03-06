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

class RegisterForm extends React.Component {
  handleRegisterSubmit = (e) => {
    e.preventDefault()

    const {
      dispatch,
      form: {
        getFieldsValue,
        validateFields,
      },
    } = this.props

    validateFields((err) => {
      if (!err) {
        const formValue = getFieldsValue()

        dispatch({
          type: 'register/postRegister',
          payload: {
            ...formValue,
            password: md5(formValue.password),
            confirm_password: md5(formValue.confirm_password),
          },
          message,
        })
      }
    })
  }

  render() {
    const {
      form: {
        getFieldDecorator,
        getFieldValue,
      },
    } = this.props

    const formItemOptions = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 14,
      },
    }

    return (
      <div>
        <Form onSubmit={this.handleRegisterSubmit}>
          <FormItem
            {...formItemOptions}
            label='账户'
          >
            {
              getFieldDecorator('account', {
                rules: [
                  {
                    required: true,
                    message: '账号不能为空',
                  },
                  {
                    min: 6,
                    message: '账号最少6个字符',
                  },
                  {
                    max: 16,
                    message: '账号最长16个字符',
                  },
                  {
                    pattern: /^[0-9a-zA-Z_]+$/,
                    message: '账号只能输入数字字母下划线',
                  },
                ],
              })(<Input />)
            }
          </FormItem>
          <FormItem
            {...formItemOptions}
            label='昵称'
          >
            {
              getFieldDecorator('nickname', {
                rules: [
                  {
                    required: true,
                    message: '昵称不能为空',
                  },
                  {
                    max: 16,
                    message: '昵称最长16个字符',
                  },
                ],
              })(<Input />)
            }
          </FormItem >
          <FormItem
            {...formItemOptions}
            label='密码'
          >
            {
              getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: '密码不能为空',
                  },
                  {
                    min: 6,
                    message: '密码长度最少6个字符',
                  },
                  {
                    max: 16,
                    message: '密码最长16个字符',
                  },
                ],
              })(<Input type='password' />)
            }
          </FormItem >
          <FormItem
            {...formItemOptions}
            label='确认密码'
          >
            {
              getFieldDecorator('confirm_password', {
                rules: [
                  {
                    required: true,
                    message: '密码不能为空',
                  },
                  {
                    type: 'enum',
                    enum: [getFieldValue('password')],
                    message: '两次密码不一致',
                  },
                ],
              })(<Input type='password' />)
            }
          </FormItem >
          <Button type='primary' htmlType='submit' size='large' style={{ width: '67%', marginBottom: '10px' }}>注册</Button>
        </Form>
      </div>
    )
  }
}

export default Form.create({

})(RegisterForm)
