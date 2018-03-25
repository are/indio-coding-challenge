import { createStore } from 'redux'
import reducer from './reducer.js'

let preloadedState = localStorage.getItem('form-shape')

let store
if (preloadedState !== null) {
  store = createStore(reducer, { currentTab: 'create', root: JSON.parse(preloadedState) })
} else {
  store = createStore(reducer)
}

export default store
