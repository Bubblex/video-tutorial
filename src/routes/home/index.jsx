import React from 'react'
import { Link } from 'dva/router'
import { connect } from 'dva'

import {
  Carousel,
  Card,
  Row,
  Col,
  Icon,
  Tag,
} from 'antd'

import BasicLayout from '../../components/layout/basic'
import Banner1 from './Banner_01.jpg'
import Banner2 from './Banner_02.jpg'
import Banner3 from './Banner_05.jpg'
import Banner4 from './Banner_06.jpg'
import center1 from './center1.png'
import center2 from './center2.jpg'
import center3 from './center3.jpg'
import center4 from './center4.jpg'
import center5 from './center5.jpg'

class Home extends React.Component {
  render() {
    const {
      login: {
        user: {
          avatar,
          nickname,
          summary,
        },
      },
      article: {
        articleDataList,
      },
      video: {
        videoDataList,
      },
    } = this.props

    const renderArtrcleList = articleDataList.map((arr, index) => {
      return (
        <Card key={index} style={{ width: '30%', float: 'left', margin: '15px' }}>
          <img src={arr.cover} alt={arr.title} style={{ width: '100%' }} />
          <h2>
            {
              arr.type_id === 1
              &&
              <Tag color='#f50'>邮票</Tag>
            }
            {
              arr.type_id === 2
              &&
              <Tag color='#2db7f5'>货币</Tag>
            }
            {
              arr.type_id === 3
              &&
              <Tag color='#87d068'>电话卡</Tag>
            }
            {arr.title}
          </h2>
          <p style={{ margin: '10px 0' }}>{arr.summary}</p>
          <Link to='/article/detail' query={{ id: arr.id }}>
            查看详情
          </Link>
        </Card>
      )
    })

    const renderVideoList = videoDataList.map((arr, index) => {
      return (
        <Card key={index} style={{ width: '30%', float: 'left', margin: '15px' }}>
          <img src={arr.cover} alt={arr.title} style={{ width: '100%' }} />
          <h2>{arr.title}</h2>
          <p style={{ margin: '10px 0' }}>{arr.summary}</p>
          <Link to='/video/detail' query={{ id: arr.id }}>查看详情</Link>
        </Card>
      )
    })

    return (
      <BasicLayout
        nickname={nickname}
        summary={summary}
        avatar={avatar}
      >
        <Carousel
          vertical='true'
          autoplay='true'
        >
          <div><img src={Banner1} alt='banner' style={{ width: '100%', height: '300px' }} /></div>
          <div><img src={Banner2} alt='banner' style={{ width: '100%', height: '300px' }} /></div>
          <div><img src={Banner3} alt='banner' style={{ width: '100%', height: '300px' }} /></div>
          <div><img src={Banner4} alt='banner' style={{ width: '100%', height: '300px' }} /></div>
        </Carousel>

        <Row style={{ marginTop: '20px' }}>
          <Col span={4} offset={1}><h2><Icon type='video-camera' /> 最新视频</h2></Col>
          <Col span={2} offset={17}><Link to='/video/list'>更多</Link></Col>
        </Row>
        <Row>{renderVideoList}</Row>

        <Row>
          <Col span={5} style={{ margin: '20px' }}>
            <Carousel
              autoplay='true'
              effect='fade'
              dots='false'
            >
              <div><img src={center1} alt='banner' style={{ width: '100%', height: '200px' }} /></div>
              <div><img src={center2} alt='banner' style={{ width: '100%', height: '200px' }} /></div>
              <div><img src={center3} alt='banner' style={{ width: '100%', height: '200px' }} /></div>
            </Carousel>
          </Col>
          <Col span={5} style={{ margin: '20px' }}>
            <Carousel
              autoplay='true'
              effect='fade'
              dots='false'
            >
              <div><img src={center2} alt='banner' style={{ width: '100%', height: '200px' }} /></div>
              <div><img src={center3} alt='banner' style={{ width: '100%', height: '200px' }} /></div>
              <div><img src={center4} alt='banner' style={{ width: '100%', height: '200px' }} /></div>
            </Carousel>
          </Col>
          <Col span={5} style={{ margin: '20px' }}>
            <Carousel
              autoplay='true'
              effect='fade'
              dots='false'
            >
              <div><img src={center3} alt='banner' style={{ width: '100%', height: '200px' }} /></div>
              <div><img src={center4} alt='banner' style={{ width: '100%', height: '200px' }} /></div>
              <div><img src={center5} alt='banner' style={{ width: '100%', height: '200px' }} /></div>
            </Carousel>
          </Col>
          <Col span={5} style={{ margin: '20px' }}>
            <Carousel
              autoplay='true'
              effect='fade'
              dots='false'
            >
              <div><img src={center4} alt='banner' style={{ width: '100%', height: '200px' }} /></div>
              <div><img src={center5} alt='banner' style={{ width: '100%', height: '200px' }} /></div>
              <div><img src={center1} alt='banner' style={{ width: '100%', height: '200px' }} /></div>
            </Carousel>
          </Col>
        </Row>

        <Row style={{ marginTop: '20px' }}>
          <Col span={4} offset={1}><h2><Icon type='file-text' /> 最新文章</h2></Col>
          <Col span={2} offset={17}><Link to='/article/list'>更多</Link></Col>
        </Row>
        <Row>{renderArtrcleList}</Row>
      </BasicLayout>
    )
  }
}

export default connect(({ article, login, video }) => {
  return {
    article,
    login,
    video,
  }
})(Home)
