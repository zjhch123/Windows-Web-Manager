import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Spin,
  message
} from 'antd';
import React from 'react'
import { connect } from 'dva'

import { addFirstPath } from '@services/env'
import { generateLoadingFunc } from '@utils/tools'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

class AddRouterForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      confirmDirty: false,
      isLoading: false,
    }
    this.loading = generateLoadingFunc(this, 'isLoading')
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (!values.port) {
          values.port = values.schema === 'https' ? 443 : 80
        }
        this.loading(this.addFirstPath, values)
      }
    });
  }

  addFirstPath = async (data) => {
    const result = await addFirstPath(data)
    switch (result.data.code) {
      case 200: message.success('添加成功!');this.props.dispatch({ type: 'env/firstPath' });break;
      case 600: message.warning('一级路径信息重复, 请检查');break;
      case 601: message.error('添加失败, 请尝试重新提交!');break;
      case 602: message.error('服务器重启失败, 请检查日志!');break;
      case 603: message.error('一级路径配置写入错误, 请检查日志!');break;
      default: message.error('添加失败, 服务器异常, 请尝试重新提交!');
    }
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {xs: { span: 6 },sm: { span: 6 },},
      wrapperCol: {xs: { span: 24 },sm: { span: 16 },},
    };

    return (
      <div>
        <Spin spinning={this.state.isLoading}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem
                {...formItemLayout}
                label="协议"
              >
              {getFieldDecorator('schema', {
                initialValue: 'http',
                rules: [{
                  required: true, message: '请选择协议!',
                }],
              })(
                <RadioGroup name="schema">
                  <Radio value="http">http</Radio>
                  <Radio value="https" disabled>https</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="一级路径"
            >
              {getFieldDecorator('firstPath', {
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
              {getFieldDecorator('absPath', {
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
              {
                getFieldDecorator('port')(
                  <Input placeholder="默认：80 / 443" style={{width: 120}}/>
                )
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="环境"
            >
              {
                getFieldDecorator('env', {
                  initialValue: 'httpd'
                })(
                  <Select style={{width: 120}}>
                    <Option value="httpd">httpd</Option>
                    <Option value="nginx" disabled>nginx</Option>
                    <Option value="tomcat">tomcat</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="配置方式"
            >
              {getFieldDecorator('configType', {
                initialValue: 'auto',
                rules: [{
                  required: true, message: '请选择配置方式!',
                }],
              })(
                <RadioGroup name="configType">
                  <Radio value="auto">自动配置</Radio>
                  <Radio value="normal">手动配置</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <div style={{textAlign: 'center'}}>
              <Button type="primary" htmlType="submit">添加</Button>
            </div>
          </Form>
        </Spin>
      </div>
    );
  }
}

const WrappedAddRouterForm = Form.create()(AddRouterForm);
export default connect()(WrappedAddRouterForm)
