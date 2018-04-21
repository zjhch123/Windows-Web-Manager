import React from 'react'
import {
  Table,
  Form,
  DatePicker,
  Row, Col,
} from 'antd'
import { connect } from 'dva'
import { Link } from 'dva/router'
import { formatTime } from '../../../utils/tools'
import styles from './styles.less'

const projectStatus = (status) => {
  switch (status) {
    case 1: return '运行中';
    case 0: return '已下线';
    default: return '';
  }
}

const columns = [
  {
    title: '项目名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '创建时间',
    key: 'createTime',
    align: 'center',
    render: (text, record) => (
      <span>{ formatTime(record.createTime) }</span>
    )
  },
  {
    title: '修改时间',
    key: 'updateTime',
    align: 'center',
    render: (text, record) => (
      <span>{ formatTime(record.updateTime)}</span>
    )
  },
  {
    title: '项目链接',
    key: 'url',
    render: (text, record) => (
      <a href={record.url} target="_blank">{record.url}</a>
    )
  },
  {
    title: '项目状态',
    key: 'status',
    render: (text, record) => (
      <span>{projectStatus(record.status)}</span>
    )
  },
  {
    title: '操作',
    key: 'manage',
    render: (text, record) => (
      <Link to={`/project/edit/${record.id}`}>编辑</Link>
    )
  },
]

class List extends React.Component {

  constructor(props) {
    super(props)
    this.dispatch = this.props.dispatch
  }

  componentDidMount() {
    this.dispatch({type: 'project/get'})
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
        xs: {
          span: 24
        },
        sm: {
          span: 8
        },
      },
      wrapperCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 16
        },
      },
    };
    return (
      <div className={styles['g-container']}>
        <div className={styles['m-search']}>
          <Form>
            <Row>
              <Col span={6}>
                <Form.Item { ...formItemLayout} label = "创建时间" >
                  <DatePicker.RangePicker />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item { ...formItemLayout} label = "创建时间" >
                  <DatePicker.RangePicker />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item { ...formItemLayout} label = "创建时间" >
                  <DatePicker.RangePicker />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
        <Table 
          dataSource={projects} 
          columns={columns} 
          rowKey="id"
          pagination={{
            position: 'bottom',
            current: page,
            total: total,
            pageSize: 10
          }}/>
      </div>
    )
  }
}


export default connect((state) => ({project: state.project}))(List)