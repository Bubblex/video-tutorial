import React from 'react'
import classNames from 'classnames'
import { connect } from 'dva'

import {
  Menu,
  Layout,
  Row,
  Col,
  Icon,
} from 'antd'

import SideBar from '../sidebar'
import Container from '../container'
import HeaderSearch from '../header-search'
import HeaderAccount from '../header-account'

import {
  WEBSITE_TITLE,
  WEBSITE_LOGO,
  SIDER_WIDTH,
} from '../../config'


import styles from './basic.less'

const { Item: MenuItem } = Menu
const {
  Header,
  Content,
  Footer,
  Sider,

} = Layout

/**
 * 前台的基本布局组件
 *
 * @class BasicLayout
 * @extends {React.Component}
 */
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
              <MenuItem key='2'>视频教程</MenuItem>
              <MenuItem key='3'>文章资讯</MenuItem>
            </Menu>
            <div style={{ float: 'right' }}>
              <HeaderSearch />
              <HeaderAccount status={2} />
            </div>
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
          <Row>
            <Col span={6}><h3><Icon type='link' /> 友情链接</h3></Col>
            <Col span={6}><h3><Icon type='link' /> 相关站点</h3></Col>
            <Col span={6}><h3><Icon type='link' /> 交易中心</h3></Col>
            <Col span={6}><h3>Copyright © 2017</h3></Col>
          </Row>
          <Row>
            <Col span={6}>
              <p style={{ margin: '10px' }}><a target='_blank' href='http://www.shscce.com/html/shscce/index.shtml'>上海邮币卡交易中心</a></p>
              <p style={{ margin: '10px' }}><a target='_blank' href='http://www.csc.net.cn/'>中国邮币卡网</a></p>
              <p style={{ margin: '10px' }}><a target='_blank' href='http://www.youbicard.com/'>邮币卡之家</a></p>
            </Col>
            <Col span={6}>
              <p style={{ margin: '10px' }}><a target='_blank' href='http://www.zgnjs.com/'>南京文交所开户</a></p>
              <p style={{ margin: '10px' }}><a target='_blank' href='http://www.csc.net.cn/'>中国邮币卡网</a></p>
              <p style={{ margin: '10px' }}><a target='_blank' href='http://www.youbicard.com/'>邮币卡之家</a></p>
            </Col>
            <Col span={6}>
              <p style={{ margin: '10px' }}><a target='_blank' href='http://www.shscce.com/html/shscce/index.shtml'>上海邮币卡交易中心</a></p>
              <p style={{ margin: '10px' }}><a target='_blank' href='http://www.csc.net.cn/'>中国邮币卡网</a></p>
              <p style={{ margin: '10px' }}><a target='_blank' href='http://www.youbicard.com/'>邮币卡之家</a></p>
            </Col>
            <Col span={6}>
              <p style={{ margin: '10px' }}>{WEBSITE_TITLE}</p>
              <p style={{ margin: '10px' }}>Built with <a target='_blank' href='https://github.com/Bubblex'><Icon type='github' /> 江肖</a></p>
            </Col>
          </Row>
        </Footer>
      </Layout>
    )
  }
}

export default connect()(BasicLayout)
