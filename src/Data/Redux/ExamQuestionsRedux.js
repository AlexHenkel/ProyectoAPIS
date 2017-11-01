import { createActions, createState, createReducer } from 'reduxsauce-crud'

/* ------------- Types and Action Creators ------------- */

export const ExamQuestionsRedux = createActions({}, {
  prefix: 'EXAM_QUESTIONS_',
  defaultActions: {
    get: true,
    getOne: true,
    create: true,
  },
})

const { Types, Creators } = ExamQuestionsRedux
export const ExamQuestionsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = createState({}, {
  get: true,
  getOne: true,
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
