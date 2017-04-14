import React from 'react'
import { Router, Route } from 'dva/router'
import IndexPage from './routes/IndexPage'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path='/' component={IndexPage} />
      <Route path='/home' component={require('./routes/home/index')} />
    </Router>
  )
}

export default RouterConfig
