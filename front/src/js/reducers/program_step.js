import { RECEIVE_PROGRAM_STEPS } from '../actions/programStep'

export function program_steps(state=[], action){
  switch (action.type) {
    case RECEIVE_PROGRAM_STEPS:
      return action.payload.program_steps
    default:
      return state
  }
}
