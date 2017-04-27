import React from 'react'

import {
  Form,
  Input,
  Button,
  message,
  Modal,
  Upload,
  Icon,
} from 'antd'

const {
  Item: FormItem,
} = Form

class InfoForm extends React.Component {
  handleCloseChangepedModal = () => {
    this.props.dispatch({ type: 'userinfo/closeChangepwdModal' })
    this.props.form.resetFields()
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
      form: {
        getFieldDecorator,
      },
      nickname,
      summary,
      account,
      isChangepwdModalDisplay,
      date,
    } = this.props


    return (
      <Modal
        title='修改个人资料'
        visible={isChangepwdModalDisplay}
        onCancel={this.handleCloseChangepedModal}
      >
        <Form>
          <FormItem
            {...formItemOptions}
            label='账号'
          >
            {
              getFieldDecorator('account', {
                initialValue: account,
              })(<Input disabled />)
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
            label='签名'
          >
            {
              getFieldDecorator('summary', {
                initialValue: summary,
              })(<Input type='textarea' />)
            }
          </FormItem>
          <FormItem
            {...formItemOptions}
            label='注册时间'
          >
            {
              getFieldDecorator('data', {
                initialValue: date,
              })(<Input disabled />)
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
      </Modal>
    )
  }
}

export default Form.create({

})(InfoForm)
