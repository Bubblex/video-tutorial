import React from 'react'
import classNames from 'classnames'
import { connect } from 'dva'

import {
  Menu,
  Layout,
} from 'antd'

import SideBar from '../sidebar'
import Container from '../container'
import HeaderAccount from '../header-account'

import {
  WEBSITE_TITLE,
  WEBSITE_LOGO,
  SIDER_WIDTH,
} from '../../config'

import styles from './layout.less'

const { Item: MenuItem } = Menu
const {
  Header,
  Content,
  Footer,
  Sider,
} = Layout

class BasicLayout extends React.Component {
  render() {
    const {
      menuClass,
      layoutClass,
      headerClass,
      contentClass,
      footerClass,

      children,
      hasSider,
      contentBefore: ContentBefore,
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
        <Content>
          {
            ContentBefore
            &&
            <ContentBefore />
          }
          <Container className={styles.contentContainer}>
            <Layout>
              {
                hasSider
                &&
                <Sider className={styles.sider} width={SIDER_WIDTH}>
                  <SideBar />
                </Sider>
              }
              <Content className={classNames(styles.content, contentClass)}>
                {children}
              </Content>
            </Layout>
          </Container>
        </Content>
        <Footer className={classNames(styles.footer, footerClass)}>
          {WEBSITE_TITLE} ©2017 江肖毕设
        </Footer>
      </Layout>
    )
  }
}

export default connect()(BasicLayout)
