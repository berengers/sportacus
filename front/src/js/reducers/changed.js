import * as type from '../actions/const'

export function programChanged(state = false, action){
  switch (action.type) {
    case type.EDIT_STEP:
    case type.CHANGE_POSITION:
      return true
    case type.PROGRAM:
    case type.UPDATE_PROGRAM:
      return false
    default:
      return state
  }
}
