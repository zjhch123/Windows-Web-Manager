import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import AuthorizedRoute from '@components/AuthorizedRoute'
import UnauthorizedPage from '@pages/UnauthorizedPage/';
import IndexPage from '@pages/IndexPage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/auth" component={UnauthorizedPage}/>
        <AuthorizedRoute path="/" component={IndexPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
