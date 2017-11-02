import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import epicMiddleware from '../Observables'

export default (middlewares) => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    groups: require('./GroupsRedux').reducer,
    overview: require('./OverviewRedux').reducer,
    studentState: require('./StudentStateRedux').reducer,
    exams: require('./ExamsRedux').reducer,
    teacherGroupExams: require('./TeacherGroupExamsRedux').reducer,
    questions: require('./QuestionsRedux').reducer,
    tags: require('./TagsRedux').reducer,
    groupExamResults: require('./GroupExamResultsRedux').reducer,
    groupResults: require('./GroupResultsRedux').reducer,
    resource: require('./ResourceRedux').reducer,
    examQuestions: require('./ExamQuestionsRedux').reducer,
    user: require('./UserRedux').reducer,
  })

  return configureStore(rootReducer, [epicMiddleware, ...middlewares])
}
