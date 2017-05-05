import React from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'

import {
  Card,
  Row,
  Col,
  Tag,
  Pagination,
} from 'antd'

import BasicLayout from '../../../components/layout/basic'
import UserData from '../../../components/user-data'
import Auth from '../../../utils/auth'

import styles from '../../article/list/index.less'


import {
  DEFAULT_AVATAR,
  DEFAULT_SUMMARY,
} from '../../../config'

const { CheckableTag } = Tag

class UserLike extends React.Component {
  componentDidMount() {
    const {
      dispatch,
    } = this.props

    dispatch({
      type: 'userinfo/postUserInfo',
      payload: {
        token: Auth.getToken('token'),
      },
    })
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
        id: Auth.getInfo().id,
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
        id: Auth.getInfo().id,
      },
    })

    dispatch({
      type: 'article/changeCheckedTag',
      CheckArticleType: articleType,
    })
  }

  render() {
    const {
      avatar: checkavatar,
      nickname,
      summary: checksummary,
      account,
      followers_num: followersNum,
      articles_num: articlesNum,
      videos_num: videosNum,
      stars_num: starsNum,
      authentication,
    } = Auth.getInfo('info')

    const avatar = checkavatar === null ? DEFAULT_AVATAR : checkavatar
    const summary = checksummary === null ? DEFAULT_SUMMARY : checksummary

    const {
      article: {
        articleDataList,
        articleListPagination,
        CheckArticleType,
      },
    } = this.props

    const renderArtrcleList = articleDataList.map((arr, index) => {
      return (
        <Card key={index} className={styles.item}>
          <Row>
            <Col span={5}>
              <img src={arr.cover} alt={arr.title} style={{ width: '100%' }} />
            </Col>
            <Col span={16} offset={1}>
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

    return (
      <BasicLayout
        hasSider
        contentBefore={UserData}
        nickname={nickname}
        summary={summary}
        avatar={avatar}
        followers_num={followersNum}
        articles_num={articlesNum}
        videos_num={videosNum}
        stars_num={starsNum}
        account={account}
        authenticate={authentication}
      >
        <h2 style={{ marginBottom: 24, borderBottom: '1px solid #ccc', paddingBottom: 10 }}>我收藏的文章资讯</h2>
        <div style={{ marginTop: '20px' }}>
          <CheckableTag checked={CheckArticleType === 0} onChange={() => { this.handleCheckArticleType(0) }}>全部</CheckableTag >
          <CheckableTag checked={CheckArticleType === 1} onChange={() => { this.handleCheckArticleType(1) }}>邮票</CheckableTag >
          <CheckableTag checked={CheckArticleType === 2} onChange={() => { this.handleCheckArticleType(2) }}>货币</CheckableTag>
          <CheckableTag checked={CheckArticleType === 3} onChange={() => { this.handleCheckArticleType(3) }}>电话卡</CheckableTag>
        </div>
        {renderArtrcleList}
        <Pagination
          {...articleListPagination}
          showQuickJumper
          style={{ float: 'right', margin: '20px' }}
          onChange={this.handleChangePage}
        />
      </BasicLayout>
    )
  }
}

export default connect((state) => {
  return state
})(UserLike)
