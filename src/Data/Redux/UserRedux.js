import { createActions, createState, createReducer } from 'reduxsauce-crud'

/* ------------- Types and Action Creators ------------- */

export const UserRedux = createActions({
  loginRequest: ['data', 'isTeacher'],
  loginSuccess: ['result', 'isTeacher'],
  loginError: ['error'],
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
  userId: 1,
  isTeacher: false,
  error: null,
})

/* ------------- Reducers ------------- */

const loginRequest = state => state.merge({ fetching: true })
const loginSuccess = (state, { result: { id }, isTeacher }) =>
  state.merge({ fetching: false, userId: id, isTeacher })
const loginError = (state, { error }) => state.merge({ fetching: false, error })
const logout = state => state.merge({ userId: null, error: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.loginRequest]: loginRequest,
  [Types.loginSuccess]: loginSuccess,
  [Types.loginError]: loginError,
  [Types.logout]: logout,
})
