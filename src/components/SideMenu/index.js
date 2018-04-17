import React from 'react';
import { Link } from 'dva/router';
import { Menu, Icon } from 'antd';
import config from './config'

const SubMenu = Menu.SubMenu;

function renderBar(config) {
  return config.map(element => {
    if (element.hasSub) {
      return (
        <SubMenu
          key={element.key}
          title={<span>{!!element.icon && <Icon type={element.icon} />}<span>{element.name}</span></span>}
        >
          { renderBar(element.sub) }
        </SubMenu>
      )
    } else {
      return (
        <Menu.Item key={element.key}>
          <Link to={element.path}>
            { !!element.icon && <Icon type={element.icon} /> }
            { element.name }
          </Link>
        </Menu.Item>
      )
    }
  })
}

class SideBar extends React.Component {

  constructor(props) {
    super(props)
    this.selectedKey = this.props.location.pathname.split('/')[2] || 'index'
    this.openKey = this.props.location.pathname.split('/')[1] || 'project'
  }

  render() {
    return (
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[this.selectedKey]} defaultOpenKeys={[this.openKey, 'project']}>
        {renderBar(config)}
      </Menu>
    )
  }
}

export default SideBar