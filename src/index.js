import dva from 'dva';
import './index.less';
import createBrowserHistory from 'history/createBrowserHistory'

// 1. Initialize
const app = dva({
  history: createBrowserHistory()
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('@models/user').default);
app.model(require('@models/system').default);
app.model(require('@models/project').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
