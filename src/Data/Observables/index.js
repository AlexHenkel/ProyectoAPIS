import { combineEpics, createEpicMiddleware } from 'redux-observable'
import Api from '../Api'
import { groupsEpic } from './GroupsObservable'

const rootEpic = combineEpics(
  groupsEpic,
)

export default createEpicMiddleware(rootEpic, {
  dependencies: { Api },
})
