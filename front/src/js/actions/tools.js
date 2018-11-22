import { redirect } from 'redux-first-router'

import { AuthorizationError } from './db'

export function authorized(dispatch, promise){
  promise.catch( (err) => {
    if (err instanceof AuthorizationError) {
      localStorage.removeItem('token')
      dispatch(redirect({ type: "LOGIN" }))
    } else {
      console.log ("Probleme but not authorization error ---> ", err)
      throw err
    }
  })
  return promise
}
