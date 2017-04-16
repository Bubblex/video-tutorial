import React from 'react'

import {
  Input,
} from 'antd'

import styles from './header-search.less'

const { Search } = Input

class HeaderSearch extends React.Component {
  render() {
    return (
      <div className={styles.headerSearch}>
        <Search className={styles.search} placeholder='请输入要搜索的内容' />
      </div>
    )
  }
}

export default HeaderSearch
