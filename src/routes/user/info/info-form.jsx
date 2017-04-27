import React from 'react'

import {
  Form,
  Input,
  Button,
  message,
  Upload,
  Icon,
  InputNumber,
} from 'antd'

const {
  Item: FormItem,
} = Form

class InfoForm extends React.Component {
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
      form: {
        getFieldDecorator,
      },
      nickname,
      summary,
      account,
    } = this.props

    console.log(this.props)

    return (
      <Form>
        <FormItem
          {...formItemOptions}
          label='账号'
        >
          {
            getFieldDecorator('account', {
              initialValue: account,
            })(<Input disabled='true' />)
          }
        </FormItem>
        <FormItem
          {...formItemOptions}
          label='昵称'
        >
          {
            getFieldDecorator('nickname', {
              initialValue: nickname,
            })(<Input />)
          }
        </FormItem>
        <FormItem
          {...formItemOptions}
          label='个人简介'
        >
          {
            getFieldDecorator('summary', {
              initialValue: summary,
            })(<Input />)
          }
        </FormItem>
        <FormItem
          {...formItemOptions}
          label='年龄'
        >
          {
            getFieldDecorator('age')(<InputNumber style={{ width: '100%' }} />)
          }
        </FormItem>
        <FormItem
          {...formItemOptions}
          label='邮箱'
        >
          {
            getFieldDecorator('email')(<Input />)
          }
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
    )
  }
}

export default Form.create({

})(InfoForm)
