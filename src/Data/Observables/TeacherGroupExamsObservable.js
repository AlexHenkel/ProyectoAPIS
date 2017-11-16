import createCRUDObservable from 'redux-observable-crud'
import { combineEpics } from 'redux-observable'
import { TeacherGroupExamsRedux } from '../Redux/TeacherGroupExamsRedux'
import { OverviewRedux } from '../Redux/OverviewRedux'

const teacherGroupExamsCrudObservable = createCRUDObservable({
  mainRedux: TeacherGroupExamsRedux,
  reduxPath: 'teacherGroupExams',
  generalDataHandler: res => res.data,
  create: {
    onSuccessActions: [
      {
        redux: OverviewRedux,
        pathToUpdate: null,
      },
    ],
  },
  update: {
    onSuccessActions: [
      {
        redux: OverviewRedux,
        pathToUpdate: null,
      },
    ],
  },
  remove: {
    onSuccessActions: [
      {
        redux: OverviewRedux,
        pathToUpdate: 'currentExams',
      },
    ],
  },
})

// For testing
export const teacherGroupExamsObservers = Object.assign({}, teacherGroupExamsCrudObservable.observers, {})

export const teacherGroupExamsEpic = combineEpics(teacherGroupExamsCrudObservable.epic)
