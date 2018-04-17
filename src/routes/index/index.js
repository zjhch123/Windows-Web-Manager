import React from 'react'
import { connect } from 'dva'
import { Card, Col, Row, Progress, Badge } from 'antd'
import { formatNumber, formatTime, formatDateTime } from '../../utils/tools'
import StoragePie from '../../components/Charts/StoragePie'
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

  isMemoryBoom(memory) {
    return memory.used / memory.total > 0.9
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
        <Row className={styles["m-rows"]} gutter={16}>
          <Col span={24}>
            <Card loading={isLoading} hoverable title="系统信息">
              <p><span className={styles['u-system-info-title']}>虚拟平台：</span>{ system.platform }</p>
              <p><span className={styles['u-system-info-title']}>主机名称：</span>{ system.hostName }</p>
              <p><span className={styles['u-system-info-title']}>发行版本：</span>{ system.publicVersion }</p>
              <p><span className={styles['u-system-info-title']}>内核版本：</span>{ system.coreVersion }</p>
              <p><span className={styles['u-system-info-title']}>CPU个数：</span>{ system.cpuNum } 个</p>
              <p><span className={styles['u-system-info-title']}>CPU核心：</span>{ system.cpuCore }</p>
            </Card>
          </Col>
        </Row> 
        <Row className={styles["m-rows"]} gutter={16}>
          <Col span={6}>
            <Card loading={isLoading} hoverable title="服务器时间" bodyStyle={{ height: 80, overflow: 'hidden' }}>
              <p>{ formatTime(time.system) }</p>
            </Card>
          </Col>
          <Col span={6}>
            <Card loading={isLoading} hoverable title="启动时间" bodyStyle={{ height: 80, overflow: 'hidden' }}>
              <p>{ formatTime(time.start) }</p>
            </Card>
          </Col>
          <Col span={6}>
            <Card loading={isLoading} hoverable title="运行时间" bodyStyle={{ height: 80, overflow: 'hidden' }}>
              <p>{ formatDateTime(time.run) }</p>
            </Card>
          </Col>
          <Col span={6}>
            <Card loading={isLoading} hoverable title="空闲时间" bodyStyle={{ height: 80, overflow: 'hidden' }}>
              <p>{formatDateTime(time.free)}&nbsp;&nbsp;<Badge count={`${formatNumber(time.free / time.run * 100)}%`} /></p>
            </Card>
          </Col>
        </Row>
        <Row className={styles["m-rows"]} gutter={16}>
          <Col span={12}>
            <Card loading={isLoading} hoverable title="内存使用" bodyStyle={{height: 300}}>
              <Row>
                <Col span={8}><span>总量: {memory.total} M</span></Col>
                <Col span={8}><span>Buffers: {memory.buffers} M</span></Col>
                <Col span={8}><span>Cached: {memory.cached} M</span></Col>
              </Row>
              <Row style={{paddingTop: 48}}>
                <Col span={12} align="center">
                  <Progress 
                    type="dashboard" 
                    percent={memory.used / memory.total * 100} 
                    format={(percent) => `${formatNumber(percent)}%`}
                    status={this.isMemoryBoom(memory) ? 'exception' : 'success'}/>
                  <h3>已使用</h3>
                </Col>
                <Col span={12} align="center">
                  <Progress 
                    type="dashboard" 
                    percent={memory.free / memory.total * 100} 
                    format={(percent) => `${formatNumber(percent)}%`}
                    status={this.isMemoryBoom(memory) ? 'exception' : 'success'} />
                  <h3>未使用</h3>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={12}>
            <Card loading={isLoading} hoverable title="存储空间" bodyStyle={{ height: 300 }}>
              <StoragePie height={250} data={storage}/>
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
      </div>
    )
  }

}

export default connect(state => ({ system: state.system }))(Index)
