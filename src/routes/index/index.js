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
      isLoading,
      cpus,
      project
    } = this.props.system
    return (
      <div>
        <Row className={styles["m-rows"]} gutter={16}>
          <Col span={8}>
            <Card loading={isLoading} hoverable title="项目总数" bodyStyle={{ textAlign: 'center' }}>
              <span className={styles["u-num"]} style={{ color: '#66CC00' }}>{ project.total }</span>
            </Card>
          </Col>
          <Col span={8}>
            <Card loading={isLoading} hoverable title="正在运行的项目数" bodyStyle={{ textAlign: 'center' }}>
              <span className={styles["u-num"]} style={{ color: '#66CC00' }}>{ project.run }</span>
            </Card>
          </Col>
          <Col span={8}>
            <Card loading={isLoading} hoverable title="已下线的项目" bodyStyle={{ textAlign: 'center' }}>
              <span className={styles["u-num"]} style={{ color: '#FF0033' }}>{ project.dead }</span>
            </Card>
          </Col>
        </Row>
        <Row className={styles["m-rows"]} gutter={16}>
          <Col span={12}>
            <Card loading={isLoading} hoverable title="内存使用" bodyStyle={{height: 250}}>
              <Row>
                <Col span={8}><span>总量: {memory.total} M</span></Col>
                <Col span={8}><span>已使用: {memory.used} M</span></Col>
                <Col span={8}><span>Buffer + Cache: {memory.buffcache} M</span></Col>
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
              <TimeFormat type="date" data={time.free} content={<Badge style={{ backgroundColor: '#52c41a' }} count={`${formatNumber(time.free / time.run * 100)}%`} />}/>
            </Card>
          </Col>
        </Row>
        <Row className={styles["m-rows"]}>
          <Col span={24}>
            <Card loading={isLoading} hoverable title="CPU使用率" bordered={false}>
              {
                cpus.map((cpu, index) => {
                  return (
                    <div key={index}>
                      <p>核心{index + 1}</p>
                      <Progress 
                        percent={Number(formatNumber(cpu.percent))} 
                        status={cpu.percent < 40 ? 'success' : (cpu.percent < 80 ? 'normal' : 'exception')}
                        format={(percent) => percent + '%'}
                        />
                    </div>  
                    )
                  })
              }
            </Card>
          </Col>
        </Row>
      </div>
    )
  }

}

export default connect(state => ({ system: state.system }))(Index)
