import React, { Component } from 'react'
// import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import styles from './exportTab.css'

class ExportTab extends Component {
  static propTypes = {
    root: PropTypes.array
  }

  render () {
    let {
      root
    } = this.props

    return <div>
      <textarea className={styles.json} value={JSON.stringify(root)} />
    </div>
  }
}

export default ExportTab
