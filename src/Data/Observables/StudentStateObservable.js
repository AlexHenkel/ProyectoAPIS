import createCRUDObservable from 'redux-observable-crud'
import { combineEpics } from 'redux-observable'
import { StudentStateRedux } from '../Redux/StudentStateRedux'

const studentStateCrudObservable = createCRUDObservable({
  mainRedux: StudentStateRedux,
  reduxPath: 'studentState',
  generalDataHandler: res => res.data,
})

// For testing
export const studentStateObservers = Object.assign({}, studentStateCrudObservable.observers, {})

export const studentStateEpic = combineEpics(studentStateCrudObservable.epic)
