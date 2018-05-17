import React from 'react'
import { connect } from 'dva'
import { Card, Col, Row, Progress, Badge } from 'antd'
import { formatNumber } from '@utils/tools'
import StoragePie from '@components/Charts/StoragePie'
import TimeFormat from '@components/TimeFormat'
import DashProgress from '@components/DashProgress'
import styles from './styles.less'

class Index extends React.Component {

  constructor(props) {
    super(props)
    this.dispatch = this.props.dispatch
  }

  componentDidMount() {
    this.dispatch({ type: 'system/init' })
    this.interval = setInterval(() => {
      this.dispatch({ type: 'system/getInfo' })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  isStorageBoom(storage) {
    return storage.used / storage.total > 0.8
  }

  render() {
    const {
      memory,
      storage,
      time,
      isLoading
    } = this.props.system
    const system = this.props.system
    return (
      <div>
        <Row className={styles["m-rows"]} gutter={16}>
          <Col span={8}>
            <Card loading={isLoading} hoverable title="项目总数" bodyStyle={{ textAlign: 'center' }}>
              <span className={styles["u-num"]} style={{ color: '#66CC00' }}>10</span>
            </Card>
          </Col>
          <Col span={8}>
            <Card loading={isLoading} hoverable title="正在运行的项目数" bodyStyle={{ textAlign: 'center' }}>
              <span className={styles["u-num"]} style={{ color: '#66CC00' }}>9</span>
            </Card>
          </Col>
          <Col span={8}>
            <Card loading={isLoading} hoverable title="已下线的项目" bodyStyle={{ textAlign: 'center' }}>
              <span className={styles["u-num"]} style={{ color: '#FF0033' }}>1</span>
            </Card>
          </Col>
        </Row>
        <Row className={styles["m-rows"]}>
          <Col span={24}>
            <Card loading={isLoading} hoverable title="CPU使用率" bordered={false}>
              <Progress 
                percent={Number(formatNumber(system.cpu))} 
                status={system.cpu < 40 ? 'success' : (system.cpu < 80 ? 'normal' : 'exception')}
                format={(percent) => percent + '%'}
                />
            </Card>
          </Col>
        </Row>
        <Row className={styles["m-rows"]} gutter={16}>
          <Col span={12}>
            <Card loading={isLoading} hoverable title="内存使用" bodyStyle={{height: 250}}>
              <Row>
                <Col span={8}><span>总量: {memory.total} M</span></Col>
                <Col span={8}><span>Buffers: {memory.buffers} M</span></Col>
                <Col span={8}><span>Cached: {memory.cached} M</span></Col>
              </Row>
              <Row style={{paddingTop: 36}}>
                <Col span={12} align="center">
                  <DashProgress 
                    data1={memory.used}
                    data2={memory.total}
                    checkStatusFunc={(data) => data > 0.9}/>
                  <h3>已使用</h3>
                </Col>
                <Col span={12} align="center">
                  <DashProgress 
                    data1={memory.free}
                    data2={memory.total}
                    checkStatusFunc={(data) => data <= 0.1}/>
                  <h3>未使用</h3>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={12}>
            <Card loading={isLoading} hoverable title="存储空间" bodyStyle={{ height: 250 }}>
              <StoragePie height={250} data={storage}/>
            </Card>
          </Col>
        </Row>
        <Row className={styles["m-rows"]} gutter={16}>
          <Col span={6}>
            <Card loading={isLoading} hoverable title="服务器时间">
              <TimeFormat data={time.system}/>
            </Card>
          </Col>
          <Col span={6}>
            <Card loading={isLoading} hoverable title="启动时间">
              <TimeFormat data={time.start}/>
            </Card>
          </Col>
          <Col span={6}>
            <Card loading={isLoading} hoverable title="运行时间">
              <TimeFormat type="date" data={time.run}/>
            </Card>
          </Col>
          <Col span={6}>
            <Card loading={isLoading} hoverable title="空闲时间">
              <TimeFormat type="date" data={time.free} content={<Badge count={`${formatNumber(time.free / time.run * 100)}%`} />}/>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }

}

export default connect(state => ({ system: state.system }))(Index)
