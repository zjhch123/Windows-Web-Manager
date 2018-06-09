import React from 'react'
import {
  Form,
  Input, 
  Button,
  Spin,
  Radio,
  Select,
  message
} from 'antd'
import {connect} from 'dva'
import { withRouter } from 'dva/router'
import { generateLoadingFunc } from '@utils/tools'
import styles from './styles.less'

import { getFirstPathById, updateFirstPath } from '@services/env'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

class EditRouter extends React.Component {
  constructor(props) {
    super(props)
    this.firstPathId = this.props.match.params.id
    this.state = {
      isLoading: false,
      project: {},
      isError: false
    }
    this.loading = generateLoadingFunc(this, 'isLoading')
  }

  componentDidMount = () => {
    this.loading(this.getFirstPath)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.id = this.firstPathId
        this.loading(this.update, values)
      }
    });
  }

  update = async (data) => {
    const result = await updateFirstPath(data)
    switch (result.data.code) {
      case 200: message.success('修改成功!');break;
      case 600: message.warning('一级路径信息重复, 请检查');break;
      case 601: message.error('修改失败, 请尝试重新提交!');break;
      case 602: message.error('服务器重启失败, 请检查日志!');break;
      case 603: message.error('一级路径配置写入错误, 请检查日志!');break;
      default: message.error('修改失败, 服务器异常, 请尝试重新提交!');
    }
  }

  getFirstPath = async () => {
    const data = await getFirstPathById(this.firstPathId)
    if (data.data.code === 200) {
      this.setState({project: data.data.result})
    } else {
      message.error('获取一级路径数据失败!')
      this.setState({isError: true})
    }
  }
  
  goback = () => {
    window.history.go(-1)
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    return (
      <div className={styles['g-container']}>
        <Spin spinning={this.state.isLoading}>
          <a onClick={() => this.goback()} style={{marginLeft: '20px'}}>返回上层</a>
          <Form onSubmit={this.handleSubmit} style={{width: 600, margin: 'auto'}}>
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
                <RadioGroup name="schema" disabled>
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
                initialValue: this.state.project.firstPath,
                rules: [{
                  required: true, message: '请输入一级路径!',
                }],
              })(
                <Input placeholder="demo: www.hduzplus.xyz" disabled={this.state.isError}/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="绝对路径"
            >
              {getFieldDecorator('absPath', {
                initialValue: this.state.project.absPath,
                rules: [{
                  required: true, message: '请输入绝对路径!'
                }],
              })(
                <Input placeholder="demo: /var/www/static/" disabled/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="端口"
            >
              {
                getFieldDecorator('port', {
                  initialValue: this.state.project.port,
                })( 
                  <Input placeholder="默认：80 / 443" style={{width: 120}} disabled/>
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
                  <Select style={{width: 120}} disabled>
                    <Option value="httpd">httpd</Option>
                    <Option value="nginx" disabled>nginx</Option>
                    <Option value="tomcat">tomcat</Option>
                  </Select>
                )
              }
            </FormItem>
            <div style={{textAlign: 'center'}}>
              <Button type="primary" htmlType="submit" disabled={this.state.isError}>修改</Button>
              <Button type="danger" style={{marginLeft: 20}} disabled={this.state.isError}>删除</Button>
            </div>
          </Form>
        </Spin>
      </div>
    )
  }
}
const EditRouterForm = Form.create()(EditRouter);
export default withRouter(connect()(EditRouterForm))