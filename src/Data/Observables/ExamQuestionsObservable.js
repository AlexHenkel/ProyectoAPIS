import createCRUDObservable from 'redux-observable-crud'
import { combineEpics } from 'redux-observable'
import { ExamQuestionsRedux } from '../Redux/ExamQuestionsRedux'

const examQuestionsCrudObservable = createCRUDObservable({
  mainRedux: ExamQuestionsRedux,
  reduxPath: 'examQuestions',
  generalDataHandler: res => res.data,
})

// For testing
export const examQuestionsObservers = Object.assign({}, examQuestionsCrudObservable.observers, {})

export const examQuestionsEpic = combineEpics(examQuestionsCrudObservable.epic)
