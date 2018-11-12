import { NOT_FOUND } from 'redux-first-router'

export default function userIdReducer(state = null, action = {}){
  switch (action.type) {
    case 'LOGIN':
      console.log ("2222 ---> ", 2222)
      return 5
    case 'PROGRAM_EDITOR':
      console.log ("4444444 ---> ", 4444444)
    case NOT_FOUND:
      return null
    case 'USER':
      console.log ("45454 ---> ", 45454)
      return action.payload.id
    default:
      return state
  }
}
