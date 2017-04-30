import React from 'react'

import {
  Menu,
  Layout,
} from 'antd'

const {
  Header,
  Footer,
  Sider,
  Content,
} = Layout

class AdminDashboard extends React.Component {
  render() {
    return (
      <Layout style={{ height: '100%' }}>
        <Header>
          头部
        </Header>
        <Layout>
          <Sider>
            侧边栏
          </Sider>
          <Content>
            内容
          </Content>
        </Layout>
        <Footer>
          底部
        </Footer>
      </Layout>
    )
  }
}

export default AdminDashboard
