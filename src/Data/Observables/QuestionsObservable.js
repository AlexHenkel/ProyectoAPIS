import createCRUDObservable from 'redux-observable-crud'
import { combineEpics } from 'redux-observable'
import { QuestionsRedux } from '../Redux/QuestionsRedux'

const questionsCrudObservable = createCRUDObservable({
  mainRedux: QuestionsRedux,
  reduxPath: 'questions',
  generalDataHandler: res => res.data,
})

// For testing
export const questionsObservers = Object.assign({}, questionsCrudObservable.observers, {})

export const questionsEpic = combineEpics(questionsCrudObservable.epic)
