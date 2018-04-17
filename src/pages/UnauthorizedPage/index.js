import React from 'react'
import { connect } from 'dva'
import { Redirect } from 'dva/router'
import styles from './styles.less'
import LoginForm from '../../components/Form/LoginForm'
import UnauthorizedLayout from '../../layouts/UnauthorizedLayout';


class UnauthorizedPage extends React.Component {
  handleSubmit = (data) => {
    this.props.dispatch({
      type: 'user/login',
      payload: data
    })
  }
  render() {
    if (this.props.isLogin) {
      return (
        <Redirect to="/" />
      )
    }
    return (
      <UnauthorizedLayout>
        <div className={styles["m-login-container"]}>
          <h1 className={styles["u-title"]}>Windows</h1>
          <h4 className={styles["u-title"]}>网站项目管理系统</h4>
          <LoginForm onSubmit={this.handleSubmit} />
        </div>
      </UnauthorizedLayout>
    )
  }
}


export default connect((state) => ({ isLogin: state.user.isLogin }))(UnauthorizedPage)