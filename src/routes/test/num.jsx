import React from 'react'

class Num extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      num: 1,
    }
  }
  render() {
    return (
      <span>{this.state.num}</span>
    )
  }
}

export default Num
