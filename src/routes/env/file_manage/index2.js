import React from 'react'
import styles from './styles.less'

class FileManage extends React.Component {

  render() {
    return (
      <div className={styles['g-container']}>
        <iframe src="http://10.211.55.4:8888/#/file?path=%2F" title="file"/>
      </div>
    )
  }
}

export default FileManage
