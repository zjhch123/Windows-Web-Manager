import React from 'react'
import {
  Table,
  Form,
  DatePicker,
  Row, Col,
  Select,
  Input,
  Button
} from 'antd'
import { connect } from 'dva'
import { Link } from 'dva/router'
import { formatTime } from '@utils/tools'
import projectStatus from '@config/projectStatus'
import styles from './styles.less'

const { Column } = Table

class List extends React.Component {

  constructor(props) {
    super(props)
    this.dispatch = this.props.dispatch
  }

  componentDidMount() {
    this.dispatch({type: 'project/get'})
  }

  handleSubmit(event) {
    event.preventDefault()
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
      labelCol: {
        sm: {
          span: 8
        },
      },
      wrapperCol: {
        sm: {
          span: 16
        },
      },
    };
    return (
      <div className={styles['g-container']}>
        <div className={styles['m-search']}>
          <Form onSubmit={(event) => this.handleSubmit(event)}>
            <Row>
              <Col span={5}>
                <Form.Item { ...formItemLayout} label="项目名" >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item { ...formItemLayout} label="创建时间" >
                  <DatePicker.RangePicker />
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item {...formItemLayout} label="项目链接" >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item {...formItemLayout} label="项目状态" >
                  <Select defaultValue="0">
                    <Select.Option value="0">运行中</Select.Option>
                    <Select.Option value="1">已下线</Select.Option>
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
          dataSource={projects} 
          rowKey="id"
          pagination={{
            position: 'bottom',
            current: page,
            total: total,
            pageSize: 10
          }}>
            <Column 
              title="项目名"
              dataIndex="name"
              key="name"
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
              render={(text, record) => (<span>{projectStatus(record.status)}</span>)}
            />
            <Column 
              title="操作"
              key="manage"
              render={(text, record) => (<Link to={`/project/list/edit/${record.id}`}>编辑</Link>)}
            />
          </Table>
      </div>
    )
  }
}


export default connect((state) => ({project: state.project}))(List)