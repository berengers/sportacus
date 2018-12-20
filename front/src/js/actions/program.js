import 'whatwg-fetch'

import { db } from './db'
import { authorized } from './tools'
import * as type from './const'


export function fetchPrograms() {
  return dispatch => {
    authorized(dispatch, db.fetchPrograms())
    .then((programs) => {
      console.log ("--- GOT PROGRAMS ---")
      dispatch({ type: type.RECEIVE_PROGRAMS, payload: { programs } })
    })
  }
}


export function fetchProgram(program_id){
  return dispatch => {
    authorized(dispatch, db.fetchProgram(program_id))
    .then((program) => {
      console.log ("--- GOT PROGRAM ---")
      dispatch({ type: type.CURRENT_PROGRAM, payload: { program } })
    })
  }
}


export function fetchCreateProgram(name, visibility) {
  return dispatch => {
    authorized(dispatch, db.fetchCreateProgram(name, visibility))
    .then((program) => {
      console.log ("--- GOT NEW PROGRAM ---")
      dispatch({ type: type.ADD_PROGRAM, payload: { program } })
      dispatch({ type: type.PROGRAM, payload: { program_id: program.id, program_name: program.name } })
    })
  }
}

export function fetchUpdateProgram(program){
  return dispatch => {
    authorized(dispatch, db.fetchUpdateProgram(program))
    .then((resp) => {
      console.log ("--- UPDATE PROGRAM ---")
      dispatch({ type: type.UPDATE_PROGRAM })
    })
  }
}
