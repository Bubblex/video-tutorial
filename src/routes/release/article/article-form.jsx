import React from 'react'
import LzEditor from 'react-lz-editor'

import {
  Form,
  Input,
  Button,
  message,
  Upload,
  Icon,
  Radio,
} from 'antd'

import Auth from '../../../utils/auth'

const {
  Item: FormItem,
} = Form

const {
  Group: RadioGroup,
} = Radio

class ArticleForm extends React.Component {
  getArticleContent = (content) => {
    const {
      dispatch,
    } = this.props

    dispatch({
      type: 'article/saveArticleContent',
      articleContent: content,
    })
  }

  handleReleaseArticleSubmit = (e) => {
    e.preventDefault()

    const {
      dispatch,
      form: {
        getFieldsValue,
      },
      articleContent,
      id,
    } = this.props

    const formValue = getFieldsValue()

    dispatch({
      type: 'article/postArticleRelease',
      payload: {
        ...formValue,
        id,
        content: articleContent,
        token: Auth.getToken(),
        cover: `http://video.app${formValue.cover.fileList[0].response.data.file_path}`,
      },
      message,
    })
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
      articleDetails: {
        title,
        cover,
        summary,
        content,
        type_id,
      },
    } = this.props

    return (
      <Form onSubmit={this.handleReleaseArticleSubmit}>
        <FormItem
          {...formItemOptions}
          label='标题'
        >
          {
            getFieldDecorator('title', {
              initialValue: title,
              rules: [
                {
                  required: true,
                  message: '标题不能为空',
                },
              ],
            })(<Input />)
          }
        </FormItem>
        <FormItem
          {...formItemOptions}
          label='分类'
        >
          {
            getFieldDecorator('type_id', {
              rules: [
                {
                  required: true,
                  message: '分类不能为空',
                },
              ],
              initialValue: type_id,
              valuePropName: 'checked',
            })(<RadioGroup>
              <Radio value={1}>邮票</Radio>
              <Radio value={2}>货币</Radio>
              <Radio value={3}>电话卡</Radio>
            </RadioGroup>)
          }
        </FormItem>
        <FormItem
          {...formItemOptions}
          label='封面图'
        >
          {
            getFieldDecorator('cover', {
              rules: [
                {
                  required: true,
                  message: '封面图不能为空',
                },
              ],
            })(
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
            getFieldDecorator('summary', {
              initialValue: summary,
              rules: [
                {
                  required: true,
                  message: '简介不能为空',
                },
              ],
            })(<Input type='textarea' />)
          }
        </FormItem>
        <FormItem
          {...formItemOptions}
          label='编辑内容'
        >
          {
            getFieldDecorator('content', {
              initialValue: content,
              rules: [
                {
                  required: true,
                  message: '内容不能为空',
                },
              ],
            })(<LzEditor cbReceiver={this.getArticleContent} video={false} />)
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
