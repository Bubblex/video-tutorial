import React from 'react'

import md5 from 'md5'

import {
  Form,
  Input,
  Button,
  message,
} from 'antd'

import Auth from '../../../utils/auth'

const {
  Item: FormItem,
} = Form

class ChangepwdForm extends React.Component {
  handleChangepwdSubmit = (e) => {
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
          type: 'register/PostChangePwd',
          payload: {
            token: Auth.getToken(),
            password: md5(formValue.password),
            new_password: md5(formValue.new_password),
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
        <Form onSubmit={this.handleChangepwdSubmit}>
          <FormItem
            {...formItemOptions}
            label='旧密码'
          >
            {
              getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: '旧密码不能为空',
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
          </FormItem>
          <FormItem
            {...formItemOptions}
            label='新密码'
          >
            {
              getFieldDecorator('new_password', {
                rules: [
                  {
                    required: true,
                    message: '新密码不能为空',
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
          </FormItem>
          <FormItem
            {...formItemOptions}
            label='确认新密码'
          >
            {
              getFieldDecorator('confirm_password', {
                rules: [
                  {
                    required: true,
                    message: '确认新密码不能为空',
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
          </FormItem>
          <Button
            type='primary'
            htmlType='submit'
            size='large'
            style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block', width: '20%' }}
          >
            确认修改
          </Button>
        </Form>
      </div>
    )
  }
}

export default Form.create({

})(ChangepwdForm)
