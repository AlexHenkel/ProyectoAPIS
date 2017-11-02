import 'rxjs'
import { combineEpics } from 'redux-observable'

import { UserRedux } from '../Redux/UserRedux'

const loginRequestEpic = (action$, store, { Api }) =>
  action$
    .ofType(UserRedux.Types.loginRequest)
    .mergeMap(({ data, isTeacher }) => (
      Api.user.login(data, isTeacher)
        .then(response => response.data.data)
        .then(result => UserRedux.Creators.createSuccess(result, isTeacher))
        .catch(error => UserRedux.Creators.createFailure(error))
    ))

// For testing
export const userObservers = Object.assign({}, {}, {
  loginRequestEpic,
})

export const userEpic = combineEpics(loginRequestEpic)
