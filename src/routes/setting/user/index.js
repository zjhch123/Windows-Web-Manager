import React from 'react'
import { connect } from 'dva'
import { 
  Tabs, 
  Table, 
  Button,
  Tag,
  Popconfirm,
  Icon,
  Modal,
  message
 } from 'antd'
import styles from './styles.less'
import AddUserForm from '@components/Form/AddUserForm'
import UpdateUserForm from '@components/Form/UpdateUserForm'
import AddUserGroupForm from '@components/Form/AddUserGroupForm'
import UpdateUserGroupForm from '@components/Form/UpdateUserGroupForm'
import AddUserToGroupForm from '@components/Form/AddUserToGroupForm'
import { deleteUser, deleteGroupUser, deleteGroup } from '@services/setting'


const { Column } = Table
const ButtonGroup = Button.Group
const TabPane = Tabs.TabPane
const confirm = Modal.confirm;



class User extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      addUserFormVisible: false,
      updateUserFormVisible: false,
      addUserGroupFormVisible: false,
      updateGroupFormVisible: false,
      updateUserGroupFormVisible: false,
      addUserToGroupFormVisible: false,
      updateUser: null,
      updateGroup: null,
      targetAddGroup: null
    }
  }

  componentDidMount = () => {
    this.props.dispatch({type: 'setting/users'})
    this.props.dispatch({type: 'setting/groups'})
  }

  deleteUser = async (id) => {
    const result = await deleteUser(id)
    if (result.data.code === 200) {
      message.success('删除成功!')
      this.props.dispatch({type: 'setting/users'})
    } else {
      message.error('删除失败, 请重新提交!')
    }
  }

  deleteBtnClick = (id, type) => {
    confirm({
      title: '真的要删除吗?',
      content: '删除将不可恢复',
      onOk: () => {
        switch(type) {
          case 'user': this.deleteUser(id); break
          case 'group': this.deleteGroup(id); break
          default: break
        }
      },
      onCancel() {
        return
      },
    });
  }

  deleteGroupUser = async (data) => {
    const result = await deleteGroupUser(data)
    if (result.data.code === 200) {
      message.success('删除成功!')
      this.props.dispatch({type: 'setting/groups'})
    } else {
      message.error('删除失败, 请重新提交!')
    }
  }

  deleteGroup = async (id) => {
    const result = await deleteGroup(id)
    if (result.data.code === 200) {
      message.success('删除成功!')
      this.props.dispatch({type: 'setting/groups'})
    } else {
      message.error('删除失败, 请重新提交!')
    }
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
                    <Button onClick={() => this.setState({updateUserFormVisible: true, updateUser: record})}>改</Button>
                    <Button type="danger" onClick={() => this.deleteBtnClick(record.pw_gid, 'user')}>删</Button>
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
                    <Popconfirm title="是否确定删除?" okText="确定" cancelText="取消" key={record.gr_gid + item} onConfirm={() => this.deleteGroupUser({gid: record.gr_gid, user: record.gr_mem})}>
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
                    <Button onClick={() => this.setState({updateUserGroupFormVisible: true, updateGroup: record})}>改</Button>
                    <Button onClick={() => this.setState({addUserToGroupFormVisible: true, targetAddGroup: record})}>添</Button>
                    <Button type="danger" onClick={() => this.deleteBtnClick(record.gr_gid, 'group')}>删</Button>
                  </ButtonGroup>
                )}/>
            </Table>
          </TabPane>
        </Tabs>
        <Modal
          title="添加用户"
          visible={this.state.addUserFormVisible}
          footer={null}
          destroyOnClose={true}
          onOk={() => this.setState({addUserFormVisible: false})}
          onCancel={() => this.setState({addUserFormVisible: false})}
        >
          <AddUserForm />
        </Modal>
        <Modal
          title="修改用户"
          visible={this.state.updateUserFormVisible}
          footer={null}
          destroyOnClose={true}
          onCancel={() => this.setState({updateUserFormVisible: false})}>
          <UpdateUserForm user={this.state.updateUser}/>
        </Modal>
        <Modal
          title="添加用户组"
          visible={this.state.addUserGroupFormVisible}
          destroyOnClose={true}
          footer={null}
          onCancel={() => this.setState({addUserGroupFormVisible: false})}>
          <AddUserGroupForm />
        </Modal>
        <Modal
          title="修改用户组"
          visible={this.state.updateUserGroupFormVisible}
          destroyOnClose={true}
          footer={null}
          onCancel={() => this.setState({updateUserGroupFormVisible: false})}>
          <UpdateUserGroupForm group={this.state.updateGroup}/>
        </Modal>
        <Modal
          title="添加用户到用户组"
          visible={this.state.addUserToGroupFormVisible}
          destroyOnClose={true}
          footer={null}
          onCancel={() => this.setState({addUserToGroupFormVisible: false})}>
          <AddUserToGroupForm users={users} group={this.state.targetAddGroup}/>
        </Modal>
      </div>
    )
  }
}

export default connect(state => ({setting: state.setting}))(User)