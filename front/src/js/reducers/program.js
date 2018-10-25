import { SELECT_PROGRAM, RECEIVE_PROGRAMS, ADD_PROGRAM } from '../actions/program'

export function selectedProgram(state='', action){
  switch (action.type) {
    case SELECT_PROGRAM:
      console.log ("action ---> ", action)
      return action.payload.program_id
    default:
      return state
  }
}

export function programs(state=[], action){
  switch (action.type) {
    case RECEIVE_PROGRAMS:
      return action.programs
    case ADD_PROGRAM:
      return [...state, action.program]
    default:
      return state
  }
}
