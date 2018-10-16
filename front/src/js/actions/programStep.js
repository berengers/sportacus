import 'whatwg-fetch'

import { authorized } from './tools'
import { db } from './db'
import { selectProgram } from './program'

export const RECEIVE_PROGRAM_STEPS = 'RECEIVE_PROGRAM_STEPS'

export function receiveProgramSteps(program_steps){
  return {
    type : RECEIVE_PROGRAM_STEPS,
    program_steps
  }
}

export function fetchProgramSteps(program_id){
  return dispatch => {
    dispatch(selectProgram(program_id))
    authorized(dispatch, db.fetchProgramSteps(program_id))
    .then((program_steps) => {
      console.log ("--- GOT PROGRAM_STEPS ---")
      dispatch(receiveProgramSteps(program_steps))
    })
  }
}
