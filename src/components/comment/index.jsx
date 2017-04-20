import React from 'react'

import {
  Row,
  Col,
  Icon,
  Button,
  Input,
} from 'antd'

import {
  DEFAULT_AVATAR,
  DEFAULT_USERNAME,
} from '../../config'

import styles from './index.less'

class Comment extends React.Component {
  static defaultProps = {
    avatar: DEFAULT_AVATAR,
    username: DEFAULT_USERNAME,
  }

  render() {
    const {
      avatar,
      username,
    } = this.props
    return (
      <div style={{ margin: '30px', paddingBottom: '20px', borderBottom: '1px solid rgb(204, 204, 204)' }}>
        <Row>
          <Col span={1}>
            <img src={avatar} alt={username} className={styles.avatar} />
          </Col>
          <Col span={18} style={{ paddingLeft: '20px' }}>
            <p>{username}</p>
            <p>
              <span >1楼</span>
              <span style={{ marginLeft: '20px' }}>2017-1-1 14:20</span>
            </p>
          </Col>
        </Row>
        <p style={{ marginTop: '8px', marginBottom: '10px' }}>评论评论评论</p>
        <Row>
          <Col span={4}>
            <a><Icon type='message' /> 回复</a>
            <a style={{ marginLeft: '20px' }}><Icon type='delete' /> 删除</a>
          </Col>
          <Col span={2} offset={18}>
            <a><Icon type='dislike-o' /> 举报</a>
          </Col>
        </Row>
        <div style={{ margin: '10px', padding: '10px 0 0 20px ', borderLeft: '2px solid rgb(204, 204, 204)' }}>
          <div style={{ marginBottom: '10px', borderBottom: '1px dashed rgb(204, 204, 204)' }}>
            <Row style={{ marginBottom: '10px' }}>
              <Col span={2}><a>巴拉拉：</a></Col>
              <Col span={22}><a>@巴啊啊</a>回复内容回复内容回复内容回复内容</Col>
            </Row>
            <Row style={{ marginBottom: '10px' }}>
              <Col span={3}><span>2017-1-1 14:20</span></Col>
              <Col span={19}>
                <a><Icon type='edit' /> 回复</a>
                <a style={{ marginLeft: '20px' }}><Icon type='delete' /> 删除</a>
              </Col>
              <Col span={2}><a><Icon type='dislike-o' /> 举报</a></Col>
            </Row>
          </div>
          <a><Icon type='edit' />添加新评论</a>
          <Row style={{ marginBottom: '10px', marginTop: '20px' }}>
            <Col span={24}>
              <Input type='textarea' placeholder='写下你的评论...' rows={3} />
            </Col>
          </Row>
          <Row>
            <Col span={2} offset={20}>
              <Button>取消</Button>
            </Col>
            <Col span={2}>
              <Button type='primary'>发送</Button>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default Comment
