import createCRUDObservable from 'redux-observable-crud'
import { combineEpics } from 'redux-observable'
import { ResourceRedux } from '../Redux/ResourceRedux'

const resourceCrudObservable = createCRUDObservable({
  mainRedux: ResourceRedux,
  reduxPath: 'resource',
  generalDataHandler: res => res.data,
})

// For testing
export const resourceObservers = Object.assign({}, resourceCrudObservable.observers, {})

export const resourceEpic = combineEpics(resourceCrudObservable.epic)
