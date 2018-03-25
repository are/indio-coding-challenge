import {
  setIn,
  getIn,
  updateIn,
  removeIn
} from 'immutable'

import {
  CHANGE_TAB,
  CHANGE_CONDITION_TYPE,
  CHANGE_QUESTION_TYPE,
  CHANGE_CONDITION_VALUE,
  CHANGE_QUESTION_VALUE,
  ADD_NEW_QUESTION,
  ADD_NEW_SUBQUESTION,
  DELETE_QUESTION
} from './actions'

const initialState = {
  currentTab: 'create',
  root: []
}

function * intersperse (array, delimiter) {
  yield array[0]
  for (const element of array.slice(1)) {
    yield delimiter
    yield element
  }
}

const getDefaultConditionValue = (type) => {
  if (type === 'boolean') {
    return false
  }

  if (type === 'number') {
    return 0
  }

  if (type === 'string') {
    return ''
  }
}

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case CHANGE_TAB:
      return { ...state, currentTab: payload }
    case CHANGE_CONDITION_TYPE:
      return {
        ...state,
        root: setIn(
          state.root,
          [...intersperse(payload.path, 'children'), 'condition', 'type'],
          payload.value
        )
      }
    case CHANGE_QUESTION_TYPE:
      let intermediateState = {
        ...state,
        root: setIn(
          state.root,
          [...intersperse(payload.path, 'children'), 'type'],
          payload.value
        )
      }

      intermediateState = {
        ...state,
        root: updateIn(
          intermediateState.root,
          [...intersperse(payload.path, 'children'), 'children'],
          [],
          children => children.map(child =>
            child.condition ? setIn(child, [ 'condition' ], {
              type: 'equals',
              value: getDefaultConditionValue(child.type)
            }) : child
          )
        )
      }

      return intermediateState
    case CHANGE_CONDITION_VALUE:
      return {
        ...state,
        root: setIn(
          state.root,
          [...intersperse(payload.path, 'children'), 'condition', 'value'],
          payload.value
        )
      }
    case CHANGE_QUESTION_VALUE:
      return {
        ...state,
        root: setIn(
          state.root,
          [...intersperse(payload.path, 'children'), 'question'],
          payload.value
        )
      }
    case ADD_NEW_QUESTION:
      return {
        ...state,
        root: state.root.concat({
          question: '',
          type: 'string',
          children: []
        })
      }
    case ADD_NEW_SUBQUESTION:
      return {
        ...state,
        root: updateIn(
          state.root,
          [...intersperse(payload.path, 'children')],
          (question) => updateIn(
            question,
            ['children'],
            [],
            children => children.concat({
              condition: {
                type: 'equals',
                value: getDefaultConditionValue(question.type)
              },
              question: '',
              type: 'string',
              children: []
            })
          )
        )
      }
    case DELETE_QUESTION:
      return {
        ...state,
        root: removeIn(
          state.root,
          [...intersperse(payload.path, 'children')]
        )
      }
  }

  return state
}
