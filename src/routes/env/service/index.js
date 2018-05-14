import React from 'react'
import { Tabs } from 'antd'
import { connect } from 'dva'
import styles from './styles.less'

import ServiceList from '@components/List/ServiceList'


const TabPane = Tabs.TabPane;

const data = {"code":200,"result":{"http":[{"name":"httpd","status":"running"},{"name":"nginx","status":null}],"ftp":[{"name":"vsftpd","status":null}],"sql":[{"name":"mysqld","status":null},{"name":"mongodb","status":null},{"name":"memcached","status":null}],"mail":[{"name":"sendmail","status":null}],"system":[{"name":"sshd","status":"running"},{"name":"crond","status":"running"},{"name":"iptables","status":"running"},{"name":"NTP","status":"running"}]}}



class Service extends React.Component {
  render() {
    return (
      <div className={styles['g-container']}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="HTTP服务" key="1">
            <div className={styles['m-tabcontainer']}>
              <ServiceList dataSource={data.result.http}/>
            </div>
          </TabPane>
          <TabPane tab="FTP服务" key="2">
            <div className={styles['m-tabcontainer']}>
              <ServiceList dataSource={data.result.ftp}/>
            </div>
          </TabPane>
          <TabPane tab="数据库服务" key="3">
            <div className={styles['m-tabcontainer']}>
              <ServiceList dataSource={data.result.sql}/>
            </div>
          </TabPane>
          <TabPane tab="邮件服务" key="4">
            <div className={styles['m-tabcontainer']}>
              <ServiceList dataSource={data.result.mail}/>
            </div>
          </TabPane>
          <TabPane tab="系统服务" key="5">
            <div className={styles['m-tabcontainer']}>
              <ServiceList dataSource={data.result.system}/>
            </div>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default connect()(Service)