import React from 'react'
import { connect } from 'dva'

import Button from './button'
import Num from './num'

import Style from './info.less'


class Info extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '江肖',
    }
  }

  render() {
    return (
      <div>
        <p className={Style.name}>姓名：{this.state.name}</p>
        <p className={Style.name}>年龄：
          <Num />
          <Button />
        </p>
      </div>
    )
  }

}

export default connect()(Info)
