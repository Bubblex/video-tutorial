import React from 'react'
import LzEditor from 'react-lz-editor'

import {
  Form,
  Input,
  Button,
  message,
  Upload,
  Icon,
} from 'antd'

import Auth from '../../../utils/auth'

const {
  Item: FormItem,
} = Form


class ArticleForm extends React.Component {
  onEditorStateChange = (contentState) => {
    console.log(contentState)
  }

  render() {
    const formItemOptions = {
      labelCol: {
        span: 5,
      },
      wrapperCol: {
        span: 15,
      },
    }

    const {
      form: {
        getFieldDecorator,
      },
    } = this.props

    return (
      <Form>
        <FormItem
          {...formItemOptions}
          label='标题'
        >
          {
            getFieldDecorator('title')(<Input />)
          }
        </FormItem>
        <FormItem
          {...formItemOptions}
          label='分类'
        >
          {
            getFieldDecorator('type_id')(<Input />)
          }
        </FormItem>
        <FormItem
          {...formItemOptions}
          label='封面图'
        >
          {
            getFieldDecorator('cover')(
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
          label='简介'
        >
          {
            getFieldDecorator('summary')(<Input type='textarea' />)
          }
        </FormItem>
        <FormItem
          {...formItemOptions}
          label='编辑内容'
        >
          {
            getFieldDecorator('content')(<LzEditor />)
          }
        </FormItem>
        <Button
          type='primary'
          htmlType='submit'
          size='large'
          style={{ margin: '0 auto 50px', width: '30%', display: 'block' }}
        >
          发布
        </Button>
      </Form>
    )
  }
}

export default Form.create({

})(ArticleForm)
