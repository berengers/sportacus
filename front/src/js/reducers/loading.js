import * as type from '../actions/const'

export function loading(state=false, action){
  switch (action.type) {
    case type.LOADING:
      return true
    case type.RECEIVE_PROGRAMS:
    case type.CURRENT_PROGRAM:
    case type.CURRENT_EXERCISE:
      return false
    default:
      return state
  }
}
