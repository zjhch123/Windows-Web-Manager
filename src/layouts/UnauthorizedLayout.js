import React from 'react'
import styles from './UnauthorizedLayout.less'


const UnauthorizedLayout = ({ children }) => (
  <div className={styles["g-container"]}>
    { children }
  </div>
)

export default UnauthorizedLayout