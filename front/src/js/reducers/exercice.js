import { RECEIVE_EXERCICES, ADD_EXERCICE } from '../actions/exercice'

export function exercices(state=[], action){
  switch (action.type) {
    case RECEIVE_EXERCICES:
      return action.exercices
    case ADD_EXERCICE:
      return [...state, action.exercice]
    default:
      return state
  }
}
