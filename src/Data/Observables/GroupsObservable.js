import createCRUDObservable from 'redux-observable-crud'
import { combineEpics } from 'redux-observable'
import { GroupsRedux } from '../Redux/GroupsRedux'

const groupsCrudObservable = createCRUDObservable({
  mainRedux: GroupsRedux,
  reduxPath: 'groups',
})

// For testing
export const groupsObservers = Object.assign({}, groupsCrudObservable.observers, {})

export const groupsEpic = combineEpics(groupsCrudObservable.epic)
