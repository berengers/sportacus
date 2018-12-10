import * as type from '../actions/const'

export function error(state='', action){
  switch (action.type) {
    case type.ERROR_LOGIN:
      return "error login"
    case type.ERROR_REGISTER:
      return action.payload.error
    default:
      return state
  }
}
