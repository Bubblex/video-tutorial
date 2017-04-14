import React from 'react'
import { connect } from 'dva'
import Button from '../../components/button'
import Info from '../../components/info'

class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = { info: 1 }
  }

  handleClick = () => {
    this.setState({ info: this.state.info + 1 })
  }

  render() {
    return (
      <div>
        <Info info={this.state.info} />
        <Button onClick={this.handleClick} />
      </div>
    )
  }

}

export default connect()(Home)
