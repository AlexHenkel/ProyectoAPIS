import { combineEpics, createEpicMiddleware } from 'redux-observable'
import Api from '../Api'
import { groupsEpic } from './GroupsObservable'
import { overviewEpic } from './OverviewObservable'
import { examsEpic } from './ExamsObservable'
import { teacherGroupExamsEpic } from './TeacherGroupExamsObservable'
import { questionsEpic } from './QuestionsObservable'
import { tagsEpic } from './TagsObservable'

const rootEpic = combineEpics(
  groupsEpic,
  overviewEpic,
  examsEpic,
  teacherGroupExamsEpic,
  questionsEpic,
  tagsEpic,
)

export default createEpicMiddleware(rootEpic, {
  dependencies: { Api },
})
