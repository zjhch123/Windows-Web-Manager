import React from 'react'
import { Transfer, Button } from 'antd'


class AddUserToGroupForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      targetKeys: [],
      selectedKeys: [],
    }
  }

  componentDidMount = () => {
    console.log(this.props)
    this.dataSource = this.formatUser(this.props.users)
    const targetKeys = this.props.group.gr_mem
    this.setState({
      targetKeys
    })
  }

  formatUser = (dataSource) => {
    return dataSource.map(item => ({
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

  

  render() {
    return (
      <div>
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
          <Button type="primary">确定</Button>
        </div>
      </div>
    );
  }
}

export default AddUserToGroupForm