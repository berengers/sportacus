import 'whatwg-fetch'

import { authorized } from './tools'
import { db } from './db'
import { push } from 'react-router-redux'

export function fetchToken(email, password){
  return dispatch => {
    authorized(dispatch, db.fetchToken(email, password))
    .then((token) => {
      localStorage.setItem('token', token)
      console.log ("token ---> ", token)
      dispatch(push('/'))
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
