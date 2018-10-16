import { authorized } from './tools'
import { db } from './db'

export const RECEIVE_EXERCICES = 'RECEIVE_EXERCICES'
export const ADD_EXERCICE = 'ADD_EXERCICE'

export function receiveExercices(exercices){
  return {
    type: RECEIVE_EXERCICES,
    exercices
  }
}

export function addExercice(exercice){
  return {
    type: ADD_EXERCICE,
    exercice
  }
}

export function fetchExercices(){
  return dispatch => {
    authorized(dispatch, db.fetchExercices())
    .then((exercices) => {
      console.log ("--- GOT EXERCICES ---")
      dispatch(receiveExercices(exercices))
    })
  }
}

export function fetchCreateExercice(name, image, visibility){
  return dispatch => {
    authorized(dispatch, db.fetchCreateExercice(name, image, visibility))
    .then((exercice) => {
      console.log ("--- NEW EXERCICE ---")
      console.log ("exercice ---> ", exercice)
      dispatch(addExercice(exercice))
    })
  }
}
