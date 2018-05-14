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

const data1 = {"msg": "123", "code": 0, "data": [{"pw_dir": "/root", "pw_gid": 0, "pw_passwd": "x", "pw_gecos": "root", "n_unnamed_fields": 0, "n_sequence_fields": 7, "pw_shell": "/bin/bash", "pw_name": "root", "lock": false, "pw_gname": "root", "n_fields": 7, "pw_uid": 0}, {"pw_dir": "/bin", "pw_gid": 1, "pw_passwd": "x", "pw_gecos": "bin", "n_unnamed_fields": 0, "n_sequence_fields": 7, "pw_shell": "/sbin/nologin", "pw_name": "bin", "lock": true, "pw_gname": "bin", "n_fields": 7, "pw_uid": 1}, {"pw_dir": "/sbin", "pw_gid": 2, "pw_passwd": "x", "pw_gecos": "daemon", "n_unnamed_fields": 0, "n_sequence_fields": 7, "pw_shell": "/sbin/nologin", "pw_name": "daemon", "lock": false, "pw_gname": "daemon", "n_fields": 7, "pw_uid": 2}, {"pw_dir": "/var/adm", "pw_gid": 4, "pw_passwd": "x", "pw_gecos": "adm", "n_unnamed_fields": 0, "n_sequence_fields": 7, "pw_shell": "/sbin/nologin", "pw_name": "adm", "lock": false, "pw_gname": "adm", "n_fields": 7, "pw_uid": 3}, {"pw_dir": "/var/spool/lpd", "pw_gid": 7, "pw_passwd": "x", "pw_gecos": "lp", "n_unnamed_fields": 0, "n_sequence_fields": 7, "pw_shell": "/sbin/nologin", "pw_name": "lp", "lock": false, "pw_gname": "lp", "n_fields": 7, "pw_uid": 4}, {"pw_dir": "/sbin", "pw_gid": 0, "pw_passwd": "x", "pw_gecos": "sync", "n_unnamed_fields": 0, "n_sequence_fields": 7, "pw_shell": "/bin/sync", "pw_name": "sync", "lock": false, "pw_gname": "root", "n_fields": 7, "pw_uid": 5}, {"pw_dir": "/sbin", "pw_gid": 0, "pw_passwd": "x", "pw_gecos": "shutdown", "n_unnamed_fields": 0, "n_sequence_fields": 7, "pw_shell": "/sbin/shutdown", "pw_name": "shutdown", "lock": false, "pw_gname": "root", "n_fields": 7, "pw_uid": 6}, {"pw_dir": "/sbin", "pw_gid": 0, "pw_passwd": "x", "pw_gecos": "halt", "n_unnamed_fields": 0, "n_sequence_fields": 7, "pw_shell": "/sbin/halt", "pw_name": "halt", "lock": false, "pw_gname": "root", "n_fields": 7, "pw_uid": 7}, {"pw_dir": "/var/spool/mail", "pw_gid": 12, "pw_passwd": "x", "pw_gecos": "mail", "n_unnamed_fields": 0, "n_sequence_fields": 7, "pw_shell": "/sbin/nologin", "pw_name": "mail", "lock": false, "pw_gname": "mail", "n_fields": 7, "pw_uid": 8}, {"pw_dir": "/var/spool/uucp", "pw_gid": 14, "pw_passwd": "x", "pw_gecos": "uucp", "n_unnamed_fields": 0, "n_sequence_fields": 7, "pw_shell": "/sbin/nologin", "pw_name": "uucp", "lock": true, "pw_gname": "uucp", "n_fields": 7, "pw_uid": 10}, {"pw_dir": "/root", "pw_gid": 0, "pw_passwd": "x", "pw_gecos": "operator", "n_unnamed_fields": 0, "n_sequence_fields": 7, "pw_shell": "/sbin/nologin", "pw_name": "operator", "lock": false, "pw_gname": "root", "n_fields": 7, "pw_uid": 11}, {"pw_dir": "/usr/games", "pw_gid": 100, "pw_passwd": "x", "pw_gecos": "games", "n_unnamed_fields": 0, "n_sequence_fields": 7, "pw_shell": "/sbin/nologin", "pw_name": "games", "lock": false, "pw_gname": "users", "n_fields": 7, "pw_uid": 12}]}
const data2 = {"msg": "123", "code": 0, "data": [{"gr_gid": 0, "gr_passwd": "x", "n_sequence_fields": 4, "n_unnamed_fields": 0, "gr_name": "root", "n_fields": 4, "gr_mem": []}, {"gr_gid": 1, "gr_passwd": "x", "n_sequence_fields": 4, "n_unnamed_fields": 0, "gr_name": "bin", "n_fields": 4, "gr_mem": ["bin", "daemon"]}, {"gr_gid": 2, "gr_passwd": "x", "n_sequence_fields": 4, "n_unnamed_fields": 0, "gr_name": "daemon", "n_fields": 4, "gr_mem": ["bin", "daemon"]}, {"gr_gid": 3, "gr_passwd": "x", "n_sequence_fields": 4, "n_unnamed_fields": 0, "gr_name": "sys", "n_fields": 4, "gr_mem": ["bin", "adm"]}, {"gr_gid": 4, "gr_passwd": "x", "n_sequence_fields": 4, "n_unnamed_fields": 0, "gr_name": "adm", "n_fields": 4, "gr_mem": ["adm", "daemon"]}, {"gr_gid": 5, "gr_passwd": "x", "n_sequence_fields": 4, "n_unnamed_fields": 0, "gr_name": "tty", "n_fields": 4, "gr_mem": []}, {"gr_gid": 6, "gr_passwd": "x", "n_sequence_fields": 4, "n_unnamed_fields": 0, "gr_name": "disk", "n_fields": 4, "gr_mem": []}, {"gr_gid": 7, "gr_passwd": "x", "n_sequence_fields": 4, "n_unnamed_fields": 0, "gr_name": "lp", "n_fields": 4, "gr_mem": ["daemon"]}, {"gr_gid": 8, "gr_passwd": "x", "n_sequence_fields": 4, "n_unnamed_fields": 0, "gr_name": "mem", "n_fields": 4, "gr_mem": []}, {"gr_gid": 9, "gr_passwd": "x", "n_sequence_fields": 4, "n_unnamed_fields": 0, "gr_name": "kmem", "n_fields": 4, "gr_mem": []}, {"gr_gid": 10, "gr_passwd": "x", "n_sequence_fields": 4, "n_unnamed_fields": 0, "gr_name": "wheel", "n_fields": 4, "gr_mem": []}]}

class User extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      addUserFormVisible: false,
      addUserGroupFormVisible: false
    }
  }

  render() {
    return (
      <div className={styles['g-container']}>
        <Tabs defaultActiveKey="1" tabBarStyle={{marginBottom: 0}}>
          <TabPane tab="用户管理" key="1">
            <div className={styles['m-manage']}>
              <Button onClick={() => this.setState({addUserFormVisible: true})}>添加新用户</Button>
            </div>
            <Table 
              pagination={false}
              rowKey={"gr_name"}
              size="middle"
              dataSource={data1.data}>
              <Column 
                title="ID"
                dataIndex="pw_uid"
                key="pw_uid"
                align="center"
              />
              <Column 
                title="状态"
                dataIndex="status"
                render={(text, record) => (<Tag color={record.lock ? 'red' : 'green'}>{record.lock ? '锁定' : '正常'}</Tag>)}
              />
              <Column 
                title="用户名"
                dataIndex="pw_name"
                key="pw_name"
              />
              <Column 
                title="备注"
                dataIndex="pw_gecos"
                key="pw_gecos"
              />
              <Column 
                title="用户组"
                dataIndex="pw_gname"
                key="pw_gname"
              />
              <Column 
                title="主目录"
                dataIndex="pw_dir"
                key="pw_dir"
              />
              <Column 
                title="SHELL路径"
                dataIndex="pw_shell"
                key="pw_shell"
              />
              <Column 
                title="操作"
                key="manage"
                align="center"
                render={(text, record) => (
                  <ButtonGroup size="small">
                    <Button>改</Button>
                    <Button type="danger">删</Button>
                  </ButtonGroup>
                )}
              />
            </Table>
          </TabPane>
          <TabPane tab="用户组管理" key="2">
            <div className={styles['m-manage']}>
              <Button onClick={() => this.setState({addUserGroupFormVisible: true})}>添加新用户组</Button>
            </div>
            <Table
              dataSource={data2.data}
              pagination={false}
              rowKey="gr_name"
              size="middle"
            >
              <Column
                title="ID"
                dataIndex="gr_gid"
                key="Id"
                align="center"
              />
              <Column
                title="用户组"
                dataIndex="gr_name"
                key="gr_name"
              />
              <Column
                title="组成员"
                dataIndex="gr_mem"
                key="gr_mem"
                align="center"
                render={(text) => 
                <span>{
                  text.map(item => 
                    <Popconfirm title="是否确定删除?" okText="确定" cancelText="取消">
                      <Button size="small" style={{margin: '0 4px'}}>{item}<Icon type="close" style={{fontSize: 12}}/></Button>
                    </Popconfirm>)
                  }
                </span>}
              />
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
                )}
              />
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

export default connect()(User)