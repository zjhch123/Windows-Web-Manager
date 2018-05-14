import React from 'react'
import styles from './styles.less'

import {
  Button,
  message
} from 'antd'
import { connect } from 'dva'
import CodeMirror from 'react-codemirror';

const data = `#!/bin/sh

touch ~/test

source /etc/profile

sh /usr/local/tomcat/bin/catalina.sh start &
nohup python /usr/local/vpsmate/server.py &
forever start -o /var/www/screenshow_github_webhook/out.log /var/www/screenshow_github_webhook/deploy.js
forever start -o /var/www/image/log/out.log -e /var/www/image/log/error.log /var/www/image/src/app.js
forever start -o /var/www/zoe/log/out.log -e /var/www/zoe/log/error.log /var/www/zoe/app.js
NODE_ENV=production forever start -o /var/www/Homepage/log/out.log -e /var/www/Homepage/log/error.log /var/www/Homepage/src/app.js
`

class StartScript extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: data,
      readOnly: "nocursor"
    }
  }

  componentDidMount = () => {
    this.refs.editor.getCodeMirror().setSize('100%', 650)
  }

  startEdit = () => {
    message.warning('开始编辑')
    this.setState({
      readOnly: false
    })
  }

  save = () => {
    message.success('保存成功')
    this.setState({
      readOnly: "nocursor"
    })
  }

  render() {
    const {
      readOnly
    } = this.state
    const options = {
      mode: 'shell',
      theme: 'material',
      lineNumbers: true,
      tabSize: 2,
      indentWithTabs: false,
      lineWrapping: true,
      readOnly
    }
    return (
      <div className={styles['g-container']}>
        <div className={styles['m-manage']}>
          {
            readOnly 
              ? <Button onClick={() => this.startEdit()} type="danger" className={styles['u-btn']}>编辑</Button>
              : <Button onClick={() => this.save()} type="primary" className={styles['u-btn']}>保存</Button>
          }
          <Button className={styles['u-btn']}>还原</Button>
        </div>
        <CodeMirror
          className="cm"
          ref="editor"
          value={this.state.inputValue}
          options={options}
          onChange={(value) => {
            this.setState({inputValue: value})
          }}
        />
      </div>
    )
  }
}

export default connect()(StartScript)