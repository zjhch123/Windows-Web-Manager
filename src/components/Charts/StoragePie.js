import React from 'react'
import { Chart, Geom, Axis, Coord, Legend, Guide } from 'bizcharts'
import { DataView } from '@antv/data-set'
import { formatNumber } from '@utils/tools'
const { Html } = Guide;

class StoragePie extends React.Component {

  constructor(props) {
    super(props)
    this.cols = {
      percent: {
        formatter: val => {
          val = (val * 100) + '%';
          return val;
        }
      }
    }
  }
    
  mappingKey(key) {
    switch(key) {
      case 'used': return '已使用'
      case 'free': return '未使用'
      default: return ''
    }
  }

  formatData() {
    const { data } = this.props
    const formatedData = []
    for (let key in data) {
      if (key === 'total') {
        continue
      }
      formatedData.push({
        item: `${this.mappingKey(key)} | ${formatNumber(data[key] / data.total * 100)}% - ${data[key]}G `,
        count: data[key]
      })
    }
    return formatedData
  }

  render() {
    const {
      height,
      data
    } = this.props
    const dv = new DataView()
    dv.source(this.formatData()).transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent'
    });
    return (
      <Chart height={height} data={dv} scale={this.cols} padding={{ bottom: 80 }} onGetG2Instance={(chart) => { setTimeout(() => chart.forceFit(), 0) }} forceFit>
        <Coord type={'theta'} radius={0.9} innerRadius={0.7} />
        <Axis name="percent" />
        <Legend position='bottom' />
        <Guide >
          <Html position={['50%', '50%']} html={`<div style="color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;">总计<br><span style="color:#262626;font-size:2.5em">${data.total}</span>G</div>`} alignX='middle' alignY='middle' />
        </Guide>
        <Geom
          type="intervalStack"
          position="percent"
          color='item'
          style={{ lineWidth: 1, stroke: '#fff' }}
        >
        </Geom>
      </Chart>
    )
  }
}


export default StoragePie