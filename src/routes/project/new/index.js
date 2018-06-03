import React from 'react'
import {
  Form, Switch, Input, Select, 
  Button, Upload, Icon, Modal, message, Spin
} from 'antd'
import { connect } from 'dva'
import styles from './styles.less'
import AddRouterForm from '@components/Form/AddRouterForm'
import { addProject } from '@services/project'
import { mapObjToFormData, generateLoadingFunc } from '@utils/tools'

const FormItem = Form.Item;

class New extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      needSecondPath: false,
      needInjectScript: false,
      addRouterModal: false,
      isLoading: false,
      url: null
    }
    this.loading = generateLoadingFunc(this, 'isLoading')
  }

  componentDidMount = () => {
    this.props.dispatch({ type: 'env/firstPath' })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (!values.indexPage) {
          values.indexPage = 'index.html'
        }
        if (!values.secondPath) {
          values.secondPath = Math.random().toString(36).substr(2)
        }
        values.needScriptInject = !!values.needScriptInject
        this.loading(this.upload, values)
      }
    });
  }

  upload = async (data) => {
    const result = await addProject(mapObjToFormData(data))
    switch (result.data.code) {
      case 200:
        Modal.success({
          title: '添加项目成功'
        })
        break;
      case 600:
        message.error('项目信息与已有项目重复, 请检查')
        break;
      case 601:
        message.error('添加项目失败, 请重新试试~')
        break;
      default:
        message.error('添加项目失败, 请重新试试')
        break;
    }
  }

  handlePathChange = (checked) => {
    this.setState({
      needSecondPath: checked
    })
  }

  handleScriptChange = (checked) => {
    this.setState({
      needInjectScript: checked
    })
  }

  normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  addRouter = (e) => {
    this.setState({
      addRouterModal: true
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };
    const {
      isLoading
    } = this.state
    return (
      <div className={styles['g-container']}>
        <Spin spinning={isLoading}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              {...formItemLayout}
              label="项目名称"
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
            >
              {getFieldDecorator('firstPath', {
                rules: [
                  { required: true, message: '请选择一级路径' },
                ],
              })(
                <Select>
                  {
                    this.props.env.firstPath.map(item => (
                      <Select.Option value={item._id} key={item._id}>{item.url}</Select.Option>
                    ))
                  }
                </Select>
              )}
              <a onClick={() => this.addRouter()}>添加一级路径</a>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="是否需要二级路径"
            >
              <Switch onChange={(checked) => this.handlePathChange(checked)} defaultChecked={false}/>
            </FormItem>
            {
              this.state.needSecondPath ? (
                <FormItem
                  {...formItemLayout}
                  label="二级路径"
                >
                  {getFieldDecorator('secondPath')(
                    <Input placeholder="请输入二级路径, 留空则自动生成" />
                  )}
                </FormItem>
              ) : ''
            }
            <FormItem
              {...formItemLayout}
              label="首页"
            >
              {getFieldDecorator('indexPage')(
                <Input placeholder="留空则默认为index.html" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="是否注入脚本"
            >
              {getFieldDecorator('needScriptInject')(
                <Switch onChange={(checked) => this.handleScriptChange(checked)} defaultChecked={false}/>
              )}
            </FormItem>
            {
              this.state.needInjectScript ? (
                <FormItem
                  {...formItemLayout}
                  label="脚本链接"
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
                {getFieldDecorator('file', {
                  valuePropName: 'fileList',
                  getValueFromEvent: this.normFile,
                  rules: [
                    { required: true,
                      message: '请上传项目文件' 
                    }
                  ]
                })(
                  <Upload.Dragger name="files" beforeUpload={() => false} accept="application/zip,application/x-rar-compressed">
                    <p className="ant-upload-drag-icon">
                      <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">点击或Drag文件到此处上传</p>
                    <p className="ant-upload-hint">请上传zip或rar格式压缩文件</p>
                  </Upload.Dragger>
                )}
              </div>
            </FormItem>
            <FormItem style={{textAlign: 'center'}}>
              <Button type="primary" htmlType="submit">走起!</Button>
            </FormItem>
          </Form>
        </Spin>
        <Modal
          title="添加一级路径"
          visible = {this.state.addRouterModal}
          onCancel={() => this.setState({addRouterModal: false})}
          footer={null}>
          <AddRouterForm />
        </Modal>
      </div>
    );
  }
}

const WrappedNew = Form.create()(New);

export default connect(state => ({env: state.env}))(WrappedNew)