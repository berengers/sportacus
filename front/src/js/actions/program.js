import 'whatwg-fetch'

import { db } from './db'
import { authorized } from './tools'
import { fetchSteps } from './step'

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

// export function fetchSteps(program_id) {
//   return dispatch => {
//     authorized(dispatch, db.fetchSteps(program_id))
//     .then((steps) => {
//       console.log ("--- GOT STEPS ---")
//       dispatch({ type: "RECEIVE_STEPS", payload: { steps } })
//     })
//   }
// }

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
