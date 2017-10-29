import { createActions, createState, createReducer } from 'reduxsauce-crud'

/* ------------- Types and Action Creators ------------- */

export const GroupsRedux = createActions({
  selectActiveGroup: ['id'],
}, {
  prefix: 'GROUPS_',
  defaultActions: {
    get: true,
    getOne: true,
    create: true,
    update: true,
    remove: true,
  },
})

const { Types, Creators } = GroupsRedux
export const GroupsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = createState({
  activeGroup: -1,
}, {
  get: true,
  getOne: true,
  create: true,
  update: true,
  remove: true,
})

/* ------------- Reducers ------------- */

const selectActiveGroup = (state, { id }) => state.merge({ activeGroup: id })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.selectActiveGroup]: selectActiveGroup,
}, {
  defaultActions: {
    get: true,
    getOne: true,
    create: true,
    update: true,
    remove: true,
  },
  Types,
})
