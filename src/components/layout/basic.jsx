import React from 'react'
import classNames from 'classnames'
import { connect } from 'dva'

import {
  Menu,
  Layout,
} from 'antd'

import Container from '../container'
import HeaderAccount from '../header-account'

import {
  WEBSITE_TITLE,
  WEBSITE_LOGO,
} from '../../config'

import styles from './layout.less'

const { Item: MenuItem } = Menu
const {
  Header,
  Content,
  Footer,
} = Layout

class BasicLayout extends React.Component {
  render() {
    const {
      menuClass,
      layoutClass,
      headerClass,
      contentClass,
      footerClass,
    } = this.props

    return (
      <Layout className={classNames(styles.layout, layoutClass)}>
        <Header className={classNames(styles.header, headerClass)}>
          <Container>
            <div className={styles.logo}>
              <img src={WEBSITE_LOGO} alt={WEBSITE_TITLE} />
            </div>
            <Menu
              theme='dark'
              mode='horizontal'
              className={classNames(styles.menu, menuClass)}
            >
              <MenuItem key='1'>首页</MenuItem>
              <MenuItem key='2'>视频</MenuItem>
              <MenuItem key='3'>文章</MenuItem>
            </Menu>
            <HeaderAccount status={1} />
          </Container>
        </Header>
        <Content className={classNames(styles.content, contentClass)}>

        </Content>
        <Footer className={classNames(styles.footer, footerClass)}>
          {WEBSITE_TITLE} ©2017 江肖毕设
        </Footer>
      </Layout>
    )
  }
}

export default connect()(BasicLayout)
