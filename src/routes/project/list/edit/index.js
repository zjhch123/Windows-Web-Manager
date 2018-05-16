import React from 'react'
import {
  Form,
  Input, 
  Button,
  Spin,
  message
} from 'antd'
import { connect } from 'dva'
import { withRouter } from 'dva/router'
import { getProject, changeStatus, deleteProject, updateProject } from '@services/project'
import { mapObjToFormData, generateLoadingFunc } from '@utils/tools'

import styles from './styles.less'

const FormItem = Form.Item;

class EditProject extends React.Component {

  constructor(props) {
    super(props)
    this.projectId = this.props.match.params.id
    this.state = {
      isLoading: false,
      projectName: '',
      firstPath: '',
      secondPath: '',
      indexPage: '',
      scriptURL: ''
    }
    this.loading = generateLoadingFunc(this, 'isLoading')
  }

  componentDidMount = () => {
    this.loading(this.getProject)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.id = this.projectId
        this.loading(this.updateProject, values)
      }
    });
  }

  goback = () => {
    window.history.go(-1)
  }

  getProject = async () => {
    const result = await getProject(this.projectId)
    if (result.data.code === 200) {
      const project = result.data.result
      this.setState({...project})
      this.props.form.setFieldsValue({
        projectName: this.state.projectName,
        indexPage: this.state.indexPage
      })
    }
  }

  updateProject = async (data) => {
    const formData = mapObjToFormData(data)
    const result = await updateProject(formData)
    if (result.data.code === 200) {
      message.success('更新成功!')
    }
  }

  changeProjectStatus = async (status) => {
    const result = await changeStatus({
      status,
      ids: this.projectId
    })
    if (result.data.code === 200) {
      message.success('操作成功!')
    }
  }

  deleteProject = async () => {
    const result = await deleteProject({
      ids: this.projectId
    })
    if (result.data.code === 200) {
      message.success('操作成功!')
      this.goback()
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };
    return (
      <div className={styles['g-container']}>
        <Spin spinning={this.state.isLoading}>
          <a onClick={() => this.goback()} style={{marginLeft: '20px'}}>返回上层</a>
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
                <Input placeholder="请输入项目名称" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="一级路径"
            >
              <Input disabled={true} value={this.state.firstPath}/>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="二级路径"
            >
              <Input placeholder="请输入二级路径, 留空则自动生成" disabled={true} value={!this.state.secondPath ? '/' : this.state.secondPath}/>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="首页"
            >
              {getFieldDecorator('indexPage')(
                <Input placeholder="留空则默认为index.html"/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="脚本链接"
            >
              <Input placeholder="请输入脚本链接" disabled={true} value={this.state.scriptURL}/>
            </FormItem>
            <FormItem
              style={{textAlign: 'center'}}>
              <Button type="primary" htmlType="submit" style={{marginRight: '12px'}}>走起!</Button>
              {
                this.state.status === 0 
                ? <Button type="danger" style={{marginRight: '12px'}} onClick={() => this.loading(this.changeProjectStatus, 1)}>上线</Button>
                : <Button type="danger" style={{marginRight: '12px'}} onClick={() => this.loading(this.changeProjectStatus, 0)}>下线</Button>
              }
              <Button type="danger" onClick={() => this.loading(this.deleteProject)}>删除</Button>
            </FormItem>
          </Form>
        </Spin>
      </div>
    );
  }
}

const EditProjectForm = Form.create()(EditProject);

export default withRouter(connect()(EditProjectForm))