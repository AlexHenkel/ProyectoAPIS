import { combineEpics, createEpicMiddleware } from 'redux-observable'
import Api from '../Api'
import { groupsEpic } from './GroupsObservable'
import { overviewEpic } from './OverviewObservable'
import { studentStateEpic } from './StudentStateObservable'
import { examsEpic } from './ExamsObservable'
import { teacherGroupExamsEpic } from './TeacherGroupExamsObservable'
import { questionsEpic } from './QuestionsObservable'
import { tagsEpic } from './TagsObservable'
import { resourceEpic } from './ResourceObservable'
import { examQuestionsEpic } from './ExamQuestionsObservable'
import { groupExamResultsEpic } from './GroupExamResultsObservable'
import { groupResultsEpic } from './GroupResultsObservable'
import { userEpic } from './UserObservable'

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
  resourceEpic,
  examQuestionsEpic,
  userEpic,
)

export default createEpicMiddleware(rootEpic, {
  dependencies: { Api },
})
