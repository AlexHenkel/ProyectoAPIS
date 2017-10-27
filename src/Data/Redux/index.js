import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import epicMiddleware from '../Observables'

export default (middlewares) => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    groups: require('./GroupsRedux').reducer,
  })

  return configureStore(rootReducer, [epicMiddleware, ...middlewares])
}
