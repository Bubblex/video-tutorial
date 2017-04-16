import React from 'react'
import classNames from 'classnames'
import { Link } from 'dva/router'

import {
  Layout,
  Breadcrumb,
} from 'antd'

import AdminSideBar from '../sidebar/admin'

import {
  WEBSITE_TITLE,
  WEBSITE_LOGO,
  SIDER_WIDTH,
} from '../../config'

import basicStyles from './basic.less'
import styles from './admin.less'

const { Item: BreadcrumbItem } = Breadcrumb
const {
  Header,
  Sider,
  Footer,
  Content,
} = Layout

class AdminLayout extends React.Component {
  render() {
    const {
      menuClass,
      layoutClass,
      contentClass,
      mainClass,

      children
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
                <Link>首页</Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                用户管理
              </BreadcrumbItem>
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
