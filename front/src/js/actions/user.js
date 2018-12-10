import { db } from './db'
import * as type from './const'

export function fetchCreateUser(email, username, password){
  return (dispatch) => {
    return db.fetchCreateUser(email, username, password)
    .then((resp) => {
      if (resp.status === 403) {
        resp.json().then( error => {
          dispatch({ type: type.ERROR_REGISTER, payload: error })
        })
      } else {
        resp.json().then( user => {
          dispatch({ type: type.LOGIN, payload: { user } })
        })
      }
    })
  }
}
