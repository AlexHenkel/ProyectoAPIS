import { createActions, createState, createReducer } from 'reduxsauce-crud'

/* ------------- Types and Action Creators ------------- */

export const TagsRedux = createActions({}, {
  prefix: 'TAGS_',
  defaultActions: {
    get: true,
    getOne: true,
  },
})

const { Types, Creators } = TagsRedux
export const TagsTypes = Types
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
