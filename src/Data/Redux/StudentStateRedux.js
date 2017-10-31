import { createActions, createState, createReducer } from 'reduxsauce-crud'

/* ------------- Types and Action Creators ------------- */

export const StudentStateRedux = createActions({}, {
  prefix: 'STUDENT_STATE_',
  defaultActions: {
    get: true,
    getOne: true,
    update: true,
  },
})

const { Types, Creators } = StudentStateRedux
export const StudentStateTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = createState({}, {
  get: true,
  getOne: true,
  getOneInitial: {
    state: 'free',
    examId: -1,
  },
  update: true,
})

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {}, {
  defaultActions: {
    get: true,
    getOne: true,
    update: true,
  },
  Types,
})
