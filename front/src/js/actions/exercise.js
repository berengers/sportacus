import { authorized } from './tools'
import { db } from './db'
import * as type from './const'

export function fetchExercises(){
  return dispatch => {
    authorized(dispatch, db.fetchExercises())
    .then((exercises) => {
      console.log ("--- GOT EXERCISES ---")
      dispatch({ type: type.RECEIVE_EXERCISES, payload: { exercises } })
    })
  }
}

export function fetchExercise(id){
  return dispatch => {
    authorized(dispatch, db.fetchExercise(id))
    .then((exercise) => {
      console.log ("--- GOT EXERCISE ---")
      dispatch({ type: type.CURRENT_EXERCISE, payload: { exercise } })
    })
  }
}

export function fetchCreateExercise(name, image, description, visibility){
  return dispatch => {
    console.log ("description fetch ---> ", description)
    authorized(dispatch, db.fetchCreateExercise(name, image, description, visibility))
    .then((exercise) => {
      console.log ("--- CREATE EXERCISE ---")
      dispatch({ type: type.ADD_EXERCISE, payload: { exercise } })
      dispatch({ type: type.EXERCISES })
    })
  }
}

export function fetchEditExercise(id, name, image, description, visibility){
  console.log ("description ---> ", description)
  return dispatch => {
    authorized(dispatch, db.fetchEditExercise(id, name, image, description, visibility))
    .then((exercise) => {
      console.log ("--- EDIT EXERCISE ---")
      console.log ("exercise ---> ", exercise)
      dispatch({ type: type.EDIT_EXERCISE, payload: { exercise } })
      dispatch({ type: type.EXERCISES })
    })
  }
}

export function fetchDeleteExercise(id){
  return dispatch => {
    authorized(dispatch, db.fetchDeleteExercise(id))
    .then((resp) => {
      console.log ("--- DELETE EXERCISE ---")
      dispatch({ type: type.DELETE_EXERCISE, payload: { id } })
      dispatch({ type: type.EXERCISES })
    })
  }
}
