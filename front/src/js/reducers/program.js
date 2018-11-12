
const initialState = {
  id: "",
  name: "",
  visibility: ""
}

export function currentProgram(state=initialState, action){
  switch (action.type) {
    case "CURRENT_PROGRAM":
      const program = {
        id: action.payload.program.id,
        name: action.payload.program.name,
        visibility: action.payload.program.visibility
      }
      return program
    default:
      return state
  }
}

export function programs(state=[], action){
  switch (action.type) {
    case "RECEIVE_PROGRAMS":
      return action.payload.programs
    case "ADD_PROGRAM":
      return [...state, action.payload.program]
    default:
      return state
  }
}
