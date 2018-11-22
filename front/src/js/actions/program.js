import 'whatwg-fetch'

import { db } from './db'
import { authorized } from './tools'

export const SELECT_PROGRAM = 'SELECT_PROGRAM'

export function selectProgram(program_id){
  return {
    type: SELECT_PROGRAM,
    program_id
  }
}

export function fetchPrograms() {
  return dispatch => {
    authorized(dispatch, db.fetchPrograms())
    .then((programs) => {
      console.log ("--- GOT PROGRAMS ---")
      dispatch({ type: "RECEIVE_PROGRAMS", payload: { programs } })
    })
  }
}


export function fetchProgram(program_id){
  return dispatch => {
    // dispatch({ type: "SELECT_PROGRAM", payload: { program_id } })
    authorized(dispatch, db.fetchProgram(program_id))
    .then((program) => {
      console.log ("--- GOT PROGRAM ---")
      dispatch({ type: "CURRENT_PROGRAM", payload: { program } })
      dispatch({ type: "CHARGED" })
    })
  }
}


export function fetchCreateProgram(name, visibility) {
  return dispatch => {
    authorized(dispatch, db.fetchCreateProgram(name, visibility))
    .then((program) => {
      console.log ("--- GOT NEW PROGRAM ---")
      dispatch({ type: "ADD_PROGRAM", payload: { program } })
      dispatch({ type: "PROGRAM", payload: { program_id: program.id, program_name: program.name } })
    })
  }
}

export function fetchUpdateProgram(program){
  return disabled => {
    authorized(dispatch, db.fetchUpdateProgram(program))
    .then((resp) => {
      console.log ("--- UPDATE PROGRAM ---")
    })
  }
}
