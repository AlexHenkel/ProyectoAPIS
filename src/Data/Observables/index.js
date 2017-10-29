import { combineEpics, createEpicMiddleware } from 'redux-observable'
import Api from '../Api'
import { groupsEpic } from './GroupsObservable'
import { overviewEpic } from './OverviewObservable'

const rootEpic = combineEpics(
  groupsEpic,
  overviewEpic,
)

export default createEpicMiddleware(rootEpic, {
  dependencies: { Api },
})
