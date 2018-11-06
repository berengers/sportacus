import 'whatwg-fetch'

import { authorized } from './tools'
import { db } from './db'

export function fetchToken(email, password){
  return dispatch => {
    authorized(dispatch, db.fetchToken(email, password))
    .then((token) => {
      console.log ("--- GET TOKEN ---")
      localStorage.setItem('token', token)
      dispatch({ type: "HOME" })
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
