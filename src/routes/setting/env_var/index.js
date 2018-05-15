import React from 'react'
import styles from './styles.less'

import {
  Button,
  message
} from 'antd'
import { connect } from 'dva'
import CodeMirror from 'react-codemirror';

const data = `
JAVA_HOME=/usr/java/jdk1.8.0_60
CLASSPATH=$JAVA_HOME/lib:$JAVA_HOME/jre/lib
PATH=$PATH:$JAVA_HOME/bin:$JAVA_HOME/jre/bin
export PATH CLASSPATH JAVA_HOME

CATALINA_HOME=/usr/local/tomcat

export CATALINA_HOME
export PATH=/usr/local/git/bin:$PATH
PATH=$PATH:/opt/python3/bin

# node
export NODE_HOME=/usr/local/node-v8.0.0-linux-x64
export PATH=$PATH:$NODE_HOME/bin
export NODE_PATH=$NODE_HOME/lib/node_modules
export PATH=/usr/java/jdk1.8.0_60/bin:/usr/local/git/bin:/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin:/usr/java/jdk1.8.0_60/bin:/usr/java/jdk1.8.0_60/jre/bin:/opt/python3/bin:/usr/local/node-v8.0.0-linux-x64/bin:/root/bin:/usr/local/ImageMagick/bin
`

class EnvVar extends React.Component {
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

export default connect()(EnvVar)