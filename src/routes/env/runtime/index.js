import React from 'react'
import { List, Avatar, Card, Row } from 'antd'
import styles from './styles.less'
import { connect } from 'dva'
import {
  Link
} from 'dva/router'
import runtime from '@config/runtime'

const data = [
  {
    name: 'Java',
    version: 'Java(TM) SE Runtime Environment (build 1.8.0_65-b17)'
  },
  {
    name: 'NodeJS',
    version: 'v8.9.0'
  },
  {
    name: 'Python',
    version: 'Python 2.7.3'
  },
  {
    name: 'PHP',
    version: 'version 5.7'
  },
  {
    name: 'httpd',
    version: 'Server version: Apache/2.2.15 (Unix)'
  },
  {
    name: 'mongoDB',
    version: 'MongoDB shell version: 3.2.13'
  },
  {
    name: 'mysql',
    version: '5.7.9'
  },
  {
    name: 'nginx',
    version: 'Server version: Nginx/1.2.3'
  },
];

class Runtime extends React.Component {
  render() {
    const system = {
      platform: 'KVM',
      hostName: 'iZ28b1b52l9Z',
      publicVersion: 'CentOS 6.5 Final',
      coreVersion: 'Linux 2.6.32-431.23.3.el6.x86_64 #1 SMP Thu Jul 31 17:20:51 UTC 2014',
      cpuNum: 1,
      cpuCore: 'Intel(R) Xeon(R) CPU E5-2682 v4 @ 2.50GHz (64bit)'
    }
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
              dataSource={data}
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

export default connect()(Runtime)