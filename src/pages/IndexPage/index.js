import React from 'react';
import { connect } from 'dva';
import { Redirect, Switch, Route } from 'dva/router';
import config from '@config/sidemenu';
import IndexLayout from '@layouts/IndexLayout';
import { flatArray } from '@utils/tools';

const getAllPath = (config) => {
  return config.map(item => {
    if (item.hasSub) {
      return getAllPath(item.sub)
    } else {
      return {
        path: item.path,
        component: item.component
      }
    }
  })
}

class IndexPage extends React.Component {
  render() {
    if (!this.props.isLogin) {
      return (
        <Redirect to="/auth" />
      )
    }
    return (
      <IndexLayout>
        <Switch>
          { 
            flatArray(getAllPath(config)).map(item => {
              return <Route path={item.path} key={item.path} component={ item.component ? item.component : () => <div>{item.path}</div> }/>
            }) 
          }
          <Redirect to="/index/"/>
        </Switch>
      </IndexLayout>
    );
  }
}

const mapStateToProps = (state) => ({
  isLogin: state.user.isLogin
})

export default connect(mapStateToProps)(IndexPage);
