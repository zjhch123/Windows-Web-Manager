import React from 'react'
import styles from './styles.less'

import {
  Button,
  message
} from 'antd'
import { connect } from 'dva'
import CodeMirror from 'react-codemirror'
import { getEnvVar, saveEnvVar } from '@services/setting'


class EnvVar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      backValue: '',
      readOnly: "nocursor"
    }
  }

  componentDidMount = async () => {
    this.refs.editor.getCodeMirror().setSize('100%', 650)
    const result = await getEnvVar()
    if (result.data.code === 200) {
      this.setState({
        inputValue: result.data.result,
        backValue: result.data.result
      })
      this.refs.editor.getCodeMirror().setValue(result.data.result)
    } else {
      message.error('数据获取失败!')
    }
  }

  backup = () => {
    this.setState({
      inputValue: this.state.backValue
    })
    this.refs.editor.getCodeMirror().setValue(this.state.backValue)
  }

  startEdit = () => {
    message.warning('开始编辑')
    this.setState({
      readOnly: false
    })
  }

  save = async () => {
    const result = await saveEnvVar({data: this.state.inputValue})
    if (result.data.code === 200) {
      message.success('保存成功!')
      this.setState({
        readOnly: "nocursor",
        backValue: this.state.inputValue
      })
    } else {
      message.error('保存失败, 请重新提交!')
    }
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
          <Button className={styles['u-btn']} onClick={() => this.backup()}>还原</Button>
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