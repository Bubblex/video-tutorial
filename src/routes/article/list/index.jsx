import React from 'react'
import { Link } from 'dva/router'
import { connect } from 'dva'

import {
  Carousel,
  Card,
  Row,
  Col,
  Pagination,
  Icon,
  Tag,
  Button,
  Breadcrumb,
} from 'antd'

import BasicLayout from '../../../components/layout/basic'

import styles from './index.less'
import {
  URL_HOME,
  URL_USER,
  URL_ARTICLE_DETAIL,
  URL_RELEASE_ARTICLE,
 } from '../../../config/web'

import {
  DEFAULT_AVATAR,
  DEFAULT_USERNAME,
} from '../../../config'

class ArticleList extends React.Component {
  static defaultProps = {
    avatar: DEFAULT_AVATAR,
    username: DEFAULT_USERNAME,
  }

  handleChangePage = (current) => {
    const {
      dispatch,
    } = this.props
    dispatch({
      type: 'article/postArticleList',
      payload: {
        page: current,
      },
    })
  }

  render() {
    const {
      article: {
        articleDataList,
        articleListPagination,
      },
    } = this.props

    const slickDatas = [{
      link: URL_ARTICLE_DETAIL,
      img: 'aaa.png',
    },
    {
      link: URL_ARTICLE_DETAIL,
      img: 'bbb.png',
    }]

    const renderSlick = slickDatas.map((slick, index) => {
      return (
        <Link className={styles.slick} to={slick.link} key={index}>
          <img alt='article' src={slick.img} />
        </Link>
      )
    })

    const renderArtrcleList = articleDataList.map((arr, index) => {
      return (
        <Card key={index} className={styles.item}>
          <Row>
            <Col span={5}>
              <img src={arr.cover} alt={arr.title} style={{ width: '100%' }} />
            </Col>
            <Col span={16} offset={1}>
              <h2> {arr.title}</h2>
              <p style={{ margin: '10px 0' }}>{arr.summary}</p>
              <Col span={10}>
                <p>作者：{arr.author.nickname}</p>
              </Col>
              <Col span={12}>
                <p>发布时间：{arr.created_at}</p>
              </Col>
            </Col>
            {/* <Col span={2} offset={8}><p><span>{arr.look_num}</span> <Icon type='eye-o' /> </p></Col>
            <Col span={2}><p><span>{arr.like_num}</span> <Icon type='heart-o' /> </p></Col>
            <Col span={2}><p><span>{arr.comment_num}</span> <Icon type='message' /> </p></Col>*/}
            <Col span={2}>
              <Link to='/article/detail' query={{ id: arr.id }}>
                查看详情
              </Link>
            </Col>
          </Row>
        </Card>
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

    return (
      <BasicLayout>
        <Breadcrumb separator='>' style={{ marginBottom: '15px' }}>
          <Breadcrumb.Item><Link to={URL_HOME}>首页</Link></Breadcrumb.Item>
          <Breadcrumb.Item>文章资讯</Breadcrumb.Item>
        </Breadcrumb>
        <Carousel autoplay>
          {renderSlick}
        </Carousel>
        <Row>
          <Col span={18}>
            <div style={{ marginTop: '20px' }}>
              <Tag color='#f50'>最新资讯</Tag>
              <Tag color='#87d068'>最热资讯</Tag>
            </div>
            {renderArtrcleList}
            <Pagination
              {...articleListPagination}
              showQuickJumper
              style={{ float: 'right', margin: '20px' }}
              onChange={this.handleChangePage}
            />
          </Col>
          <Col span={5} offset={1}>
            <Link to={URL_RELEASE_ARTICLE}>
              <Button
                type='primary'
                icon='edit'
                size='large'
                style={{ marginTop: 20, marginBottom: 20 }}
              >
                发布资讯
              </Button>
            </Link>
            <Card title='推荐作者'>
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
})(ArticleList)
