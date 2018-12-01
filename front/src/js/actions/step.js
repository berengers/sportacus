import 'whatwg-fetch'

import { authorized } from './tools'
import { db } from './db'
import * as type from './const'

export function fetchStep(id){
  return dispatch => {
    authorized(dispatch, db.fetchStep(id))
    .then((step) => {
      dispatch({ type: type.CURRENT_STEP, payload: { step } })
    })
  }
}

export function fetchCreateStep(program_id, exercise_id){
  return dispatch => {
    authorized(dispatch, db.fetchCreateStep(program_id, exercise_id))
    .then((step) => {
      console.log ("--- ADD STEP ---")
      dispatch({ type: type.ADD_STEP, payload: { step } })
      // dispatch({ type: type.PROGRAM, payload: { program_id } })
    })
  }
}

export function fetchDeleteStep(id){
  return dispatch => {
    authorized(dispatch, db.fetchDeleteStep(id))
    .then((resp) => {
      console.log ("--- DELETE STEP ---")
      dispatch({ type: type.DELETE_STEP, payload: { id } })
    })
  }
}

export function fetchEditStep(id, repetitions, series, weight, rest, rest_end, program_id, exercise_id){
  return dispatch => {
    authorized(dispatch, db.fetchEditStep(id, repetitions, series, weight, rest, rest_end, program_id, exercise_id))
    .then((step) => {
      console.log ("--- EDIT STEP ---> ")
      dispatch({ type: type.EDIT_STEP, payload: { step } })
      dispatch({ type: type.PROGRAM, payload: { program_id } })
    })
  }
}
