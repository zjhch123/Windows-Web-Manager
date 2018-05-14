import React from 'react'
import { List, Tag, Button } from 'antd'

export default ({
  dataSource
}) => (
  <List
    dataSource={dataSource}
    renderItem={item => (
      <List.Item actions={[<span>{!!item.status ? <Tag color="#87d068">已安装</Tag> : <Button>安装</Button>}</span>]}>
        <List.Item.Meta
          title={item.name}
        />
      </List.Item>
    )}
  />
)