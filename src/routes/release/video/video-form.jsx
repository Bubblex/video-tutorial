import React from 'react'

import {
  Form,
  Input,
  Button,
  message,
  Upload,
  Icon,
} from 'antd'

import Auth from '../../../utils/auth'

const { Dragger } = Upload
const {
  Item: FormItem,
} = Form

class VideoForm extends React.Component {
  handleReleaseVideoSubmit = (e) => {
    e.preventDefault()

    const {
      dispatch,
      form: {
        getFieldsValue,
      },
    } = this.props

    const formValue = getFieldsValue()

    dispatch({
      type: 'video/postVideoRelease',
      payload: {
        ...formValue,
        token: Auth.getToken(),
        cover: `http://video.app${formValue.cover.fileList[0].response.data.file_path}`,
        video_url: `http://video.app${formValue.video_url.fileList[0].response.data.file_path}`,
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
    } = this.props

    return (
      <Form onSubmit={this.handleReleaseVideoSubmit}>
        <FormItem
          {...formItemOptions}
          label='视频教程名称'
        >
          {
            getFieldDecorator('title', {
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
          label='简介'
        >
          {
            getFieldDecorator('summary', {
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
          label='视频缩略图'
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
                listType='picture-card'
              >
                <Icon type='upload' />
                <div className='ant-upload-text'>上传</div>
              </Upload>)
          }
        </FormItem>
        <FormItem
          {...formItemOptions}
          label='视频缩略图'
        >
          {
            getFieldDecorator('video_url', {
              rules: [
                {
                  required: true,
                  message: '封面图不能为空',
                },
              ],
            })(<Dragger
              multiple={false}
              action='http://video.app/api/upload'
            >
              <p className='ant-upload-drag-icon' style={{ marginTop: '30px' }}>
                <Icon type='inbox' />
              </p>
              <p className='ant-upload-text'>点击或拖动文件到该区域进行上传</p>
              <p className='ant-upload-hint' style={{ marginBottom: '30px' }}>上传格式说明巴拉巴拉巴拉</p>
            </Dragger>)
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

})(VideoForm)
