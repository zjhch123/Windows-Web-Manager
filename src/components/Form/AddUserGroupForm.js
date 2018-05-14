import React from 'react'
import { connect } from 'dva'
import { Form, Input, Button } from 'antd';

const FormItem = Form.Item;

class AddUserGroupForm extends React.Component {
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
          label="用户组名"
        >
          {getFieldDecorator('usergroupname', {
            rules: [{
              required: true, message: '请输入用户组名',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem style={{textAlign: 'center'}}>
          <Button type="primary" htmlType="submit">添加!</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedAddUserGroupForm = Form.create()(AddUserGroupForm);
export default connect()(WrappedAddUserGroupForm)