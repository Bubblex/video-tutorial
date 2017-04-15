import React from 'react'
import { connect } from 'dva'

import Info from './info'

class Home extends React.Component {

  render() {
    return (
      <div>
        <Info />
      </div>
    )
  }

}

export default connect()(Home)
