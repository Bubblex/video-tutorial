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

import {
  DEFAULT_AVATAR,
  DEFAULT_SUMMARY,
} from '../../../config'

import styles from '../../article/list/index.less'

class UserArticle extends React.Component {
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
      avatar: checkavatar,
      nickname,
      summary: checksummary,
      account,
      followers_num: followersNum,
      articles_num: articlesNum,
      videos_num: videosNum,
      stars_num: starsNum,
    } = Auth.getInfo('info')

    const avatar = checkavatar === null ? DEFAULT_AVATAR : checkavatar
    const summary = checksummary === null ? DEFAULT_SUMMARY : checksummary

    const {
      article: {
        articleDataList,
        articleListPagination,
      },
    } = this.props

    const renderArticleDataList = articleDataList.map((arr, index) => {
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
      >
        {renderArticleDataList}
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
})(UserArticle)
