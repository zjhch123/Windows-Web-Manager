import React from 'react'
import { List, Avatar } from 'antd'
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
    return (
      <div className={styles['g-container']}>
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
      </div>
    )
  }
}

export default connect()(Runtime)