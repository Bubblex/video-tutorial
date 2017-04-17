import React from 'react'
import { connect } from 'dva'

class ReleaseArticle extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: 'hello word',
    }
  }

  handleOnchange = (e) => {
    this.setState({
      value: e.target.value,
    })
  }

  handleClick = () => {
    console.log(this.state.value)
  }

  handleControlledClick = () => {
    console.log(this.input.value)
  }

  render() {
    const arr = [{
      name: 'jiangxiao',
      age: '12',
    }, {
      name: 'xiaoxiao',
      age: '10',
    }]

    const handleArr = arr.map((mem, index) => {
      return (
        <div key={index}>
          <p>{mem.name}</p>
          <p>{mem.age}</p>
        </div>
      )
    })

    return (
      <div>
        <p>非受控组件</p>
        <input value={this.state.value} onChange={this.handleOnchange} />
        <button onClick={this.handleClick}>打印input值</button>
        <p>受控组件</p>
        <input ref={(input) => { this.input = input }} />
        <button onClick={this.handleControlledClick}>打印input值</button>
        <div>
          {handleArr}
        </div>
      </div>
    )
  }
}

export default connect()(ReleaseArticle)
