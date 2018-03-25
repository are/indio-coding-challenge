import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import App from './app/App'
import store from './store'

store.subscribe(() => {
  let state = store.getState()

  localStorage.setItem('form-shape', JSON.stringify(state.root))
})

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
)
