import React from 'react';
import { connect } from 'dva';
import { Layout, Dropdown, Menu, Icon } from 'antd';
import { withRouter } from 'dva/router'
import SideMenu from '@components/SideMenu';
import styles from './IndexLayout.less';

const { Header, Sider, Content } = Layout;

class IndexLayout extends React.Component {
  constructor(props) {
    super(props)
    this.headerMenu = (
      <Menu onClick={this.handleDropMenu}>
        <Menu.Item key="3">退出</Menu.Item>
      </Menu>
    );
  }

  handleDropMenu = ({ item, key, keyPath }) => {
    if (key === '3') { 
      this.props.dispatch({ type: 'user/logout' }) 
    }
  }

  render() {
    return (
      <Layout className={styles["g-container"]}>
        <Sider
          breakpoint="xl"
          style={{'overflow': 'auto'}}
        >
          <div className={styles["logo"]} />
          <SideMenu location={this.props.location}/>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff' }} className={styles["app-header"]}>
            <Dropdown overlay={this.headerMenu} trigger={['click']}>
              <a>
                操作 <Icon type="down" />
              </a>
            </Dropdown>
          </Header>
          <Content style={{ padding: 24, minHeight: 280, position: "relative" }}>
            { this.props.children }
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(connect()(IndexLayout));
