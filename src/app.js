import dva from 'dva'
import { browserHistory } from 'dva/router'

import './index.less'
import '../node_modules/video-react/dist/video-react.css'

// 1. Initialize
const app = dva(
  // 它使用浏览器中的 History API 用于处理 URL，创建一个像example.com/some/path这样真实的 URL
  { history: browserHistory },
)

// 2. Plugins
app.use({})

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'))

// 5. Start
app.start('#root')
