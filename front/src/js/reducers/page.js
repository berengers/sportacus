// import { NOT_FOUND } from 'redux-first-router'
//
// export default function page(state = "HOME", action){
//   switch (action.type) {
//     case "LOGIN":
//       return "LOGIN"
//     case NOT_FOUND:
//       return "HOME"
//     default:
//       return state
//   }
// }


// router/pageReducer.js
import { NOT_FOUND } from 'redux-first-router'

const components = {
  LOGIN:          'Login',
  WORKOUT:        'Workout',
  PROGRAM_EDITOR: 'Program_Editor',
  [NOT_FOUND]:    'NotFound'
}

export default (state = 'Home', action = {}) => components[action.type] || state
