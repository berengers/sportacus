import { authorized } from './tools'
import { db } from './db'

export function fetchExercises(){
  return dispatch => {
    authorized(dispatch, db.fetchExercises())
    .then((exercises) => {
      console.log ("--- GOT EXERCISES ---")
      dispatch({ type: "RECEIVE_EXERCISES", payload: { exercises } })
    })
  }
}

export function fetchExercise(id){
  return dispatch => {
    authorized(dispatch, db.fetchExercise(id))
    .then((exercise) => {
      console.log ("--- GOT EXERCISE ---")
      dispatch({ type: "CURRENT_EXERCISE", payload: { exercise } })
    })
  }
}

export function fetchCreateExercise(name, image, visibility){
  console.log ("name, image, visibility ---> ", name, image, visibility)
  return dispatch => {
    authorized(dispatch, db.fetchCreateExercise(name, image, visibility))
    .then((exercise) => {
      console.log ("--- CREATE EXERCISE ---")
      dispatch({ type: "ADD_EXERCISE", payload: { exercise } })
      dispatch({ type: "EXERCISES" })
    })
  }
}

export function fetchEditExercise(id, name, image, visibility){
  return dispatch => {
    authorized(dispatch, db.fetchEditExercise(id, name, image, visibility))
    .then((exercise) => {
      console.log ("--- EDIT EXERCISE ---")
      dispatch({ type: "EDIT_EXERCISE", payload: { exercise } })
      dispatch({ type: "EXERCISES" })
    })
  }
}

export function fetchDeleteExercise(id){
  return dispatch => {
    authorized(dispatch, db.fetchDeleteExercise(id))
    .then((resp) => {
      console.log ("--- DELETE EXERCISE ---")
      dispatch({ type: "DELETE_EXERCISE", payload: { id } }),
      dispatch({ type: "EXERCISES" })
    })
  }
}
