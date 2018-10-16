import 'whatwg-fetch'

import { db } from './db'
import { authorized } from './tools'
import { fetchProgramSteps } from './programStep'

export const SELECT_PROGRAM = 'SELECT_PROGRAM'
export const RECEIVE_PROGRAMS = 'RECEIVE_PROGRAMS'
export const ADD_PROGRAM = 'ADD_PROGRAM'

export function selectProgram(program_id){
  return {
    type: SELECT_PROGRAM,
    program_id
  }
}
export function receivePrograms(programs){
  return {
    type: RECEIVE_PROGRAMS,
    programs
  }
}
export function addProgram(program){
  return {
    type: ADD_PROGRAM,
    program
  }
}

export function fetchPrograms() {
  return dispatch => {
    authorized(dispatch, db.fetchPrograms())
    .then((programs) => {
      console.log ("--- GOT PROGRAMS ---")
      dispatch(receivePrograms(programs))
    })
  }
}

export function fetchCreateProgram(name, visibility) {
  return dispatch => {
    authorized(dispatch, db.fetchCreateProgram(name, visibility))
    .then((program) => {
      console.log ("--- GOT NEW PROGRAM ---")
      dispatch(addProgram(program))
    })
  }
}
