import React from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'

import {
  Breadcrumb,
  Timeline,
  Card,
  Row,
  Col,
  Icon,
} from 'antd'

import {
  URL_HOME,
} from '../../../config/web'

import BasicLayout from '../../../components/layout/basic'
import VideoForm from './video-form'

class ReleaseVideo extends React.Component {
  render() {
    const {
      dispatch,
      userinfo: {
        userBasicInfo: {
          role_id: roleId,
        },
      },
      video: {
        videoDataList,
      },
    } = this.props

    const renderVideoList = videoDataList.map((arr, index) => {
      return (
        <Card
          key={index}
          style={{
            width: '30%',
            float: 'left',
            margin: '15px',
          }}
        >
          <Row>
            <img src={arr.cover} alt={arr.title} style={{ width: '100%' }} />
            <h3>
              {arr.title}
            </h3>
            <p style={{ margin: '10px 0' }}>{arr.summary}</p>
            <p>作者：{arr.author.nickname}</p>
            <p style={{ margin: '10px 0' }}>发布时间：{arr.created_at}</p>
            <Col span={5}><p><span>{arr.play_num}</span> <Icon type='eye-o' /></p></Col>
            <Col span={12}><p><span>{arr.collects_count}</span> <Icon type='heart-o' /></p></Col>
            {/* <Col span={2}><p><span>{arr.like_num}</span> <Icon type='heart-o' /> </p></Col>
            <Col span={2}><p><span>{arr.comment_num}</span> <Icon type='message' /> </p></Col>*/}
            <Col span={7}>
              <Link to='/video/detail' query={{ id: arr.id }}>
                查看详情
              </Link>
            </Col>
          </Row>
        </Card>
      )
    })

    return (
      <BasicLayout>
        <Breadcrumb separator='>' style={{ marginBottom: '15px' }}>
          <Breadcrumb.Item><Link to={URL_HOME}>首页</Link></Breadcrumb.Item>
          <Breadcrumb.Item>发布视频</Breadcrumb.Item>
        </Breadcrumb>
        {
          roleId === 1
          &&
          <Card style={{ width: '80%', margin: '0 auto' }}>
            <Timeline pending={<Link to='/user/info'>去认证</Link>}>
              <Timeline.Item color='red'>您当前为普通用户，暂无权限发表视频，需要认证讲师后发布视频。</Timeline.Item>
              <Timeline.Item>在个人中心 - 我的资料，点击申请认证讲师按钮。</Timeline.Item>
              <Timeline.Item>填写个人信息，提交认证，等待管理员审核。</Timeline.Item>
              <Timeline.Item>审核成功后即可发布视频。</Timeline.Item>
            </Timeline>
          </Card>
        }
        {
          roleId === 2
          &&
          <VideoForm dispatch={dispatch} />
        }
        <h1 style={{ textAlign: 'center', margin: '30px' }}>
          <Icon type='video-camera' />
          <span style={{ marginLeft: '30px' }}>最新视频教程推荐</span>
        </h1>
        {renderVideoList}
      </BasicLayout>
    )
  }
}

export default connect((state) => {
  return state
})(ReleaseVideo)
