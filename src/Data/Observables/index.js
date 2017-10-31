import { combineEpics, createEpicMiddleware } from 'redux-observable'
import Api from '../Api'
import { groupsEpic } from './GroupsObservable'
import { overviewEpic } from './OverviewObservable'
import { studentStateEpic } from './StudentStateObservable'
import { examsEpic } from './ExamsObservable'
import { teacherGroupExamsEpic } from './TeacherGroupExamsObservable'
import { questionsEpic } from './QuestionsObservable'
import { tagsEpic } from './TagsObservable'
import { groupExamResultsEpic } from './GroupExamResultsObservable'
import { groupResultsEpic } from './GroupResultsObservable'

const rootEpic = combineEpics(
  groupsEpic,
  overviewEpic,
  studentStateEpic,
  examsEpic,
  teacherGroupExamsEpic,
  questionsEpic,
  tagsEpic,
  groupExamResultsEpic,
  groupResultsEpic,
)

export default createEpicMiddleware(rootEpic, {
  dependencies: { Api },
})
