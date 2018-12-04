import * as type from '../actions/const'

const initialState = {
  id: "",
  name: "",
  visibility: ""
}

export function currentProgram(state=initialState, action){
  switch (action.type) {
    case type.CURRENT_PROGRAM:
      return {
        id: action.payload.program.id,
        name: action.payload.program.name,
        visibility: action.payload.program.visibility
      }
    default:
      return state
  }
}

export function programs(state=[], action){
  switch (action.type) {
    case type.RECEIVE_PROGRAMS:
      return action.payload.programs
    case type.ADD_PROGRAM:
      return [...state, action.payload.program]
    default:
      return state
  }
}
