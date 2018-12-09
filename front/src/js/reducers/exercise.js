import * as type from '../actions/const'
import { authorized } from '../actions/tools'
import { db } from '../actions/db'

export function exercises(state=[], action){
  switch (action.type) {
    case type.RECEIVE_EXERCISES:
      return action.payload.exercises
    case type.ADD_EXERCISE:
      return [...state, action.payload.exercise]
    case type.DELETE_EXERCISE:
      return state.filter(exercise => exercise.id != action.payload.id)
    default:
      return state
  }
}

const initialState = { id:0, name:"", image:"", description:"", visibility:"PRIVATE" }

export function currentExercise(state=initialState, action){
  switch (action.type) {
    case type.CURRENT_EXERCISE:
      return action.payload.exercise
    case type.INITIAL_CURRENT_EXERCISE:
    case type.NEW_STEP:
    case type.NEW_EXERCISE:
      return initialState
    default:
      return state
  }
}
