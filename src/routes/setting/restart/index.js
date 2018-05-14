import React from 'react'
import { connect } from 'dva'

import styles from './styles.less'

class Restart extends React.Component {

  componentDidMount = () => {
    
  }

  render() {
    return (
      <div ref="container" className={styles['g-container']}>
        <div className={styles['m-btn']}>
          <h2 className={styles['u-tip']}>真的要重启吗？重启会删除所有未保存的更改</h2>
          <button className={styles['u-btn']}>重启</button>
        </div>
      </div>
    )
  }
}

export default connect()(Restart)