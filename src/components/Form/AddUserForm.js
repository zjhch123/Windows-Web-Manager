import React from 'react'
import { connect } from 'dva'
import { Form, Input, Select, Checkbox, Button } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class AddUserForm extends React.Component {
  state = {
    confirmDirty: false,
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
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
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 14 },
        sm: { span: 12 },
      },
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="用户名"
        >
          {getFieldDecorator('username', {
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
          {getFieldDecorator('desc')(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="用户组"
        >
          {getFieldDecorator('usergroup', {
            rules: [
              { required: true, message: '请选择用户组' },
            ],
          })(
            <Select placeholder="用户组">
              <Option value="root">root</Option>
              <Option value="user">user</Option>
            </Select>
          )}
        </FormItem>
        <FormItem 
          {...formItemLayout}
          label="主目录"
        >
          {getFieldDecorator('mainPath')(
            <Checkbox checked>是否创建主目录</Checkbox>
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
          label="是否锁定账户"
        >
          <Checkbox>是否锁定账户</Checkbox>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="密码"
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: '请输入密码',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="密码确认"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: '请输入相同的密码',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>
        <FormItem style={{textAlign: 'center'}}>
          <Button type="primary" htmlType="submit">添加!</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedAddUserForm = Form.create()(AddUserForm);
export default connect()(WrappedAddUserForm)