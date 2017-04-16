import React from 'react'
import classNames from 'classnames'

import styles from './container.less'

/**
 * 容器组件
 * 一个普通的容器，用来限制网页内容的大小，居中显示在网页中间
 *
 * @class Container
 * @extends {React.Component}
 * @param {className} 该组件的样式
 * @param {children} 组件的内容
 * @example
 * <Container>Your Content</Container>
 */
class Container extends React.Component {
  render() {
    const {
      children,
      className,
    } = this.props

    return (
      <div className={classNames(styles.container, className)}>
        {children}
      </div>
    )
  }
}

export default Container
