import React from 'react'

import {
  Form,
  Input,
  Modal,
} from 'antd'

const {
  Item: FormItem,
} = Form

class ReviewConfirm extends React.Component {
  cleanForm = () => {
    this.props.form.resetFields()
  }
  handleSubmit = () => {
    const {
      onOk,
      onCancel,
      form: {
        getFieldsValue,
      },
    } = this.props

    onOk(getFieldsValue())
    onCancel()
  }
  render() {
    const {
      form: {
        getFieldDecorator,
      },
      visible,
      onCancel,
    } = this.props

    return (
      <Modal
        title='请输入拒绝理由'
        visible={visible}
        onOk={this.handleSubmit}
        onCancel={onCancel}
        afterClose={this.cleanForm}
      >
        <Form>
          <FormItem>
            {
              getFieldDecorator('content')(<Input type='textarea' />)
            }
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(ReviewConfirm)
