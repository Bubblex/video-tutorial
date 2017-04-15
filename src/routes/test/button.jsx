import React from 'react'

class Button extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      num: 2,
      status: 0,
    }
    this.statusMap = {
      0: '增加',
      1: '减少',
    }
  }

  render() {
    const handleClick = () => {
      this.setState({
        num: this.state.status === 0 ? this.state.num + 1 : this.state.num - 1,
        status: this.state.status === 0 ? this.state.status = 1 : this.state.status = 0,
      })
      console.log(this.state)
    }
    return (
      <button onClick={handleClick}>{this.statusMap[this.state.status]}</button>
    )
  }
}

export default Button
