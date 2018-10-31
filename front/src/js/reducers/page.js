
import { NOT_FOUND } from 'redux-first-router'

const components = {
  WORKOUT:        'Workout',
  EXERCISES:      'Exercises',
  EXERCISE:       'Exercises',
  NEW_EXERCISE:   'Exercises',
  LOGIN:          'Login',
  [NOT_FOUND]:    'NotFound'
}

// export default (state = 'Home', action = {}) => components[action.type] || state

export default function(state = 'Workout', action = {}){
  switch (action.type) {
    case NOT_FOUND:
      return 'Not-Found'
    case "CHANGE_PAGE":
      return action.payload.page
    case "WORKOUT":
    case "EXERCISES":
    case "EXERCISE":
    case "NEW_EXERCISE":
      return components[action.type]
    default:
      return state
  }
}