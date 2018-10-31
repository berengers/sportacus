import { RECEIVE_EXERCISES, ADD_EXERCISE, fetchCreateExercise } from '../actions/exercise'
import { authorized } from '../actions/tools'
import { db } from '../actions/db'

export function exercises(state=[], action){
  switch (action.type) {
    case "RECEIVE_EXERCISES":
      return action.payload.exercises
    case "ADD_EXERCISE":
      return [...state, action.payload.exercise]
    case "DELETE_EXERCISE":
      return state.filter(exercise => exercise.id != action.payload.id)
    default:
      return state
  }
}

const initialState = { id:0, name:"", image:"", visibility:"PRIVATE" }
export function currentExercise(state=initialState, action){
  switch (action.type) {
    case "CURRENT_EXERCISE":
      return action.payload.exercise
    case "INITIAL_CURRENT_EXERCISE":
      return initialState
    default:
      return state
  }
}
