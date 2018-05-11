import {
  Form,
  Input,
  Button,
  Radio,
  Select
} from 'antd';
import React from 'react'
import { connect } from 'dva'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

class AddRouterForm extends React.Component {
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
  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 6 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
            {...formItemLayout}
            label="协议"
          >
          {getFieldDecorator('radio-group', {
            rules: [{
              required: true, message: '请选择协议!',
            }],
          })(
            <RadioGroup name="schema">
              <Radio value="http">http</Radio>
              <Radio value="https">https</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="一级路径"
        >
          {getFieldDecorator('first-path', {
            rules: [{
              required: true, message: '请输入一级路径!',
            }],
          })(
            <Input placeholder="demo: www.hduzplus.xyz"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="绝对路径"
        >
          {getFieldDecorator('abs-path', {
            rules: [{
              required: true, message: '请输入绝对路径!'
            }],
          })(
            <Input placeholder="demo: /var/www/static/"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="端口"
        >
          <Input placeholder="默认：80 / 443" style={{width: 120}}/>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="环境"
        >
          <Select defaultValue="httpd" style={{width: 120}}>
            <Option value="httpd">httpd</Option>
            <Option value="nginx">nginx</Option>
            <Option value="tomcat" disabled>tomcat</Option>
          </Select>
        </FormItem>
        <div style={{textAlign: 'center'}}>
          <Button type="primary" htmlType="submit">添加</Button>
        </div>
      </Form>
    );
  }
}

const WrappedAddRouterForm = Form.create()(AddRouterForm);
export default connect()(WrappedAddRouterForm)
