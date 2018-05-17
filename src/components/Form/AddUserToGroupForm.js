import React from 'react'
import { Transfer, Button, Spin, message } from 'antd'

import { addUserToGroup } from '@services/setting'
import { generateLoadingFunc } from '@utils/tools'

class AddUserToGroupForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      targetKeys: [],
      selectedKeys: [],
      isLoading: false
    }
    this.loading = generateLoadingFunc(this, 'isLoading')
  }

  componentDidMount = () => {
    this.dataSource = this.formatUser(this.props.users)
    const targetKeys = this.props.group.gr_mem
    this.setState({
      targetKeys
    })
  }

  formatUser = (dataSource) => {
    return dataSource.map(item => ({
      ...item,
      key: item.pw_name,
      title: item.pw_name
    }))
  }

  handleChange = (nextTargetKeys, direction, moveKeys) => {
    this.setState({ targetKeys: nextTargetKeys });

  }

  handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });
  }

  addUserToGroup = async () => {
    const targetKeys = this.state.targetKeys
    const result = await addUserToGroup({
      users: targetKeys.join(','),
      group: this.props.group.gr_name
    })
    if (result.data.code === 200) {
      message.success('添加成功!')
    } else {
      message.error('添加失败, 请重新试试!')
    }
  }

  render() {
    return (
      <div>
        <Spin spinning={this.state.isLoading}>
          <Transfer
            listStyle={{
              width: 210,
              height: 300
            }}
            dataSource={this.dataSource}
            titles={['用户', this.props.group.gr_name]}
            targetKeys={this.state.targetKeys}
            selectedKeys={this.state.selectedKeys}
            onChange={this.handleChange}
            onSelectChange={this.handleSelectChange}
            render={item => item.title}
          />
          <div style={{textAlign: 'center', marginTop: 20}}>
            <Button type="primary" onClick={() => this.loading(this.addUserToGroup)}>确定</Button>
          </div>
        </Spin>
      </div>
    );
  }
}

export default AddUserToGroupForm