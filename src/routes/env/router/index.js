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


class Router extends React.Component {

  componentDidMount() {
    this.props.dispatch({type: 'env/firstPath'})
  }

  render() {
    const dataSource = this.props.env.firstPath
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

export default connect(state => ({env: state.env}))(Router)