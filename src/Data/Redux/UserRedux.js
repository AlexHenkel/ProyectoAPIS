import { createActions, createState, createReducer } from 'reduxsauce-crud'
import { saveState, removeState } from '../../localStorage'

/* ------------- Types and Action Creators ------------- */

export const UserRedux = createActions({
  loginRequest: ['data', 'isTeacher'],
  loginSuccess: ['result', 'isTeacher'],
  loginFailure: ['error'],
  registerRequest: ['data', 'isTeacher'],
  registerSuccess: ['result', 'isTeacher'],
  registerFailure: ['error'],
  logout: null,
}, {
  prefix: 'STUDENT_STATE_',
})

const { Types, Creators } = UserRedux
export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = createState({
  fetching: false,
  userId: null,
  isTeacher: false,
  error: null,
})

/* ------------- Reducers ------------- */

const loginRequest = state => state.merge({ fetching: true })
const loginSuccess = (state, { result: { id }, isTeacher }) => {
  const newState = state.merge({ fetching: false, userId: id, isTeacher })
  saveState(newState)
  return newState
}
const loginFailure = (state, { error }) => state.merge({ fetching: false, error })
const registerRequest = state => state.merge({ fetching: true })
const registerSuccess = (state, { result: { id }, isTeacher }) => {
  const newState = state.merge({ fetching: false, userId: id, isTeacher })
  saveState(newState)
  return newState
}
const registerFailure = (state, { error }) => state.merge({ fetching: false, error })
const logout = state => removeState() || state.merge({ userId: null, error: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.loginRequest]: loginRequest,
  [Types.loginSuccess]: loginSuccess,
  [Types.loginFailure]: loginFailure,
  [Types.registerRequest]: registerRequest,
  [Types.registerSuccess]: registerSuccess,
  [Types.registerFailure]: registerFailure,
  [Types.logout]: logout,
})
