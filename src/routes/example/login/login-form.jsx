import React from 'react'
import qs from 'qs'

import {
  Form,
  Input,
  Button,
} from 'antd'

const {
  Item: FormItem,
} = Form

class LoginForm extends React.Component {
  clearForm = () => {
    this.props.form.resetFields()
  }
  handleSubmit = (e) => {
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
        console.log(formValue)
        console.log(qs.stringify(formValue))
        dispatch({
          type: 'home/postLogin',
          payload: formValue,
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
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          label='用户名'
        >
          {
            getFieldDecorator('account', {
              initialValue: 'AshenOne',
              rules: [
                {
                  required: true,
                  message: '用户名不能为空',
                },
                {
                  max: 16,
                  message: '用户名长度不能超过16个字符',
                },
              ],
            })(<Input />)
          }
        </FormItem>
        <FormItem
          label='密码'
        >
          {
            getFieldDecorator('password')(<Input type='password' />)
          }
        </FormItem>
        <Button type='primary' htmlType='submit'>提交</Button>
        <Button onClick={this.clearForm}>清空</Button>
      </Form>
    )
  }
}

export default Form.create({

})(LoginForm)
