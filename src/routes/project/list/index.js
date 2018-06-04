import React from 'react'
import {
  Table,
  Form,
  DatePicker,
  Row, Col,
  Select,
  Input,
  Button,
  Tag,
  Pagination,
  Icon,
  Spin,
  message
} from 'antd'
import { connect } from 'dva'
import { Link, withRouter } from 'dva/router'
import qs from 'querystring'
import { formatTime, generateLoadingFunc } from '@utils/tools'
import projectStatus from '@config/projectStatus'
import { changeStatus, deleteProject } from '@services/project'
import styles from './styles.less'

const { Column } = Table

class List extends React.Component {

  constructor(props) {
    super(props)
    this.dispatch = this.props.dispatch
    this.state = {
      isLoading: false,
      selectedRowKeys: [],
      page: 1,
      projectName: '',
      startTime: 0,
      endTime: 0,
      url: '',
      status: -1,
    }
    this.loading = generateLoadingFunc(this, 'isLoading')
  }

  getCondition = () => {
    return {
      page: this.state.page,
      projectName: this.state.projectName,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      url: this.state.url,
      status: this.state.status,
    }
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }

  componentDidMount() {
    const condition = Object.assign(this.getCondition(), qs.parse(window.location.search.substr(1)))
    this.getData(condition)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.getData({...this.getCondition(), page: 1})
  }

  changeProjectStatus = async (status) => {
    const result = await changeStatus({
      status,
      ids: this.state.selectedRowKeys.join(',')
    })
    if (result.data.code === 200) {
      message.success('批量操作成功!')
    }
    this.getData(this.getCondition())
  }

  deleteProject = async () => {
    const result = await deleteProject({
      ids: this.state.selectedRowKeys.join(',')
    })
    if (result.data.code === 200) {
      message.success('批量操作成功!')
    }
    this.getData(this.getCondition())
  }

  handlePageChange = (newPage) => {
    this.setState({page: newPage})
    this.getData({...this.getCondition(), page: newPage})
  }

  getData = (condition) => {
    this.dispatch({type: 'project/get', condition: condition})
    this.setState(condition)
    if (condition.projectName === '') {
      delete condition.projectName
    }
    if (+condition.startTime === 0) {
      delete condition.startTime
    }
    if (+condition.endTime === 0) {
      delete condition.endTime
    }
    if (+condition.status === -1) {
      delete condition.status
    }
    if (condition.url ==='') {
      delete condition.url
    }
    this.props.history.replace({pathname: '/project/list', search: '?' + qs.stringify(condition)})
  }

  render() {
    const {
      project
    } = this.props
    const {
      projects,
      page,
      total
    } = project
    const formItemLayout = {
      labelCol: {sm: {span: 8},},
      wrapperCol: {sm: {span: 16},}
    }
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange,
    }
    return (
      <div className={styles['g-container']}>
        <Spin spinning={this.state.isLoading}>
          <div className={styles['m-search']}>
            <Form onSubmit={(event) => this.handleSubmit(event)}>
              <Row>
                <Col span={5}>
                  <Form.Item { ...formItemLayout} label="项目名" >
                    <Input value={this.state.projectName} onChange={(e) => this.setState({'projectName': e.target.value})}/>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item { ...formItemLayout} label="创建时间" >
                    <DatePicker.RangePicker onChange={(e) => this.setState({startTime: e[0]._d.getTime(), endTime: e[1]._d.getTime()})}/>
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item {...formItemLayout} label="项目链接" >
                    <Input value={this.state.url} onChange={(e) => this.setState({'url': e.target.value})}/>
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item {...formItemLayout} label="项目状态" >
                    <Select value={`${this.state.status}`} defaultValue="-1" onChange={(value) => this.setState({'status': Number(value)})}>
                      <Select.Option value="-1">不限</Select.Option>
                      <Select.Option value="1">运行中</Select.Option>
                      <Select.Option value="0">已下线</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={3} align="center">
                  <Form.Item {...formItemLayout}>
                    <Button type="primary" htmlType="submit">搜索</Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
          <Table 
            style={{minHeight: 614}}
            dataSource={projects} 
            rowKey="_id"
            rowSelection={rowSelection}
            pagination={false}>
            <Column 
              title="项目名"
              dataIndex="projectName"
              key="projectName"
            />
            <Column 
              title="创建时间"
              key="createTime"
              align="center"
              render={(text, record) => (<span>{ formatTime(record.createTime) }</span>)}
            />
            <Column 
              title="修改时间"
              key="updatetime"
              align="center"
              render={(text, record) => (<span>{ formatTime(record.updateTime) }</span>)}
            />
            <Column 
              title="项目链接"
              key="url"
              render={(text, record) => (<a href={record.url} target="_blank">{record.url}</a>)}
            />
            <Column 
              title="项目状态"
              key="status"
              render={(text, record) => (<Tag color={record.status === 0 ? 'red' : 'green'}>{projectStatus(record.status)}</Tag>)}
            />
            <Column 
              title="操作"
              key="manage"
              render={(text, record) => (<Link to={`/project/list/edit/${record._id}`}>编辑</Link>)}
            />
          </Table>
          <div className={styles['m-manage']}>
            <div className={styles['m-btns']}>
              <Button className={styles['u-btn']} onClick={() => this.loading(this.changeProjectStatus, 1)}><Icon type="smile-o" />批量上线</Button>
              <Button className={styles['u-btn']} onClick={() => this.loading(this.changeProjectStatus, 0)}><Icon type="frown-o" />批量下线</Button>
              <Button className={styles['u-btn']} onClick={() => this.loading(this.deleteProject)}><Icon type="delete" />批量删除</Button>
            </div>
            <div className={styles['u-pages']}>
              <Pagination onChange={(newPage) => this.handlePageChange(newPage)} current={Number(page)} total={Number(total)}/>
            </div>
          </div>
        </Spin>
      </div>
    )
  }
}


export default withRouter(connect((state) => ({project: state.project}))(List))