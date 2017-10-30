import { createActions, createState, createReducer } from 'reduxsauce-crud'

/* ------------- Types and Action Creators ------------- */

export const GroupResultsRedux = createActions({}, {
  prefix: 'GROUP_RESULTS_',
  defaultActions: {
    get: true,
    getOne: true,
  },
})

const { Types, Creators } = GroupResultsRedux
export const GroupResultsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = createState({}, {
  get: true,
  getOne: true,
  getOneInitial: {
    exams: [],
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
