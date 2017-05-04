import React from 'react'

import {
  Form,
  Input,
} from 'antd'

const { Item: FormItem } = Form

const { Search } = Input

class FilterForm extends React.Component {
  static defaultProps = {
    onSubmit: () => {},
  }
  handleSearch = () => {
    this.props.onSubmit(this.props.form.getFieldsValue())
  }
  render() {
    const {
      form: {
        getFieldDecorator,
      },
    } = this.props

    return (
      <Form>
        <FormItem>
          {
            getFieldDecorator('filter')(<Search style={{ width: 200 }} placeholder='请输入关键字' onSearch={this.handleSearch} />)
          }
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(FilterForm)
