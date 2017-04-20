import React from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'

import {
  Steps,
  Icon,
  Upload,
  Button,
  Row,
  Col,
  Input,
  Alert,
  Breadcrumb,
} from 'antd'

import {
  URL_HOME,
} from '../../../config/web'

import BasicLayout from '../../../components/layout/basic'

const { Step } = Steps
const { Dragger } = Upload

class ReleaseVideo extends React.Component {
  render() {
    return (
      <BasicLayout>
        <Breadcrumb separator='>' style={{ marginBottom: '15px' }}>
          <Breadcrumb.Item><Link to={URL_HOME}>首页</Link></Breadcrumb.Item>
          <Breadcrumb.Item>发布视频</Breadcrumb.Item>
        </Breadcrumb>
        <Steps style={{ marginTop: '30px', marginBottom: '30px' }}>
          <Step status='finish' title='上传视频' icon={<Icon type='upload' />} />
          <Step status='process' title='填写简介' icon={<Icon type='edit' />} />
          <Step status='wait' title='发布完成' icon={<Icon type='smile-o' />} />
        </Steps>
        <Dragger multiple={false}>
          <p className='ant-upload-drag-icon' style={{ marginTop: '30px' }}>
            <Icon type='inbox' />
          </p>
          <p className='ant-upload-text'>点击或拖动文件到该区域进行上传</p>
          <p className='ant-upload-hint' style={{ marginBottom: '30px' }}>上传格式说明巴拉巴拉巴拉</p>
        </Dragger>
        <Row style={{ clear: 'both', marginBottom: '20px' }}>
          <Col span={3} offset={21} style={{ textAlign: 'right' }}>
            <Button
              type='primary'
              icon='arrow-right'
              size='large'
              style={{ marginTop: 20, float: 'right' }}
            >
              下一步
            </Button>
          </Col>
        </Row>

        <Row style={{ clear: 'both', marginBottom: '20px' }}>
          <Col span={5} style={{ textAlign: 'right' }}>视频教程名称： </Col>
          <Col span={16}>
            <Input placeholder='请输入视频教程名称' />
          </Col>
        </Row>
        <Row style={{ clear: 'both', marginBottom: '20px' }}>
          <Col span={5} style={{ textAlign: 'right' }}>视频教程简介： </Col>
          <Col span={16}>
            <Input placeholder='请输入视频教程简介' type='textarea' rows={5} />
          </Col>
        </Row>
        <Row style={{ clear: 'both', marginBottom: '20px' }}>
          <Col span={5} style={{ textAlign: 'right' }}>视频缩略图： </Col>
          <Col span={16}>
            <Upload>
              <Button>
                <Icon type='upload' /> 点击上传
              </Button>
            </Upload>
          </Col>
        </Row>
        <Row style={{ clear: 'both', marginBottom: '20px' }}>
          <Col span={3} offset={18} style={{ textAlign: 'right' }}>
            <Button
              type='default'
              icon='arrow-left'
              size='large'
              style={{ marginTop: 20, float: 'right' }}
            >
              上一步
            </Button>
          </Col>
          <Col span={3} style={{ textAlign: 'right' }}>
            <Button
              type='primary'
              icon='arrow-right'
              size='large'
              style={{ marginTop: 20, float: 'right' }}
            >
              发布视频
            </Button>
          </Col>
        </Row>
        <Alert
          message='上传成功 正在审核'
          description='后台审核后可发布到平台，审核进度可在个人中心查看'
          type='success'
          showIcon
          style={{ margin: 50 }}
        />
        <Alert
          message='上传失败 请重新上传'
          description='服务器响应错误'
          type='error'
          showIcon
          style={{ margin: 50 }}
        />
        <Row style={{ clear: 'both', marginBottom: '20px' }}>
          <Col span={3} offset={18} style={{ textAlign: 'right' }}>
            <Button
              type='default'
              icon='arrow-left'
              size='large'
              style={{ marginTop: 20, float: 'right' }}
            >
              再次发布
            </Button>
          </Col>
          <Col span={3} style={{ textAlign: 'right' }}>
            <Button
              type='primary'
              icon='arrow-right'
              size='large'
              style={{ marginTop: 20, float: 'right' }}
            >
              个人中心
            </Button>
          </Col>
        </Row>
      </BasicLayout>
    )
  }
}

export default connect()(ReleaseVideo)
