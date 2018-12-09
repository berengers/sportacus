import * as type from '../actions/const'

export function programChanged(state = false, action){
  switch (action.type) {
    case type.EDIT_STEP:
    case type.CHANGE_POSITION:
    case type.DELETE_STEP:
      return true
    case type.PROGRAMS:
    case type.UPDATE_PROGRAM:
      return false
    default:
      return state
  }
}
