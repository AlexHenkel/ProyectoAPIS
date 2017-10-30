import { createActions, createState, createReducer } from 'reduxsauce-crud'

/* ------------- Types and Action Creators ------------- */

export const GroupsRedux = createActions({
  selectActiveGroup: ['id', 'name'],
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
  activeGroupName: '',
}, {
  get: true,
  getOne: true,
  create: true,
  update: true,
  remove: true,
})

/* ------------- Reducers ------------- */

const selectActiveGroup = (state, { id, name }) =>
  state.merge({ activeGroup: id, activeGroupName: name })

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
