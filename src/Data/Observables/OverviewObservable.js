import createCRUDObservable from 'redux-observable-crud'
import { combineEpics } from 'redux-observable'
import { OverviewRedux } from '../Redux/OverviewRedux'

const overviewCrudObservable = createCRUDObservable({
  mainRedux: OverviewRedux,
  reduxPath: 'overview',
  generalDataHandler: res => res.data,
})

// For testing
export const overviewObservers = Object.assign({}, overviewCrudObservable.observers, {})

export const overviewEpic = combineEpics(overviewCrudObservable.epic)
