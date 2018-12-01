import * as type from '../actions/const'

export function charging(state=false, action){
  switch (action.type) {
    case type.CHARGING_STEPS:
    case type.CHARGING_PROGRAM:
      return true
    case type.CHARGED:
    case type.CURRENT_PROGRAM:
      return false
    default:
      return state
  }
}
