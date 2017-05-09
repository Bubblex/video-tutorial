import React from 'react'
import { Link } from 'dva/router'
import { connect } from 'dva'

import {
  Breadcrumb,
  Carousel,
  Row,
  Col,
  Pagination,
  Button,
  Card,
  Icon,
} from 'antd'

import {
  URL_HOME,
  URL_VIDEO_DETAIL,
  URL_VIDEO_ARTICLE,
  URL_USER,
} from '../../../config/web'

import styles from '../../article/list/index.less'
import BasicLayout from '../../../components/layout/basic'

class VideoList extends React.Component {
  handleChangePage = (current) => {
    const {
      dispatch,
    } = this.props
    dispatch({
      type: 'video/postVideoList',
      payload: {
        page: current,
      },
    })
  }

  render() {
    const slickDatas = [{
      link: URL_VIDEO_DETAIL,
      img: 'aaa.png',
    },
    {
      link: URL_VIDEO_DETAIL,
      img: 'bbb.png',
    }]

    const renderSlick = slickDatas.map((slick, index) => {
      return (
        <Link className={styles.slick} to={slick.link} key={index}>
          <img alt='article' src={slick.img} />
        </Link>
      )
    })

    const recommendUserDatas = [{
      username: '11111',
      avatar: '',
    },
    {
      username: '222222',
      avatar: '',
    }]

    const renderRecommendUser = recommendUserDatas.map((recommenduser, index) => {
      return (
        <Link to={URL_USER} className={styles.user} key={index}>
          <img alt='11' src={recommenduser.avatar} />
          <span>{recommenduser.username}</span>
        </Link>
      )
    })

    const {
      video: {
        videoDataList,
        videoListPagination,
      },
    } = this.props

    const renderVideoList = videoDataList.map((arr, index) => {
      return (
        <Card key={index} className={styles.item}>
          <Row>
            <Col span={5}>
              <img src={arr.cover} alt={arr.title} style={{ width: '100%' }} />
            </Col>
            <Col span={18} offset={1}>
              <Row>
                <Col span={20}><h2>{arr.title}</h2></Col>
                <Col span={4}>
                  <Link to='/video/detail' query={{ id: arr.id }}>查看详情</Link>
                </Col>
              </Row>
              <p style={{ margin: '10px 0' }}>{arr.summary}</p>
              <Row>
                <Col span={7}>
                  <p>作者：{arr.author.nickname}</p>
                </Col>
                <Col span={11}>
                  <p>发布时间：{arr.created_at}</p>
                </Col>
                <Col span={3}>
                  <p><span>{arr.play_num}</span> <Icon type='eye-o' /></p>
                </Col>
                <Col span={3}>
                  <p><span>{arr.collects_count}</span> <Icon type='heart-o' /></p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      )
    })

    return (
      <BasicLayout>
        <Breadcrumb separator='>' style={{ marginBottom: '15px' }}>
          <Breadcrumb.Item><Link to={URL_HOME}>首页</Link></Breadcrumb.Item>
          <Breadcrumb.Item>视频教程</Breadcrumb.Item>
        </Breadcrumb>
        <Carousel autoplay>
          {renderSlick}
        </Carousel>
        <Row>
          <Col span={18}>
            {renderVideoList}
            <Pagination
              {...videoListPagination}
              showQuickJumper
              style={{ float: 'right', margin: '20px' }}
              onChange={this.handleChangePage}
            />
          </Col>
          <Col span={5} offset={1}>
            <Link to={URL_VIDEO_ARTICLE}>
              <Button
                type='primary'
                icon='edit'
                size='large'
                style={{ marginTop: 20, marginBottom: 20 }}
              >
                发布视频
              </Button>
            </Link>
            <Card title='推荐讲师'>
              {renderRecommendUser}
            </Card>
          </Col>
        </Row>
      </BasicLayout>
    )
  }
}

export default connect((state) => {
  return state
})(VideoList)
