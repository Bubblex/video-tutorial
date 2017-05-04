import React from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'

import {
  Tabs,
  Row,
  Col,
  Card,
  Tag,
} from 'antd'

import BasicLayout from '../../../components/layout/basic'
import UserData from '../../../components/user-data'

import styles from '../../article/list/index.less'

import Auth from '../../../utils/auth'

import {
  DEFAULT_AVATAR,
  DEFAULT_SUMMARY,
} from '../../../config'

const { TabPane } = Tabs

class UserIndex extends React.Component {

  renderUserFollersList = (key) => {
    const {
      dispatch,
    } = this.props

    dispatch({
      type: 'star/changeActiveTabKey',
      activeTabKey: key,
    })

    if (parseInt(key) === 4) {
      dispatch({
        type: 'star/postUserFollersList',
        payload: {
          id: this.props.routing.locationBeforeTransitions.query.id,
        },
      })
    }

    if (parseInt(key) === 3) {
      dispatch({
        type: 'star/postUserStarsList',
        payload: {
          id: this.props.routing.locationBeforeTransitions.query.id,
        },
      })
    }

    if (parseInt(key) === 2) {
      dispatch({
        type: 'article/postArticleList',
        payload: {
          id: this.props.routing.locationBeforeTransitions.query.id,
        },
      })
    }
  }

  render() {
    const {
      userinfo: {
        alluserBasicInfo: {
          avatar: checkavatar,
          nickname,
          summary: checksummary,
          followers_num: followersNum,
          articles_num: articlesNum,
          videos_num: videosNum,
          stars_num: starsNum,
          is_follow: isFollow,
          account,
          authentication,
        },
      },
      star: {
        activeTabKey,
      },
      location: {
        pathname,
        search,
      },
      article: {
        articleDataList,
      },
    } = this.props

    const avatar = checkavatar === null ? DEFAULT_AVATAR : checkavatar
    const summary = checksummary === null ? DEFAULT_SUMMARY : checksummary
    const nextPathname = pathname + search

    const renderFollowersList = this.props.star.userFollowersList === undefined
    ? null
    : this.props.star.userFollowersList.map((arr, index) => {
      return (
        <Col span={8} key={index}>
          <Link to='/user' query={{ id: arr.id }}>
            <Card style={{ width: '80%' }}>
              <img
                src={arr.avatar === null ? DEFAULT_AVATAR : arr.avatar}
                alt={arr.nickname}
                style={{ width: '100%', height: '240px,' }}
              />
              <p style={{ textAlign: 'center', marginTop: '20px' }}>{arr.nickname}</p>
              <p style={{ textAlign: 'center', marginTop: '20px' }}>{arr.summary === null ? DEFAULT_SUMMARY : arr.summary}</p>
            </Card>
          </Link>
        </Col>
      )
    })

    const renderStarsList = this.props.star.userStarrsList === undefined
    ? null
    : this.props.star.userStarrsList.map((arr, index) => {
      return (
        <Col span={8} key={index}>
          <Link to='/user' query={{ id: arr.id }}>
            <Card style={{ width: '80%' }}>
              <img
                src={arr.avatar === null ? DEFAULT_AVATAR : arr.avatar}
                alt={arr.nickname}
                style={{ width: '100%', height: '240px,' }}
              />
              <p style={{ textAlign: 'center', marginTop: '20px' }}>{arr.nickname}</p>
              <p style={{ textAlign: 'center', marginTop: '20px' }}>{arr.summary === null ? DEFAULT_SUMMARY : arr.summary}</p>
            </Card>
          </Link>
        </Col>
      )
    })

    const renderArticleList = articleDataList === undefined
    ? null
    : articleDataList.map((arr, index) => {
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
        contentBefore={UserData}
        nickname={nickname}
        summary={summary}
        avatar={avatar}
        followers_num={followersNum}
        articles_num={articlesNum}
        videos_num={videosNum}
        stars_num={starsNum}
        isFollow={isFollow}
        nextPathname={nextPathname}
        account={account}
        authenticate={authentication}
      >
        <Tabs activeKey={activeTabKey} onTabClick={this.renderUserFollersList}>
          <TabPane tab='视频教程' key='1'>
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab='文章资讯' key='2'>
            {renderArticleList}
          </TabPane>
          <TabPane tab='关注' key='3'>
            <Row>
              {renderStarsList}
            </Row>
          </TabPane>
          <TabPane tab='粉丝' key='4'>
            <Row>
              {renderFollowersList}
            </Row>
          </TabPane>
        </Tabs>
      </BasicLayout>
    )
  }
}

export default connect((state) => {
  return state
})(UserIndex)
