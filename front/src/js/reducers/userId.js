import * as type from '../actions/const'
import { NOT_FOUND } from 'redux-first-router'

export default function userIdReducer(state = null, action = {}){
  switch (action.type) {
    case type.LOGIN:
      return 5
    case type.PROGRAM_EDITOR:
    case NOT_FOUND:
      return null
    case type.USER:
      return action.payload.id
    default:
      return state
  }
}
