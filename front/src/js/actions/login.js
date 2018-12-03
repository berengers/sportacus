import 'whatwg-fetch'

import { authorized } from './tools'
import { db } from './db'
import * as type from './const'

export function fetchToken(email, password){
  return dispatch => {
    db.fetchToken(email, password, dispatch)
    .then((token) => {
      console.log ("--- GET TOKEN ---")
      localStorage.setItem('token', token)
      dispatch({ type: type.HOME })
    })
  }
}

export function logout(){
  return dispatch => {
    authorized(dispatch, db.logout())
    .then((resp) => {
      console.log ("--- REMOVE TOKEN ---")
      localStorage.removeItem('token')
    })
  }
}
