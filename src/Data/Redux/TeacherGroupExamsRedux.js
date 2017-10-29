import { createActions, createState, createReducer } from 'reduxsauce-crud'

/* ------------- Types and Action Creators ------------- */

export const TeacherGroupExamsRedux = createActions({}, {
  prefix: 'TEACHER_GROUP_EXAMS_',
  defaultActions: {
    get: true,
    getOne: true,
    create: true,
    update: true,
    remove: true,
  },
})

const { Types, Creators } = TeacherGroupExamsRedux
export const TeacherGroupExamsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = createState({}, {
  get: true,
  getOne: true,
  create: true,
  update: true,
  remove: true,
})

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {}, {
  defaultActions: {
    get: true,
    getOne: true,
    create: true,
    update: true,
    remove: true,
  },
  Types,
})
