import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import epicMiddleware from '../Observables'

export default (middlewares) => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    groups: require('./GroupsRedux').reducer,
    overview: require('./OverviewRedux').reducer,
    exams: require('./ExamsRedux').reducer,
    teacherGroupExams: require('./TeacherGroupExamsRedux').reducer,
    questions: require('./QuestionsRedux').reducer,
    tags: require('./TagsRedux').reducer,
    groupExamResults: require('./GroupExamResultsRedux').reducer,
  })

  return configureStore(rootReducer, [epicMiddleware, ...middlewares])
}
