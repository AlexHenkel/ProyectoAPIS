import { createActions, createState, createReducer } from 'reduxsauce-crud'

/* ------------- Types and Action Creators ------------- */

export const GroupExamResultsRedux = createActions({}, {
  prefix: 'GROUP_EXAM_RESULTS_',
  defaultActions: {
    get: true,
    getOne: true,
  },
})

const { Types, Creators } = GroupExamResultsRedux
export const GroupExamResultsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = createState({}, {
  get: true,
  getOne: true,
  getOneInitial: {
    questions: [],
    highestGrades: [],
    recentGrades: [],
  },
})

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {}, {
  defaultActions: {
    get: true,
    getOne: true,
  },
  Types,
})
