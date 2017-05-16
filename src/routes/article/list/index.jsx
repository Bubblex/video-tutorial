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

import Auth from '../../../utils/auth'

const { CheckableTag } = Tag

class ArticleList extends React.Component {
  static defaultProps = {
    avatar: DEFAULT_AVATAR,
    username: DEFAULT_USERNAME,
  }

  handleChangePage = (current) => {
    const {
      dispatch,
      article: {
        CheckArticleType,
      },
    } = this.props
    dispatch({
      type: 'article/postArticleList',
      payload: {
        page: current,
        article_type: CheckArticleType,
      },
    })
  }

  handleCheckArticleType = (articleType) => {
    const {
      dispatch,
    } = this.props

    dispatch({
      type: 'article/postArticleList',
      payload: {
        article_type: articleType,
      },
    })

    dispatch({
      type: 'article/changeCheckedTag',
      CheckArticleType: articleType,
    })
  }

  render() {
    const {
      article: {
        articleDataList,
        userRecommendList,
        articleListPagination,
        CheckArticleType,
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
            <Col span={18} offset={1}>
              <Row>
                <Col span={20}>
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
                </Col>
                <Col span={4}>
                  <Link to='/article/detail' query={{ id: arr.id }}>
                    查看详情
                  </Link>
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
                  <p><span>{arr.read_num}</span> <Icon type='eye-o' /></p>
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

    const renderRecommendUser = userRecommendList.map((arr, index) => {
      return (
        <Link to={URL_USER} query={{ id: arr.id }} className={styles.user} key={index}>
          <img alt={arr.nickname} src={arr.avatar === null ? DEFAULT_AVATAR : arr.avatar} />
          <span>{arr.nickname}</span>
          <p>发布了{arr.collect_articles_num}篇文章资讯</p>
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
              <CheckableTag checked={CheckArticleType === 0} onChange={() => { this.handleCheckArticleType(0) }}>全部</CheckableTag >
              <CheckableTag checked={CheckArticleType === 1} onChange={() => { this.handleCheckArticleType(1) }}>邮票</CheckableTag >
              <CheckableTag checked={CheckArticleType === 2} onChange={() => { this.handleCheckArticleType(2) }}>货币</CheckableTag>
              <CheckableTag checked={CheckArticleType === 3} onChange={() => { this.handleCheckArticleType(3) }}>电话卡</CheckableTag>
            </div>
            {renderArtrcleList}
            {
              articleListPagination.total > articleListPagination.pageSize
              &&
              <Pagination
                {...articleListPagination}
                showQuickJumper
                style={{ float: 'right', margin: '20px' }}
                onChange={this.handleChangePage}
              />
            }
          </Col>
          <Col span={5} offset={1}>
            {
              Auth.getToken() != null
              &&
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
            }
            {
              Auth.getToken() === undefined
              &&
              <Link to='/account/login'>
                <Button
                  type='primary'
                  icon='edit'
                  size='large'
                  style={{ marginTop: 20, marginBottom: 20 }}
                >
                  发布资讯
                </Button>
              </Link>
            }

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
