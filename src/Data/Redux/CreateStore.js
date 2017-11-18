import { createStore, applyMiddleware, compose } from 'redux'
import { createState } from 'reduxsauce-crud'
import { loadState } from '../../localStorage'

const persistedState = loadState()
const toLoadState = persistedState ? {
  user: createState(persistedState),
} : {}

// creates the store
export default (rootReducer, middlewares) => {
  const store = createStore(
    rootReducer,
    toLoadState,
    compose(
      applyMiddleware(...middlewares),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // eslint-disable-line
    ),
  )

  return store
}
