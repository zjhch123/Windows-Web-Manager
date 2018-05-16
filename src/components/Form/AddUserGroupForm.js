import React from 'react'
import { connect } from 'dva'
import { Form, Input, Button, Spin, message } from 'antd'
import { generateLoadingFunc } from '@utils/tools'
import { addGroup } from '@services/setting'

const FormItem = Form.Item;

class AddUserGroupForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      confirmDirty: false,
      isLoading: false
    }
    this.loading = generateLoadingFunc(this, 'isLoading')
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.loading(this.addGroup, values)
      }
    });
  }

  addGroup = async (data) => {
    const result = await addGroup(data)
    if (result.data.code === 200) {
      message.success('添加成功!')
      this.props.dispatch({type: 'setting/groups'})
    } else {
      message.error('添加失败, 请重新提交!')
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {xs: { span: 24 },sm: { span: 8 },},
      wrapperCol: {xs: { span: 14 },sm: { span: 12 },},
    };

    return (
      <div>
        <Spin spinning={this.state.isLoading}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              {...formItemLayout}
              label="用户组名"
            >
              {getFieldDecorator('groupname', {
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
        </Spin>
      </div>
    );
  }
}

const WrappedAddUserGroupForm = Form.create()(AddUserGroupForm);
export default connect()(WrappedAddUserGroupForm)