import React from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'

import {
  Row,
  Col,
  Tag,
  Button,
  Breadcrumb,
  message,
} from 'antd'

import BasicLayout from '../../../components/layout/basic'
import SummaryCard from '../../../components/summary-card/index'
import UserCard from '../../../components/user-card/index'
import Comment from '../../../components/comment/index'

import {
  DEFAULT_AVATAR,
  DEFAULT_USERNAME,
} from '../../../config'

import {
  URL_HOME,
  URL_ARTICLE_LIST,
} from '../../../config/web'

import Auth from '../../../utils/auth'

const { CheckableTag } = Tag

class ArticleDetail extends React.Component {
  static defaultProps = {
    avatar: DEFAULT_AVATAR,
    username: DEFAULT_USERNAME,
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  handleCollectArticle = (e) => {
    e.preventDefault()

    const {
      dispatch,
      location: {
        pathname,
        search,
      },
    } = this.props

    const {
      router: {
        replace,
      },
    } = this.context

    dispatch({
      type: 'article/postCollectArticle',
      payload: {
        token: Auth.getToken(),
        id: this.props.routing.locationBeforeTransitions.query.id,
      },
      message,
      replace,
      nextPathname: pathname + search,
    })

    dispatch({
      type: 'article/postArticleDetail',
      payload: {
        token: Auth.getToken(),
        id: this.props.routing.locationBeforeTransitions.query.id,
      },
    })
  }

  handleCancelCollectArticle = (e) => {
    e.preventDefault()

    const {
      dispatch,
    } = this.props

    dispatch({
      type: 'article/postCancelCollectArticle',
      payload: {
        token: Auth.getToken(),
        id: this.props.routing.locationBeforeTransitions.query.id,
      },
      message,
    })

    dispatch({
      type: 'article/postArticleDetail',
      payload: {
        token: Auth.getToken(),
        id: this.props.routing.locationBeforeTransitions.query.id,
      },
    })
  }

  render() {
    const {
      username,
      article: {
        articleDetails: {
          title,
          type_id: typeId,
          created_at: createdAt,
          read_num: readNum,
          summary,
          content,
          is_collect: isCollect,
          collects_count: collectsCount,
          article_author: {
            id,
            nickname,
            avatar,
            user_articles_count,
            user_followers_count,
            user_videos_count,
          },
        },
      },
    } = this.props

    const roleId = 1

    return (
      <BasicLayout >
        <Breadcrumb separator='>' style={{ marginBottom: '15px' }}>
          <Breadcrumb.Item><Link to={URL_HOME}>首页</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to={URL_ARTICLE_LIST}>文章资讯</Link></Breadcrumb.Item>
          <Breadcrumb.Item>{title}</Breadcrumb.Item>
        </Breadcrumb>
        <SummaryCard
          username={username}
          title={title}
          createdAt={createdAt}
          readNum={readNum}
          summary={summary}
          id={id}
          nickname={nickname}
          avatar={avatar}
          roleId={roleId}
          collectsCount={collectsCount}
        />
        <Row>
          <Col span={5}>
            <div style={{ margin: '10px 0' }}>
              {
                typeId === 1
                &&
                <Tag color='#f50' style={{ marginLeft: '20px' }}>邮票</Tag>
              }
              {
                typeId === 2
                &&
                <Tag color='#2db7f5' style={{ marginLeft: '20px' }}>货币</Tag>
              }
              {
                typeId === 3
                &&
                <Tag color='#87d068' style={{ marginLeft: '20px' }}>电话卡</Tag>
              }
            </div>
          </Col>
          <Col span={4} offset={15}>
            {
              id === Auth.getInfo().id
              &&
              <Link to='/release/article' query={{ id: this.props.routing.locationBeforeTransitions.query.id }}>
                <Button size='large'>
                  编辑
                </Button>
              </Link>
            }
          </Col>
        </Row>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <Row>
          <Col span={1} offset={23}>
            {/* <CheckableTag color='#f50' style={{ marginTop: '10px' }}>投诉</CheckableTag>*/}
          </Col>
        </Row>
        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
          <UserCard
            avatar={avatar}
            username={username}
            id={id}
            nickname={nickname}
            user_articles_count={user_articles_count}
            user_followers_count={user_followers_count}
            user_videos_count={user_videos_count}
          />
        </div>
        {
          isCollect === 2
          &&
          <Button type='primary' icon='heart-o' size='large' onClick={this.handleCollectArticle}>收藏文章 | {collectsCount}</Button>
        }
        {
          isCollect === 1
          &&
          <Button type='primary' icon='heart-o' size='large' onClick={this.handleCancelCollectArticle}>取消收藏文章 | {collectsCount}</Button>
        }
        <div style={{ marginTop: '30px' }}>
          {/* <h2 style={{ margin: '30px', paddingBottom: '10px', borderBottom: '1px solid rgb(204, 204, 204)' }}>8条评论</h2>*/}
        </div>
      </BasicLayout>
    )
  }
}

export default connect((state) => {
  return state
})(ArticleDetail)
