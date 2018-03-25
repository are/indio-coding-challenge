import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import cls from 'classnames'

import styles from './createTab.css'

import {
  changeConditionType,
  changeQuestionType,
  changeConditionValue,
  changeQuestionValue,
  addNewQuestion,
  addNewSubquestion,
  deleteQuestion
} from '../actions'

class FormInputP extends Component {
  static propTypes = {
    question: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    parentType: PropTypes.string,
    children: PropTypes.array,
    condition: PropTypes.object,
    path: PropTypes.array,
    changeConditionType: PropTypes.func,
    changeQuestionType: PropTypes.func,
    changeConditionValue: PropTypes.func,
    changeQuestionValue: PropTypes.func,
    addNewSubquestion: PropTypes.func,
    deleteQuestion: PropTypes.func
  }

  getSubinputs () {
    return (this.props.children || []).map((child, i) =>
      <FormInput key={i} {...child} parentType={this.props.type} path={[...this.props.path, i]} />
    )
  }

  handleConditionChange = (e) => {
    this.props.changeConditionType({
      path: this.props.path,
      value: e.target.value
    })
  }

  handleConditionValueChange = (e) => {
    this.props.changeConditionValue({
      path: this.props.path,
      value: e.target.value
    })
  }

  handleConditionYesNoChange = (d) => {
    this.props.changeConditionValue({
      path: this.props.path,
      value: d
    })
  }

  handleQuestionChange = (e) => {
    this.props.changeQuestionType({
      path: this.props.path,
      value: e.target.value
    })
  }

  handleQuestionValueChange = (e) => {
    this.props.changeQuestionValue({
      path: this.props.path,
      value: e.target.value
    })
  }

  handleAddSubquestion = (e) => {
    this.props.addNewSubquestion({
      path: this.props.path
    })
  }

  handleDeleteQuestion = (e) => {
    this.props.deleteQuestion({
      path: this.props.path
    })
  }

  getCondition () {
    let {
      condition,
      parentType
    } = this.props

    if (!condition) {
      return null
    }

    let options, inputs
    if (parentType === 'boolean') {
      options = [ ['equals', 'Equals'] ]
      inputs = <select
        value={condition.value}
        onChange={(e) => this.handleConditionYesNoChange(e.target.value === 'true')}
      >
        <option value={true}>Yes</option>
        <option value={false}>No</option>
      </select>
    } else if (parentType === 'string') {
      options = [ ['equals', 'Equals'] ]
      inputs = <input type="text" value={condition.value} onChange={this.handleConditionValueChange} />
    } else if (parentType === 'number') {
      options = [ ['equals', 'Equals'], ['gt', 'Greater than'], ['lt', 'Less than'] ]
      inputs = <input type="number" value={condition.value} onChange={this.handleConditionValueChange} />
    }

    return [
      <span key="1" className={styles.label}>Condition</span>,
      <span key="2" className={styles.conditionFields}>
        <select value={condition.type} onChange={this.handleConditionChange}>
          {
            options.map(opt =>
              <option key={opt[0]} value={opt[0]}>{opt[1]}</option>
            )
          }
        </select>
        {inputs}
      </span>
    ]
  }

  render () {
    let {
      question,
      type
    } = this.props

    return <div className={styles.container}>
      <div className={styles.content}>
        { this.getCondition() }

        <span className={styles.label}>Question</span>
        <span className={styles.field}>
          <input id="text-input" value={question} onChange={this.handleQuestionValueChange} />
        </span>

        <span className={styles.label}>Type</span>
        <span className={styles.field}>
          <select value={type} onChange={this.handleQuestionChange}>
            <option value="boolean">Yes / No</option>
            <option value="string">Text</option>
            <option value="number">Number</option>
          </select>
        </span>

        <div className={styles.field}>
          <div className={styles.actions}>
            <button onClick={this.handleAddSubquestion}>Add Sub-Input</button>
            <button onClick={this.handleDeleteQuestion}>Delete</button>
          </div>
          <div style={{ clear: 'both' }} />
        </div>
      </div>

      <div className={styles.children}>
        {this.getSubinputs()}
      </div>
    </div>
  }
}

const FormInput = connect(state => ({
  root: state.root
}), {
  changeConditionType,
  changeQuestionType,
  changeConditionValue,
  changeQuestionValue,
  addNewSubquestion,
  deleteQuestion
})(FormInputP)

class CreateTab extends Component {
  static propTypes = {
    root: PropTypes.array,
    addNewQuestion: PropTypes.func
  }

  getInputs () {
    let {
      root
    } = this.props

    return root.map((node, i) =>
      <FormInput key={i + node.type} {...node} path={[i]} />
    )
  }

  handleAddQuestion = (e) => {
    this.props.addNewQuestion()
  }

  render () {
    return <div>
      { this.getInputs() }
      <button onClick={this.handleAddQuestion}>Add Input</button>
    </div>
  }
}

export default connect(state => ({
}), {
  addNewQuestion
})(CreateTab)
