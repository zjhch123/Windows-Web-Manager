import React from 'react'
import { connect } from 'dva'
import { 
  Tabs, 
  Table, 
  Button,
  Tag,
  Popconfirm,
  Icon,
  Modal
 } from 'antd'
import styles from './styles.less'
import AddUserForm from '@components/Form/AddUserForm'
import AddUserGroupForm from '@components/Form/AddUserGroupForm'


const { Column } = Table
const ButtonGroup = Button.Group
const TabPane = Tabs.TabPane


class User extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      addUserFormVisible: false,
      addUserGroupFormVisible: false
    }
  }

  componentDidMount = () => {
    this.props.dispatch({type: 'setting/users'})
    this.props.dispatch({type: 'setting/groups'})
  }

  render() {
    const {
      users,
      groups
    } = this.props.setting
    return (
      <div className={styles['g-container']}>
        <Tabs defaultActiveKey="1" tabBarStyle={{marginBottom: 0}}>
          <TabPane tab="用户管理" key="1">
            <div className={styles['m-manage']}>
              <Button onClick={() => this.setState({addUserFormVisible: true})}>添加新用户</Button>
            </div>
            <Table 
              pagination={false}
              rowKey="pw_uid"
              size="middle"
              dataSource={users}>
              <Column 
                title="ID"
                dataIndex="pw_uid"
                key="pw_uid"
                align="center"/>
              <Column 
                title="状态"
                dataIndex="status"
                render={(text, record) => (<Tag color={record.lock ? 'red' : 'green'}>{record.lock ? '锁定' : '正常'}</Tag>)}/>
              <Column 
                title="用户名"
                dataIndex="pw_name"
                key="pw_name"/>
              <Column 
                title="备注"
                dataIndex="pw_gecos"
                key="pw_gecos"/>
              <Column 
                title="用户组"
                dataIndex="pw_gname"
                key="pw_gname"/>
              <Column 
                title="主目录"
                dataIndex="pw_dir"
                key="pw_dir"/>
              <Column 
                title="SHELL路径"
                dataIndex="pw_shell"
                key="pw_shell"/>
              <Column 
                title="操作"
                key="manage"
                align="center"
                render={(text, record) => (
                  <ButtonGroup size="small">
                    <Button>改</Button>
                    <Button type="danger">删</Button>
                  </ButtonGroup>
                )}/>
            </Table>
          </TabPane>
          <TabPane tab="用户组管理" key="2">
            <div className={styles['m-manage']}>
              <Button onClick={() => this.setState({addUserGroupFormVisible: true})}>添加新用户组</Button>
            </div>
            <Table
              dataSource={groups}
              pagination={false}
              rowKey="gr_gid"
              size="middle"
            >
              <Column
                title="ID"
                dataIndex="gr_gid"
                key="Id"
                align="center"/>
              <Column
                title="用户组"
                dataIndex="gr_name"
                key="gr_name"/>
              <Column
                title="组成员"
                dataIndex="gr_mem"
                key="gr_mem"
                align="center"
                render={(text, record) => 
                <span>{
                  text.map((item,) => 
                    <Popconfirm title="是否确定删除?" okText="确定" cancelText="取消" key={record.gr_gid + item}>
                      <Button size="small" style={{margin: '0 4px'}}>{item}<Icon type="close" style={{fontSize: 12}}/></Button>
                    </Popconfirm>)
                  }
                </span>}/>
              <Column 
                title="操作"
                key="gmanage"
                align="center"
                render={(text, record) => (
                  <ButtonGroup size="small">
                    <Button>改</Button>
                    <Button>添</Button>
                    <Button type="danger">删</Button>
                  </ButtonGroup>
                )}/>
            </Table>
          </TabPane>
        </Tabs>
        <Modal
          title="添加用户"
          visible={this.state.addUserFormVisible}
          footer={null}
          onOk={() => this.setState({addUserFormVisible: false})}
          onCancel={() => this.setState({addUserFormVisible: false})}
        >
          <AddUserForm />
        </Modal>
        <Modal
          title="添加用户组"
          visible={this.state.addUserGroupFormVisible}
          footer={null}
          onOk={() => this.setState({addUserGroupFormVisible: false})}
          onCancel={() => this.setState({addUserGroupFormVisible: false})}
        >
          <AddUserGroupForm />
        </Modal>
      </div>
    )
  }
}

export default connect(state => ({setting: state.setting}))(User)