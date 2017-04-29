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

class ApplyForm extends React.Component {
  handleCloseApplyModal = () => {
    this.props.dispatch({ type: 'userinfo/closeApplyFormModal' })
    this.props.form.resetFields()
  }

  handleApplySubmit = () => {
    const {
      dispatch,
      form: {
        getFieldsValue,
      },
    } = this.props

    const formValue = getFieldsValue()

    dispatch({
      type: 'userinfo/postApplyLecturer',
      payload: {
        ...formValue,
        token: Auth.getToken(),
        card_front_image: `http://video.app${formValue.card_front_image.fileList[0].response.data.file_path}`,
        card_back_image: `http://video.app${formValue.card_back_image.fileList[0].response.data.file_path}`,
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
      isApplyFormDisplay,
    } = this.props


    return (
      <Modal
        title='申请讲师认证'
        visible={isApplyFormDisplay}
        onCancel={this.handleCloseApplyModal}
        onOk={this.handleApplySubmit}
      >
        <Form>
          <FormItem
            {...formItemOptions}
            label='身份证号'
          >
            {
              getFieldDecorator('card_number')(<Input />)
            }
          </FormItem>
          <FormItem
            {...formItemOptions}
            label='上传身份证正面'
          >
            {
              getFieldDecorator('card_front_image')(
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
          <FormItem
            {...formItemOptions}
            label='上传身份证反面'
          >
            {
              getFieldDecorator('card_back_image')(
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

})(ApplyForm)
