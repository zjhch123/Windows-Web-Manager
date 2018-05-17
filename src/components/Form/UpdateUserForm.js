import React from 'react'
import { connect } from 'dva'
import { Form, Input, Select, Switch, Button, Spin, message } from 'antd';
import { generateLoadingFunc } from '@utils/tools'
import { updateUser } from '@services/setting'

const FormItem = Form.Item;
const Option = Select.Option;

class AddUserForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      confirmDirty: false,
      isLock: false,
      usergroup: '',
      isLoading: false
    }
    this.loading = generateLoadingFunc(this, 'isLoading')
  }

  componentDidMount = () => {
    console.log(1)
    this.setState({
      isLock: this.props.user.lock
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.lock = this.state.isLock
        this.loading(this.updateUser, values)
      }
    });
  }

  updateUser = async (data) => {
    const result = await updateUser(data)
    if (result.data.code === 200) {
      message.success('修改成功!')
      this.props.dispatch({type: 'setting/users'})
    } else {
      message.error('修改失败, 请重新提交!')
    }
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {xs: { span: 24 },sm: { span: 8 },},
      wrapperCol: {xs: { span: 14 },sm: { span: 12 },},
    }

    const {
      groups
    } = this.props.setting

    return (
      <div>
        <Spin spinning={this.state.isLoading}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              {...formItemLayout}
              label="用户名"
            >
              {getFieldDecorator('username', {
                initialValue: this.props.user.pw_name,
                rules: [{
                  required: true, message: '请输入用户名',
                }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="备注"
            >
              {getFieldDecorator('desc', {
                initialValue: this.props.user.pw_gecos,
              })(
                <Input />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="用户组"
            >
              {getFieldDecorator('usergroup', {
                initialValue: this.props.user.pw_gname,
                rules: [
                  { required: true, message: '请选择用户组' },
                ],
              })(
                <Select placeholder="用户组" >
                {
                  groups.map(item => (
                    <Option value={item.gr_name} key={item.gr_gid}>{item.gr_name}</Option>
                  ))
                }
                </Select>
              )}
            </FormItem>
            <FormItem 
              {...formItemLayout}
              label="主目录"
            >
              {getFieldDecorator('mainPath', {
                initialValue: this.props.user.pw_dir
              })(
                <Input />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="SHELL路径"
            >
              {getFieldDecorator('shellPath', {
                  initialValue: '/bin/bash',
                  rules: [
                    { required: true, message: '请输入SHELL路径' }
                  ]
                })(
                <Input />
              )}
            </FormItem>
            <FormItem 
              {...formItemLayout}
              label="是否锁定账户">
              <Switch defaultChecked={this.props.user.lock}/>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="密码"
            >
              {getFieldDecorator('password', {
                rules: [{
                }, {
                  validator: this.validateToNextPassword,
                }],
              })(
                <Input type="password" placeholder="无需求改密码则留空"/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="密码确认"
            >
              {getFieldDecorator('confirm', {
                rules: [{
                }, {
                  validator: this.compareToFirstPassword,
                }],
              })(
                <Input type="password" onBlur={this.handleConfirmBlur} placeholder="无需求改密码则留空" />
              )}
            </FormItem>
            <FormItem style={{textAlign: 'center'}}>
              <Button type="primary" htmlType="submit">修改!</Button>
            </FormItem>
          </Form>
        </Spin>
      </div>
    );
  }
}

const WrappedAddUserForm = Form.create()(AddUserForm);
export default connect(state => ({setting: state.setting}))(WrappedAddUserForm)