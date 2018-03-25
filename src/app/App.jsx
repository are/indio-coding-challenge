import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { changeTab } from 'src/actions'

import cls from 'classnames'
import styles from './app.css'

import CreateTab from 'src/components/CreateTab'
import PreviewTab from 'src/components/PreviewTab'
import ExportTab from 'src/components/ExportTab'

class App extends Component {
  static propTypes = {
    tab: PropTypes.string,
    root: PropTypes.array,
    changeTab: PropTypes.func
  }

  state = {
    key: 0
  }

  getCurrentTab = () => {
    let {
      tab,
      root
    } = this.props

    if (tab === 'create') {
      return <CreateTab root={root} />
    }

    if (tab === 'preview') {
      return <PreviewTab root={root} key={this.state.key} />
    }

    if (tab === 'export') {
      return <ExportTab root={root} />
    }
  }

  handleTabChange (tabId) {
    this.props.changeTab(tabId)
    this.setState({ key: Math.random().toString(36).substr(2, 5) })
  }

  getTabMenu = () => {
    let {
      tab
    } = this.props

    return <div>
      <button
        className={cls(
          styles.tabButton,
          { [styles.active]: tab === 'create' }
        )}
        onClick={() => this.handleTabChange('create')}
      >
        Create
      </button>
      <button
        className={cls(
          styles.tabButton,
          { [styles.active]: tab === 'preview' }
        )}
        onClick={() => this.handleTabChange('preview')}
      >
        Preview
      </button>
      <button
        className={cls(
          styles.tabButton,
          { [styles.active]: tab === 'export' }
        )}
        onClick={() => this.handleTabChange('export')}
      >
        Export
      </button>
      <hr className={styles.divider} />
    </div>
  }

  render () {
    return <div className={styles.container}>
      <h1>Form Builder</h1>
      {this.getTabMenu()}
      {this.getCurrentTab()}
    </div>
  }
}

export default connect(state => ({
  tab: state.currentTab,
  root: state.root
}), {
  changeTab
})(App)
