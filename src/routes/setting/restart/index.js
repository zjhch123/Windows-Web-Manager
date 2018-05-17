import React from 'react'
import { connect } from 'dva'
import { withRouter } from 'dva/router'
import {
  message
} from 'antd'
import { restart } from '@services/setting'

import styles from './styles.less'

class Restart extends React.Component {

  restart = async () => {
    const result = await restart()
    if (result.data.code === 200) {
      message.success('操作成功!')
      this.props.dispatch({ type: 'user/logout' })
    } else {
      message.error('操作失败, 请重新试试')
    }

  }

  render() {
    return (
      <div ref="container" className={styles['g-container']}>
        <div className={styles['m-btn']}>
          <h2 className={styles['u-tip']}>真的要重启吗？重启会删除所有未保存的更改</h2>
          <button className={styles['u-btn']} onClick={() => this.restart()}>重启</button>
        </div>
      </div>
    )
  }
}

export default withRouter(connect()(Restart))