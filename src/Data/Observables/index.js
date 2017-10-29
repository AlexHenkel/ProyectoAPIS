import { combineEpics, createEpicMiddleware } from 'redux-observable'
import Api from '../Api'
import { groupsEpic } from './GroupsObservable'
import { overviewEpic } from './OverviewObservable'
import { examsEpic } from './ExamsObservable'
import { teacherGroupExamsEpic } from './TeacherGroupExamsObservable'

const rootEpic = combineEpics(
  groupsEpic,
  overviewEpic,
  examsEpic,
  teacherGroupExamsEpic,
)

export default createEpicMiddleware(rootEpic, {
  dependencies: { Api },
})
