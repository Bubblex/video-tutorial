import React from 'react'
import { connect } from 'dva'

import BasicLayout from '../../components/layout/basic'

class Home extends React.Component {
  render() {
    return (
      <BasicLayout />
    )
  }
}

export default connect()(Home)
