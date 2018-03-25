const action = type => ([
  type,
  payload => ({
    type,
    payload
  })
])

export const CHANGE_TAB = 'CHANGE_TAB'
export const changeTab = tabId => ({
  type: CHANGE_TAB,
  payload: tabId
})

export const [
  CHANGE_CONDITION_TYPE,
  changeConditionType
] = action('CHANGE_CONDITION_TYPE')

export const [
  CHANGE_QUESTION_TYPE,
  changeQuestionType
] = action('CHANGE_QUESTION_TYPE')

export const [
  CHANGE_CONDITION_VALUE,
  changeConditionValue
] = action('CHANGE_CONDITION_VALUE')

export const [
  CHANGE_QUESTION_VALUE,
  changeQuestionValue
] = action('CHANGE_QUESTION_VALUE')

export const [
  ADD_NEW_QUESTION,
  addNewQuestion
] = action('ADD_NEW_QUESTION')

export const [
  ADD_NEW_SUBQUESTION,
  addNewSubquestion
] = action('ADD_NEW_SUBQUESTION')

export const [
  DELETE_QUESTION,
  deleteQuestion
] = action('DELETE_QUESTION')
