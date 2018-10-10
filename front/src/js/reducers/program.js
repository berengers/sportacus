import { LOAD_PROGRAMS } from '../actions/program'

export function programs(state=[], action){
  switch (action.type) {
    case LOAD_PROGRAMS:
      return action.programs

    default:
      return state
  }
}
