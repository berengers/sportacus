import { push } from 'react-router-redux'

import { AuthorizationError } from './db'

export function authorized(dispatch, promise){
  promise.catch( (err) => {
    if (err instanceof AuthorizationError) {
      localStorage.removeItem('token')
      dispatch(push('/login'))
    } else {
      console.log ("Probleme but not AuthorizationError ---> ", err)
      throw err
    }
  })
  return promise
}
