import React from 'react'
import { connect } from 'dva'
import styles from './LoginForm.less'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

class LoginForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values)
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { 
      className 
    } = this.props
    return (
      <div className={className}>
        <Form onSubmit={this.handleSubmit} className={styles["login-form"]}>
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="管理员用户名" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="管理员密码" />
            )}
          </FormItem>
          {
            this.props.msg !== null ?
            <FormItem>
              <p style={{color: 'red', margin: 0}}>{this.props.msg}</p>
            </FormItem> : ''
          }
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>Remember me</Checkbox>
            )}
            <a className={styles["login-form-forgot"]} href="">Forgot password</a>
            <Button type="primary" htmlType="submit" className={styles["login-form-button"]}>
              Log in
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

const WrappedNormalLoginForm = Form.create()(LoginForm);

export default connect((state) => ({ msg: state.user.message }))(WrappedNormalLoginForm)
