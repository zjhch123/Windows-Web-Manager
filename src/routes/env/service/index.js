import React from 'react'
import { Tabs, message } from 'antd'
import { connect } from 'dva'
import styles from './styles.less'

import { install } from '@services/env'
import { delay } from '@utils/tools'
import ServiceList from '@components/List/ServiceList'

const TabPane = Tabs.TabPane;


class Service extends React.Component {

  componentDidMount() {
    this.props.dispatch({type: 'env/services'})
  }

  install = async (name) => {
    message.warn(`已开始安装${name}`)
    const result = await install(name)
    await delay(Math.random() * 2000)
    if (result.data.code === 200) {
      message.success(`安装${name}完成`)
      this.props.dispatch({type: 'env/services'})
    } else {
      message.error(`安装${name}失败, 请手动安装`)
    }
  }

  render() {
    const services = this.props.env.services
    return (
      <div className={styles['g-container']}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="HTTP服务" key="1">
            <div className={styles['m-tabcontainer']}>
              <ServiceList install={(name) => this.install(name)} dataSource={services.http}/>
            </div>
          </TabPane>
          <TabPane tab="FTP服务" key="2">
            <div className={styles['m-tabcontainer']}>
              <ServiceList install={(name) => this.install(name)} dataSource={services.ftp}/>
            </div>
          </TabPane>
          <TabPane tab="数据库服务" key="3">
            <div className={styles['m-tabcontainer']}>
              <ServiceList install={(name) => this.install(name)} dataSource={services.sql}/>
            </div>
          </TabPane>
          <TabPane tab="邮件服务" key="4">
            <div className={styles['m-tabcontainer']}>
              <ServiceList install={(name) => this.install(name)} dataSource={services.mail}/>
            </div>
          </TabPane>
          <TabPane tab="系统服务" key="5">
            <div className={styles['m-tabcontainer']}>
              <ServiceList install={(name) => this.install(name)} dataSource={services.system}/>
            </div>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default connect(state => ({env: state.env}))(Service)