import React, { Component } from 'react'
// import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// import cls from 'classnames'

import styles from './previewTab.css'

class Question extends Component {
  static propTypes = {
    type: PropTypes.string,
    question: PropTypes.string,
    condition: PropTypes.object,
    parentValue: PropTypes.any,
    parentType: PropTypes.string,
    children: PropTypes.array
  }

  state = {
    input: null
  }

  handleInput = (e) => {
    this.setState({
      input: e.target.value
    })
  }

  handleBooleanInput = (e) => {
    this.setState({
      input: e
    })
  }

  renderChildren () {
    let {
      children
    } = this.props

    if (children !== undefined && Array.isArray(children)) {
      return children.map((child, i) =>
        <Question key={i} {...child} parentType={this.props.type} parentValue={this.state.input} />
      )
    }

    return null
  }

  renderString () {
    let {
      question
    } = this.props

    return <div className={styles.question}>
      <div className={styles.text}>{question}</div>
      <input type="text" value={this.state.input} onChange={this.handleInput} />
      <div className={styles.child}>
        {this.renderChildren()}
      </div>
    </div>
  }

  renderBoolean () {
    let {
      question
    } = this.props

    let {
      input
    } = this.state

    return <div className={styles.question}>
      <div className={styles.text}>{question}</div>
      <label>
        Yes
        <input type="radio" checked={input !== null ? input : false} onChange={() => this.handleBooleanInput(true)} />
      </label>
      <label>
        No
        <input type="radio" checked={input !== null ? !input : false} onChange={() => this.handleBooleanInput(false)} />
      </label>
      <div className={styles.child}>
        {this.renderChildren()}
      </div>
    </div>
  }

  renderNumber () {
    let {
      question
    } = this.props

    return <div className={styles.question}>
      <div className={styles.text}>{question}</div>
      <input type="number" value={this.state.input} onChange={this.handleInput} />
      <div className={styles.child}>
        {this.renderChildren()}
      </div>
    </div>
  }

  isConditionSatisfied () {
    let {
      condition,
      parentType,
      parentValue
    } = this.props

    if (condition === undefined) {
      return true
    }

    if (condition !== undefined && parentValue === null) {
      return false
    }

    if (parentType === 'string') {
      if (condition.type === 'equals') {
        return condition.value === parentValue
      }
    }

    if (parentType === 'number') {
      if (condition.type === 'equals') {
        return Number(condition.value) === Number(parentValue)
      }

      if (condition.type === 'gt') {
        return Number(parentValue) > Number(condition.value)
      }

      if (condition.type === 'lt') {
        return Number(parentValue) < Number(condition.value)
      }
    }

    if (parentType === 'boolean') {
      if (condition.type === 'equals') {
        return condition.value === parentValue
      }
    }

    return false
  }

  render () {
    let {
      type
    } = this.props

    if (!this.isConditionSatisfied()) {
      return null
    }

    if (type === 'string') {
      return this.renderString()
    }

    if (type === 'boolean') {
      return this.renderBoolean()
    }

    if (type === 'number') {
      return this.renderNumber()
    }
  }
}

class PreviewTab extends Component {
  static propTypes = {
    root: PropTypes.array
  }

  getQuestions () {
    let {
      root
    } = this.props

    return root.map((element, i) => <Question key={i} {...element} />)
  }

  render () {
    return <div>
      {this.getQuestions()}
    </div>
  }
}

export default PreviewTab
