import { NOT_FOUND } from 'redux-first-router'

import * as type from '../actions/const'

const components = {
  PROGRAMS:       'Programs',
  EXERCISES:      'Exercises',
  EXERCISE:       'Exercises',
  NEW_EXERCISE:   'Exercises',
  LOGIN:          'Login',
  [NOT_FOUND]:    'NotFound'
}

// export default (state = 'Home', action = {}) => components[action.type] || state

export default function(state = 'Programs', action = {}){
  switch (action.type) {
    case NOT_FOUND:
      return 'Not-Found'
    case type.CHANGE_PAGE:
      return action.payload.page
    case type.PROGRAMS:
    case type.EXERCISES:
    case type.EXERCISE:
    case type.NEW_EXERCISE:
      return components[action.type]
    default:
      return state
  }
}
