import React from 'react'
import { connect } from 'dva'
import { Route, Redirect } from 'dva/router'

class AuthorizedRoute extends React.Component {
  render() {
    const {
      isLogin,
      component: Component,
      ...rest
    } = this.props
    return (
      <Route {...rest} render={() => {
        if (isLogin) {
          return <Component {...this.props} />
        } else {
          return <Redirect to="/auth"/> 
        }
      }}/>
    )
  }
}

export default connect((state) => ({isLogin: state.user.isLogin}))(AuthorizedRoute)