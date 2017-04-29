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

import Auth from '../../../utils/auth'

const {
  Item: FormItem, 
} = Form

class InfoForm extends React.Component {
  handleCloseChangepedModal = () => {
    this.props.dispatch({ type: 'userinfo/closeChangepwdModal' })
    this.props.form.resetFields()
  }

  handleChangeInfoSubmit = () => {
    const {
      dispatch,
      form: {
        getFieldsValue,
      },
    } = this.props

    const formValue = getFieldsValue()

    dispatch({
      type: 'userinfo/postChangeInfo',
      payload: {
        ...formValue,
        token: Auth.getToken(),
        avatar: `http://video.app${formValue.avatar.fileList[0].response.data.file_path}`,
      },
      message,
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
        onOk={this.handleChangeInfoSubmit}
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
            {
              getFieldDecorator('avatar')(
                <Upload
                  action='http://video.app/api/upload'
                  listType='picture'
                >
                  <Button>
                    <Icon type='upload' /> 上传
                  </Button>
                </Upload>)
            }
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

export default Form.create({

})(InfoForm)
