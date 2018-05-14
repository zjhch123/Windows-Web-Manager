import React from 'react'
import { Progress } from 'antd'
import { formatNumber } from '@utils/tools'

export default ({
  data1, 
  data2,
  checkStatusFunc
}) => (
  <Progress 
    type="dashboard" 
    percent={data1 / data2 * 100} 
    format={(percent) => `${formatNumber(percent)}%`}
    status={checkStatusFunc(data1 / data2) ? 'exception' : 'success'}/>
)