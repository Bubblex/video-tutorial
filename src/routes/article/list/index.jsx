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
} from 'antd'

import BasicLayout from '../../../components/layout/basic'

import styles from './index.less'
import {
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

  render() {
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

    const articleListDatas = [{
      title: '文章标题',
      article_summary: '摘要',
      author: '作者',
      time: '2017-1-1',
      look_num: 333,
      like_num: 111,
      comment_num: 222,
      link: URL_ARTICLE_DETAIL,
    },
    {
      title: '文章标题',
      article_summary: '摘要',
      author: '作者',
      time: '2017-1-1',
      look_num: 333,
      like_num: 111,
      comment_num: 222,
      link: URL_ARTICLE_DETAIL,
    }]

    const renderArtrcleList = articleListDatas.map((articleList, index) => {
      return (
        <Link className={styles.item} to={articleList.link} key={index}>
          <Card>
            <h2> {articleList.title}</h2>
            <p>{articleList.article_summary}</p>
            <Row>
              <Col span={5}><p>{articleList.author}</p></Col>
              <Col span={5}><p>发布时间：{articleList.time}</p></Col>
              <Col span={2} offset={8}><p><span>{articleList.look_num}</span> <Icon type='eye-o' /> </p></Col>
              <Col span={2}><p><span>{articleList.like_num}</span> <Icon type='heart-o' /> </p></Col>
              <Col span={2}><p><span>{articleList.comment_num}</span> <Icon type='message' /> </p></Col>
            </Row>
          </Card>
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

    return (
      <BasicLayout>
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
            <Pagination showQuickJumper defaultCurrent={2} total={500} style={{ float: 'right', margin: '20px' }} />
          </Col>
          <Col span={5} offset={1}>
            <Button
              type='primary'
              icon='edit'
              size='large'
              style={{ marginTop: 20, marginBottom: 20 }}
              onClick={() => { window.location.href = URL_RELEASE_ARTICLE }}
            >
              发布资讯
            </Button>
            <Card title='推荐作者'>
              {renderRecommendUser}
            </Card>
          </Col>
        </Row>
      </BasicLayout>
    )
  }
}

export default connect()(ArticleList)
