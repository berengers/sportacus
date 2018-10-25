import 'whatwg-fetch'

import { authorized } from './tools'
import { db } from './db'
import { push } from 'react-router-redux'

export function fetchToken(email, password){
  console.log ("4444444444444444444444 email, password ---> ", email, password)
  return dispatch => {
    authorized(dispatch, db.fetchToken(email, password))
    .then((token) => {
      localStorage.setItem('token', token)
      console.log ("token ---> ", token)
      // dispatch(push('/'))
    })
  }
}

export function logout(){
  return dispatch => {
    authorized(dispatch, db.logout())
    .then((resp) => {
      localStorage.removeItem('token')
      dispatch(push('/login'))
    })
  }
}
