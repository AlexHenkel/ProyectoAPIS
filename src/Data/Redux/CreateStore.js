import { createStore, applyMiddleware, compose } from 'redux'
import { createState } from 'reduxsauce-crud'
import { loadState } from '../../localStorage'

const persistedState = loadState()
const toLoadState = persistedState ? {
  user: createState(persistedState),
} : {}

const toComponse = (middlewares) => {
  if (window.__REDUX_DEVTOOLS_EXTENSION__) { // eslint-disable-line
    return compose(
      applyMiddleware(...middlewares),
      window.__REDUX_DEVTOOLS_EXTENSION__(), // eslint-disable-line
    )
  }
  return compose(applyMiddleware(...middlewares))
}

// creates the store
export default (rootReducer, middlewares) => {
  const store = createStore(rootReducer, toLoadState, toComponse(middlewares))
  return store
}
