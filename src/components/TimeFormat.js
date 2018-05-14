import React from 'react'
import { formatTime, formatDateTime } from '@utils/tools'

export default ({
  data,
  type = "",
  content = ''
}) => (
  <p>{ type === "" ? formatTime(data) : formatDateTime(data)}&nbsp;&nbsp;{content}</p>
)