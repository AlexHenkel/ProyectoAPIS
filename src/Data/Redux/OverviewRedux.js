import { createActions, createState, createReducer } from 'reduxsauce-crud'

/* ------------- Types and Action Creators ------------- */

export const OverviewRedux = createActions({}, {
  prefix: 'OVERVIEW_',
  defaultActions: {
    getOne: true,
  },
})

const { Types, Creators } = OverviewRedux
export const OverviewTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = createState({}, {
  getOne: true,
  getOneInitial: {
    currentExams: [],
    pastExams: [],
    students: [],
    top10: [],
    groupCode: '',
  },
})

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {}, {
  defaultActions: {
    getOne: true,
  },
  Types,
})
