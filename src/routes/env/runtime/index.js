import React from 'react'
import { List, Avatar, Card, Row } from 'antd'
import styles from './styles.less'
import { connect } from 'dva'
import {
  Link
} from 'dva/router'
import runtime from '@config/runtime'


class Runtime extends React.Component {

  componentDidMount() {
    if (!this.props.env.isLaunch){
     this.props.dispatch({type: "env/info"})
    }
    this.props.dispatch({type: "env/installed"})
  }

  render() {
    const system = this.props.env.info
    const installedData = this.props.env.installed
    return (
      <div className={styles['g-container']}>
        <Row className={styles['m-row']}>
          <Card title="系统环境">
            <p><span className={styles['u-system-info-title']}>虚拟平台：</span>{ system.platform }</p>
            <p><span className={styles['u-system-info-title']}>主机名称：</span>{ system.hostName }</p>
            <p><span className={styles['u-system-info-title']}>发行版本：</span>{ system.publicVersion }</p>
            <p><span className={styles['u-system-info-title']}>内核版本：</span>{ system.coreVersion }</p>
            <p><span className={styles['u-system-info-title']}>CPU个数：</span>{ system.cpuNum } 个</p>
            <p><span className={styles['u-system-info-title']}>CPU核心：</span>{ system.cpuCore }</p>
          </Card>
        </Row>
        <Row className={styles['m-row']}>
          <Card title="安装环境">
            <List
              itemLayout="horizontal"
              dataSource={installedData}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={runtime[item.name.toLowerCase()].image} size='large'/>}
                    title={<Link to={`/env/runtime/${item.name.toLowerCase()}`}>{item.name}</Link>}
                    description={item.version}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Row>
      </div>
    )
  }
}

export default connect(((state) => ({env: state.env})))(Runtime)