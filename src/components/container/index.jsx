import React from 'react'
import classNames from 'classnames'

import styles from './container.less'

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
