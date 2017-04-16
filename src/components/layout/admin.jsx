import React from 'react'
import classNames from 'classnames'
import { Link } from 'dva/router'

import {
  Icon,
  Layout,
  Breadcrumb,
} from 'antd'

import AdminSideBar from '../sidebar/admin'

import {
  WEBSITE_TITLE,
  WEBSITE_LOGO,
  SIDER_WIDTH,
} from '../../config'

import {
  URL_ADMIN_USER,
} from '../../config/web'

import basicStyles from './basic.less'
import styles from './admin.less'

const { Item: BreadcrumbItem } = Breadcrumb
const {
  Header,
  Sider,
  Footer,
  Content,
} = Layout

function createBreadcrumb(breadcrumb = []) {
  return breadcrumb.map(({ text, link, icon }, index) => {
    return (
      <BreadcrumbItem key={index}>
        {
          icon
          &&
          <Icon type={icon} />
        }
        {text}
      </BreadcrumbItem>
    )
  })
}

class AdminLayout extends React.Component {
  render() {
    const {
      menuClass,
      layoutClass,
      contentClass,
      mainClass,

      children,
      breadcrumb,
    } = this.props

    return (
      <Layout className={classNames(styles.layout, layoutClass)}>
        <Sider width={SIDER_WIDTH}>
          <div className={classNames(basicStyles.logo, styles.adminLogo)}>
            <img src={WEBSITE_LOGO} alt={WEBSITE_TITLE} />
          </div>
          <div className={styles.sider}>
            <AdminSideBar className={menuClass} />
          </div>
        </Sider>
        <Layout>
          <Header>

          </Header>
          <Layout className={classNames(styles.content, contentClass)}>
            <Breadcrumb className={styles.breadcrumb}>
              <BreadcrumbItem>
                <Link to={URL_ADMIN_USER}><Icon type='home' />首页</Link>
              </BreadcrumbItem>
              {createBreadcrumb(breadcrumb)}
            </Breadcrumb>
            <Content className={classNames(styles.main, mainClass)}>
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

export default AdminLayout
