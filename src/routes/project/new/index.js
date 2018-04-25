import React from 'react'
import {
  Form, Switch, Input, Select, 
  Button, Upload, Icon
} from 'antd';
import styles from './styles.less';
const FormItem = Form.Item;

class New extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      needSecondPath: false,
      shouldInjectScript: false
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  handlePathChange = (checked) => {
    this.setState({
      needSecondPath: checked
    })
  }

  handleScriptChange = (checked) => {
    this.setState({
      shouldInjectScript: checked
    })
  }

  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };
    return (
      <div className={styles['g-container']}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label="项目名称"
            hasFeedback
          >
            {getFieldDecorator('projectName', {
              rules: [
                { required: true, message: '请输入项目名称!' },
              ],
            })(
              <Input placeholder="请输入项目名称"/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="一级路径"
            hasFeedback
          >
            {getFieldDecorator('projectName', {
              rules: [
                { required: true, message: '请选择一级路径' },
              ],
            })(
              <Select>
                <Select.Option value="http://139.129.132.196/">http://139.129.132.196/</Select.Option>
                <Select.Option value="http://static.hduzplus.xyz/">http://static.hduzplus.xyz/</Select.Option>
                <Select.Option value="http://api.hduzplus.xyz/">http://api.hduzplus.xyz/</Select.Option>
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="是否需要二级路径"
          >
            <Switch onChange={(checked) => this.handlePathChange(checked)} />
          </FormItem>
          {
            this.state.needSecondPath ? (
              <FormItem
                {...formItemLayout}
                label="二级路径"
                hasFeedback
              >
                <Input placeholder="请输入二级路径，留空则自动生成" />
              </FormItem>
            ) : ''
          }
          <FormItem
            {...formItemLayout}
            label="是否注入脚本"
          >
            <Switch onChange={(checked) => this.handleScriptChange(checked)}/>
          </FormItem>
          {
            this.state.shouldInjectScript ? (
              <FormItem
                {...formItemLayout}
                label="脚本链接"
                hasFeedback
              >
                {getFieldDecorator('scriptURL', {
                  rules: [
                    { required: true, message: '请输入脚本链接!' },
                  ],
                })(
                  <Input placeholder="请输入脚本链接" />
                )}
              </FormItem>
            ) : ''
          }
          <FormItem
            {...formItemLayout}
            label="项目文件"
          >
            <div className="dropbox">
              {getFieldDecorator('dragger', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
                rules: [
                  { required: true,
                    message: '请上传项目文件' 
                  }
                ]
              })(
                <Upload.Dragger name="files" action="/upload.do">
                  <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                  </p>
                  <p className="ant-upload-text">点击或Drag文件到此处上传</p>
                  <p className="ant-upload-hint">请上传zip或rar格式压缩文件</p>
                </Upload.Dragger>
              )}
            </div>
          </FormItem>

          <FormItem
            wrapperCol={{ span: 12, offset: 10 }}
          >
            <Button type="primary" htmlType="submit">走起!</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const NewForm = Form.create()(New);

export default NewForm