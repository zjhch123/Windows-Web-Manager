import React from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import styles from './styles.less'
import {
  Table,
  Tabs
} from 'antd'
import AddRouterForm from '@components/Form/AddRouterForm'

const { Column } = Table;
const TabPane = Tabs.TabPane;
const data = {
  result: [
      {
        id: 1,
        url: 'http://139.129.132.196:8888',
        absPath: '/var/www/static',
        num: 8,
        server: 'httpd'
      },
      {
        id: 2,
        url: 'http://139.129.132.196:8888',
        absPath: '/var/www/static',
        num: 8,
        server: 'httpd'
      },
      {
        id: 3,
        url: 'http://139.129.132.196:8888',
        absPath: '/var/www/static',
        num: 8,
        server: 'nginx'
      },
      {
        id: 4,
        url: 'http://139.129.132.196:8888',
        absPath: '/var/www/static',
        num: 8,
        server: 'httpd'
      },
      {
        id: 5,
        url: 'http://139.129.132.196:8888',
        absPath: '/var/www/static',
        num: 8,
        server: 'httpd'
      },
      {
        id: 6,
        url: 'http://139.129.132.196:8888',
        absPath: '/var/www/static',
        num: 8,
        server: 'nginx'
      },
      {
        id: 7,
        url: 'http://139.129.132.196:8888',
        absPath: '/var/www/static',
        num: 8,
        server: 'httpd'
      },
      {
        id: 8,
        url: 'http://139.129.132.196:8888',
        absPath: '/var/www/static',
        num: 8,
        server: 'nginx'
      },
      {
        id: 9,
        url: 'http://139.129.132.196:8888',
        absPath: '/var/www/static',
        num: 8,
        server: 'httpd'
      },
      {
        id: 10,
        url: 'http://139.129.132.196:8888',
        absPath: '/var/www/static',
        num: 8,
        server: 'httpd'
      },
    ]
}

class Router extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addRouterModal: false
    }
  }
  render() {
    const  dataSource = data.result
    return (
      <div className={styles['g-container']}>
        <Tabs defaultActiveKey="1" tabBarStyle={{marginBottom: 0}}>
          <TabPane tab="一级路径列表" key="1">
            <Table 
              dataSource={dataSource}
              rowKey="id"
              pagination={false}>
              <Column
                title="URL"
                dataIndex="url"
                key="url"
                render={(text) => <a href={text} target="_blank">{text}</a>}
              />
              <Column
                title="绝对路径"
                dataIndex="absPath"
                key="absPath"/>
              <Column
                title="服务器"
                dataIndex="server"
                key="server"/>
              <Column
                title="挂载项目数"
                key="num"
                align="center"
                render={(text, record) => (<Link to={`/project/list`}>{record.num}</Link>)}/>
              <Column
                title="操作"
                key="manage"
                render={(text, record) => (<Link to={`/env/router/edit/${record.id}`}>编辑</Link>)}/>
            </Table>
          </TabPane>
          <TabPane tab="添加一级路径" key="2">
            <div className={styles['m-manage']}>
              <AddRouterForm />
            </div>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default connect()(Router)