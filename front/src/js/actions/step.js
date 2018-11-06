import 'whatwg-fetch'

import { authorized } from './tools'
import { db } from './db'

export function fetchSteps(program_id){
  return dispatch => {
    // dispatch({ type: "SELECT_PROGRAM", payload: { program_id } })
    authorized(dispatch, db.fetchSteps(program_id))
    .then((program) => {
      console.log ("--- GOT STEPS ---")
      dispatch({ type: "CURRENT_PROGRAM", payload: { program } })
    })
  }
}

export function fetchStep(id){
  return dispatch => {
    authorized(dispatch, db.fetchStep(id))
    .then((step) => {
      dispatch({ type: "CURRENT_STEP", payload: { step } })
    })
  }
}

export function fetchCreateStep(repetitions, series, weight, rest_bs, rest_be, program_id, exercise_id){
  return dispatch => {
    authorized(dispatch, db.fetchCreateStep(repetitions, series, weight, rest_bs, rest_be, program_id, exercise_id))
    .then((step) => {
      console.log ("--- ADD STEP ---")
      dispatch({ type: "ADD_STEP", payload: { step } })
      dispatch({ type: "PROGRAM", payload: { program_id } })
    })
  }
}

export function fetchDeleteStep(id){
  return dispatch => {
    authorized(dispatch, db.fetchDeleteStep(id))
    .then((resp) => {
      console.log ("--- DELETE STEP ---")
      dispatch({ type: "DELETE_STEP", payload: { id } })
    })
  }
}

export function fetchEditStep(id, repetitions, series, weight, rest_bs, rest_be, program_id, exercise_id){
  return dispatch => {
    authorized(dispatch, db.fetchEditStep(id, repetitions, series, weight, rest_bs, rest_be, program_id, exercise_id))
    .then((step) => {
      console.log ("--- EDIT STEP ---> ")
      dispatch({ type: "EDIT_STEP", payload: { step } })
      dispatch({ type: "PROGRAM", payload: { program_id } })
    })
  }
}
