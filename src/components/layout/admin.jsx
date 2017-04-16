import React from 'react'
import classNames from 'classnames'

import {
  Menu,
  Layout,
} from 'antd'

import AdminSideBar from '../sidebar/admin'

import {
  WEBSITE_TITLE,
  WEBSITE_LOGO,
  SIDER_WIDTH,
} from '../../config'

import basicStyles from './basic.less'
import styles from './admin.less'

const { Item: MenuItem } = Menu
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
    } = this.props

    return (
      <Layout className={classNames(styles.layout, layoutClass)}>
        <Sider width={SIDER_WIDTH}>
          <div className={classNames(basicStyles.logo, styles.adminLogo)}>
            <img src={WEBSITE_LOGO} alt={WEBSITE_TITLE} />
          </div>
          <div className={styles.sider}>
            <AdminSideBar />
          </div>
        </Sider>
        <Layout>
          <Header>

          </Header>
          <Content>

          </Content>
          <Footer>
            {WEBSITE_TITLE} ©2017 江肖毕设
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default AdminLayout
