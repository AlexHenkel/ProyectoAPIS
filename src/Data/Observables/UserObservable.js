import 'rxjs'
import { combineEpics } from 'redux-observable'

import { UserRedux } from '../Redux/UserRedux'

const loginRequestEpic = (action$, store, { Api }) =>
  action$
    .ofType(UserRedux.Types.loginRequest)
    .mergeMap(({ data, isTeacher }) => (
      Api.user.login(data, isTeacher)
        .then(response => response.data)
        .then(result => UserRedux.Creators.loginSuccess(result, isTeacher))
        .catch(error => UserRedux.Creators.loginFailure(error))
    ))

const registerRequestEpic = (action$, store, { Api }) =>
  action$
    .ofType(UserRedux.Types.registerRequest)
    .mergeMap(({ data, isTeacher }) => (
      Api.user.register(data, isTeacher)
        .then(response => response.data)
        .then(result => UserRedux.Creators.registerSuccess(result, isTeacher))
        .catch(error => UserRedux.Creators.registerFailure(error))
    ))

// For testing
export const userObservers = Object.assign({}, {}, {
  loginRequestEpic,
  registerRequestEpic,
})

export const userEpic = combineEpics(
  loginRequestEpic,
  registerRequestEpic,
)
