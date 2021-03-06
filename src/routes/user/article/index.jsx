import React from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'

import {
  Card,
  Row,
  Col,
  Tag,
  Pagination,
  Popconfirm,
  message,
  Icon,
} from 'antd'

import BasicLayout from '../../../components/layout/basic'
import UserData from '../../../components/user-data'
import Auth from '../../../utils/auth'

import {
  DEFAULT_AVATAR,
  DEFAULT_SUMMARY,
} from '../../../config'

import styles from '../../article/list/index.less'

const { CheckableTag } = Tag

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
      article: {
        CheckArticleType,
      },
    } = this.props
    dispatch({
      type: 'article/postArticleList',
      payload: {
        page: current,
        id: Auth.getInfo().id,
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
        id: Auth.getInfo().id,
      },
    })

    dispatch({
      type: 'article/changeCheckedTag',
      CheckArticleType: articleType,
    })
  }

  handleDeleteArticle = (e, index) => {
    e.preventDefault()

    const {
      dispatch,
      article: {
        articleDataList,
      },
    } = this.props

    dispatch({
      type: 'article/postDeleteArticle',
      payload: {
        id: articleDataList[index].id,
        token: Auth.getToken('token'),
      },
      message,
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
      userinfo: {
        userBasicInfo: {
          role_id: roleId,
        },
      },
    } = this.props

    const renderArticleDataList = articleDataList.map((arr, index) => {
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
                  <Link to='/article/detail' query={{ id: arr.id }} style={{ marginRight: '10px' }}>
                    查看详情
                  </Link>
                  <Popconfirm
                    title='确定删除该条文章'
                    onConfirm={(e) => { this.handleDeleteArticle(e, index) }}
                    okText='是'
                    cancelText='否'
                  >
                    <a href='javascript:'>删除</a>
                  </Popconfirm>
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
        roleId={roleId}
      >
        <h2 style={{ marginBottom: 24, borderBottom: '1px solid #ccc', paddingBottom: 10 }}>我发布的文章资讯</h2>
        <div style={{ marginTop: '20px' }}>
          <CheckableTag checked={CheckArticleType === 0} onChange={() => { this.handleCheckArticleType(0) }}>全部</CheckableTag >
          <CheckableTag checked={CheckArticleType === 1} onChange={() => { this.handleCheckArticleType(1) }}>邮票</CheckableTag >
          <CheckableTag checked={CheckArticleType === 2} onChange={() => { this.handleCheckArticleType(2) }}>货币</CheckableTag>
          <CheckableTag checked={CheckArticleType === 3} onChange={() => { this.handleCheckArticleType(3) }}>电话卡</CheckableTag>
        </div>
        {renderArticleDataList}
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
      </BasicLayout>
    )
  }
}

export default connect((state) => {
  return state
})(UserArticle)
