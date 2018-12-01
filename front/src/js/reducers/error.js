import * as type from '../actions/const'

export function error(state='', action){
  switch (action.type) {
    case type.ERROR_LOGIN:
      return "error login"
    default:
      return state
  }
}
