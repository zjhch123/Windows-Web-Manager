import React from 'react'
import { connect } from 'dva'
import {
  Table,
  Input,
  Button,
  Icon
} from 'antd';
import styles from './styles.less'

const data = {"msg": "success", "code": 0, "data": [{"size": "12.3K", "isdir": true, "ctime": "2017-05-07 22:56:05", "perms": "0750", "mtime": "2017-05-07 22:56:05", "name": "Python-2.7.3", "uname": "", "isreg": false, "gname": "", "islnk": false, "gid": 1002, "atime": "2017-05-07 22:56:05", "uid": 1000}, {"size": "4.0K", "isdir": true, "ctime": "2017-02-18 18:01:57", "perms": "0755", "mtime": "2017-02-18 18:01:57", "name": "Tears", "uname": "root", "isreg": false, "gname": "root", "islnk": false, "gid": 0, "atime": "2017-08-14 13:44:44", "uid": 0}, {"size": "4.0K", "isdir": true, "ctime": "2018-03-27 16:58:01", "perms": "0755", "mtime": "2018-03-27 16:58:01", "name": "solo_h2", "uname": "root", "isreg": false, "gname": "root", "islnk": false, "gid": 0, "atime": "2018-03-27 17:00:06", "uid": 0}, {"size": "22.5M", "isdir": false, "ctime": "2017-01-01 23:05:44", "perms": "0644", "mtime": "2017-01-01 23:05:44", "name": "MySQL-client-5.6.35-1.linux_glibc2.5.x86_64.rpm", "uname": "root", "isreg": true, "gname": "root", "islnk": false, "gid": 0, "atime": "2017-01-01 23:05:54", "uid": 0}, {"size": "4.4M", "isdir": false, "ctime": "2017-01-01 23:14:24", "perms": "0644", "mtime": "2017-01-01 23:14:24", "name": "MySQL-devel-5.6.35-1.linux_glibc2.5.x86_64.rpm", "uname": "root", "isreg": true, "gname": "root", "islnk": false, "gid": 0, "atime": "2017-01-01 23:14:39", "uid": 0}, {"size": "86.0M", "isdir": false, "ctime": "2017-01-01 22:49:30", "perms": "0644", "mtime": "2017-01-01 22:49:30", "name": "MySQL-server-5.6.35-1.linux_glibc2.5.x86_64.rpm", "uname": "root", "isreg": true, "gname": "root", "islnk": false, "gid": 0, "atime": "2017-01-01 22:51:03", "uid": 0}, {"size": "379B", "isdir": false, "ctime": "2016-10-22 19:21:10", "perms": "0644", "mtime": "2016-10-22 19:21:10", "name": "checkApache.py", "uname": "root", "isreg": true, "gname": "root", "islnk": false, "gid": 0, "atime": "2017-05-22 23:40:02", "uid": 0}, {"size": "629B", "isdir": false, "ctime": "2016-10-22 19:21:28", "perms": "0644", "mtime": "2016-10-22 19:21:28", "name": "checkTomcat.py", "uname": "root", "isreg": true, "gname": "root", "islnk": false, "gid": 0, "atime": "2017-05-22 22:40:01", "uid": 0}, {"size": "18B", "isdir": false, "ctime": "2017-05-23 12:59:49", "perms": "0644", "mtime": "2017-05-23 12:59:49", "name": "cronfile", "uname": "root", "isreg": true, "gname": "root", "islnk": false, "gid": 0, "atime": "2017-08-14 13:44:15", "uid": 0}, {"size": "1.2M", "isdir": false, "ctime": "2018-01-30 13:28:32", "perms": "0644", "mtime": "2018-01-30 13:28:32", "name": "ics.sql", "uname": "root", "isreg": true, "gname": "root", "islnk": false, "gid": 0, "atime": "2018-01-30 13:28:57", "uid": 0}, {"size": "27.1K", "isdir": false, "ctime": "2018-04-06 17:01:32", "perms": "0600", "mtime": "2018-04-06 17:01:32", "name": "nohup.out", "uname": "root", "isreg": true, "gname": "root", "islnk": false, "gid": 0, "atime": "2018-03-27 17:11:16", "uid": 0}]};
const { Column } = Table;
const ButtonGroup = Button.Group;


class FileManage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedRowKeys: []
    }
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({
      selectedRowKeys
    });
  }

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div className={styles['g-container']}>
        <div className={styles['m-manage']}>
          <div className={styles['u-input']}>
            <Input 
              addonBefore="当前目录" 
              addonAfter={<a>进入 <Icon type="right" /></a>}
              defaultValue="/" 
            />
          </div>
          <div className={styles['m-btn']}>
            <Button type="primary">返回上级</Button>
          </div>
          <div className={styles['m-action']}>
            <Button className={styles['u-btn']}><Icon type="reload" /></Button>
            <Button className={styles['u-btn']}><Icon type="folder-add" /></Button>
            <Button className={styles['u-btn']}><Icon type="file-add" /></Button>
            <Button className={styles['u-btn']}><Icon type="upload" /></Button>
          </div>
        </div>
        <Table 
          dataSource={data.data} 
          pagination={false}
          rowKey="name"
          size="middle"
          rowSelection={rowSelection}
        >
          <Column
            title='名称'
            key='name'
            render={(text, record) => (<span><Icon type={record.isdir ? "folder" : "file"} style={{marginRight: '6px'}}/>{record.name}</span>)}
          />
          <Column
            title='大小'
            dataIndex='size'
            key='size'
            width={78}
          />
          <Column
            title='用户'
            key='uname'
            width={95}
            render={(text, record) => (<span>{record.uname || record.uid}</span>)}
          />
          <Column
            title='组'
            key='gname'
            width={95}
            render={(text, record) => (<span>{record.gname || record.gid}</span>)}
          />
          <Column
            title='权限'
            dataIndex='perms'
            key='perms'
            width={75}
          />
          <Column
            title='修改时间'
            dataIndex='mtime'
            key='mtime'
            width={150}
          />
          <Column
            title='操作'
            key='action'
            align="center"
            width={135}
            render={(text, record) => (
              <ButtonGroup size="small">
                <Button>复</Button>
                <Button>剪</Button>
                <Button>压</Button>
                <Button type="danger">删</Button>
              </ButtonGroup>
            )}
          />
          <Column
            title='其他'
            key='other'
            align="center"
            render={(text, record) => (
                <Button size="small"><Icon type="download" /></Button>
            )}
          />
        </Table>
        <div className={styles['m-manage']} style={{justifyContent: 'flex-end', paddingLeft: 0}}>
          <div className={styles['m-action']}>
            <Button className={styles['u-btn']}><Icon type="copy" />批量复制</Button>
            <Button className={styles['u-btn']}><Icon type="link" />批量剪切</Button>
            <Button className={styles['u-btn']}><Icon type="delete" />批量删除</Button>
            <Button className={styles['u-btn']}><Icon type="book" />批量打包压缩</Button>
            <Button className={styles['u-btn']}><Icon type="team" />批量修改用户和组</Button>
            <Button className={styles['u-btn']}><Icon type="share-alt" />批量修改权限</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(FileManage)
