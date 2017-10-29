import createCRUDObservable from 'redux-observable-crud'
import { combineEpics } from 'redux-observable'
import { TagsRedux } from '../Redux/TagsRedux'

const tagsCrudObservable = createCRUDObservable({
  mainRedux: TagsRedux,
  reduxPath: 'tags',
  generalDataHandler: res => res.data,
})

// For testing
export const tagsObservers = Object.assign({}, tagsCrudObservable.observers, {})

export const tagsEpic = combineEpics(tagsCrudObservable.epic)
