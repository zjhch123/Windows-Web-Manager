import React from 'react'
import {
  Form,
  Input, 
  Button,
  Spin
} from 'antd'
import { connect } from 'dva'
import { withRouter } from 'dva/router'
import styles from './styles.less'
import { getProject } from '@services/project'
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
  }

  componentDidMount = async () => {
    this.setState({
      isLoading: true
    })
    const result = await getProject(this.projectId)
    this.setState({
      isLoading: false
    })
    if (result.data.code === 200) {
      const project = result.data.result
      this.setState({
        projectName: project.projectName,
        firstPath: project.firstPath,
        secondPath: project.secondPath,
        indexPage: project.indexPage,
        scriptURL: project.scriptURL,
        status: project.status
      })
      this.props.form.setFieldsValue({
        projectName: this.state.projectName,
        indexPage: this.state.indexPage
      })
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

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };
    return (
      <div className={styles['g-container']}>
        <Spin spinning={this.state.isLoading}>
          <a onClick={() => window.history.go(-1)} style={{marginLeft: '20px'}}>返回上层</a>
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
                ? <Button type="danger" style={{marginRight: '12px'}}>上线</Button>
                : <Button type="danger" style={{marginRight: '12px'}}>下线</Button>
              }
              <Button type="danger">删除</Button>
            </FormItem>
          </Form>
        </Spin>
      </div>
    );
  }
}

const EditProjectForm = Form.create()(EditProject);

export default withRouter(connect()(EditProjectForm))