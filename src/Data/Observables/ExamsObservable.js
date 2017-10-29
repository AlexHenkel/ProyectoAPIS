import createCRUDObservable from 'redux-observable-crud'
import { combineEpics } from 'redux-observable'
import { ExamsRedux } from '../Redux/ExamsRedux'

const examsCrudObservable = createCRUDObservable({
  mainRedux: ExamsRedux,
  reduxPath: 'exams',
  generalDataHandler: res => res.data,
})

// For testing
export const examsObservers = Object.assign({}, examsCrudObservable.observers, {})

export const examsEpic = combineEpics(examsCrudObservable.epic)
