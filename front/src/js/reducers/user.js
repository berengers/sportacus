import * as type from '../actions/const'

export function user(state={email:"", username:""}, action){
  switch (action.type) {
    case type.LOGIN:
      if (action.payload.user) {
        return action.payload.user
      } else {
        return state
      }
    default:
      return state
  }
}
