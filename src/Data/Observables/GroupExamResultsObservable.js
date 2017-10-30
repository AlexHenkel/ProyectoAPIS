import createCRUDObservable from 'redux-observable-crud'
import { combineEpics } from 'redux-observable'
import { GroupExamResultsRedux } from '../Redux/GroupExamResultsRedux'

const groupExamResultsCrudObservable = createCRUDObservable({
  mainRedux: GroupExamResultsRedux,
  reduxPath: 'groupExamResults',
  generalDataHandler: res => res.data,
})

// For testing
export const groupExamResultsObservers = Object.assign({}, groupExamResultsCrudObservable.observers, {})

export const groupExamResultsEpic = combineEpics(groupExamResultsCrudObservable.epic)
