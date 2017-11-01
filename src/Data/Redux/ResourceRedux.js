import { createActions, createState, createReducer } from 'reduxsauce-crud'

/* ------------- Types and Action Creators ------------- */

export const ResourceRedux = createActions({}, {
  prefix: 'RESOURCE_',
  defaultActions: {
    get: true,
    getOne: true,
  },
})

const { Types, Creators } = ResourceRedux
export const ResourceTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = createState({}, {
  get: true,
  getOne: true,
  getOneInitial: {
    resourceType: '',
    resource: '',
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
