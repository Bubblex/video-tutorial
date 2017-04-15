import React from 'react'
import { connect } from 'dva'
// import { Layout, Header, Content, Footer } from 'antd'

class VideoList extends React.Component {
  render() {
    return (
      <div>
        视频列表
        {/* <Layout>
          <Header>Header</Header>
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>*/}
      </div>
    )
  }
}

export default connect()(VideoList)
