import React from 'react'
import classNames from 'classnames'
import { Link } from 'dva/router'
import { connect } from 'dva'

import {
  Icon,
  Menu,
  Layout,
} from 'antd'

import {
  WEBSITE_TITLE,
  WEBSITE_LOGO,
  SIDER_WIDTH,
} from '../../config'

import {
  URL_ADMIN_USER,
  URL_ADMIN_ARTICLE,
  URL_ADMIN_VIDEO,
  URL_ADMIN_USER_CERTIFICATION,
  URL_ADMIN_VIDEO_REVIEW,
} from '../../config/web'

import styles from './dashboard.less'

const {
  Header,
  Footer,
  Sider,
  Content,
} = Layout

const { Item: MenuItem } = Menu

class AdminDashboard extends React.Component {
  render() {
    const {
      children,
      admin: {
        selectedMenuKey,
      },
    } = this.props

    return (
      <Layout className={classNames(styles.layout)}>
        <Sider width={SIDER_WIDTH}>
          <div className={classNames(styles.logo, styles.adminLogo)}>
            <img src={WEBSITE_LOGO} alt={WEBSITE_TITLE} />
          </div>
          <div className={styles.sider}>
            <Menu
              style={{ width: SIDER_WIDTH }}
              mode='inline'
              theme='dark'
              selectedKeys={[selectedMenuKey]}
            >
              <MenuItem key='1'>
                <Link to={URL_ADMIN_USER}><Icon type='user' />用户管理</Link>
              </MenuItem>
              <MenuItem key='2'>
                <Link to={URL_ADMIN_ARTICLE}><Icon type='file-text' />文章管理</Link>
              </MenuItem>
              <MenuItem key='3'>
                <Link to={URL_ADMIN_VIDEO}><Icon type='video-camera' />视频管理</Link>
              </MenuItem>
              <MenuItem key='4'>
                <Link to={URL_ADMIN_USER_CERTIFICATION}><Icon type='solution' />讲师认证</Link>
              </MenuItem>
              <MenuItem key='5'>
                <Link to={URL_ADMIN_VIDEO_REVIEW}><Icon type='clock-circle-o' />视频审核</Link>
              </MenuItem>
            </Menu>
          </div>
        </Sider>
        <Layout>
          <Header>
            <div style={{ float: 'right' }}>
              1
            </div>
          </Header>
          <Layout className={classNames(styles.content)}>
            <Content className={classNames(styles.main)}>
              {children}
            </Content>
          </Layout>
          <Footer>
            {WEBSITE_TITLE} ©2017 江肖毕设
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default connect((state) => {
  return state
})(AdminDashboard)
