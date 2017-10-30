import createCRUDObservable from 'redux-observable-crud'
import { combineEpics } from 'redux-observable'
import { GroupResultsRedux } from '../Redux/GroupResultsRedux'

const groupResultsCrudObservable = createCRUDObservable({
  mainRedux: GroupResultsRedux,
  reduxPath: 'groupResults',
  generalDataHandler: res => res.data,
})

// For testing
export const groupResultsObservers = Object.assign({}, groupResultsCrudObservable.observers, {})

export const groupResultsEpic = combineEpics(groupResultsCrudObservable.epic)
