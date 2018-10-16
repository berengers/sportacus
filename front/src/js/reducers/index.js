import { combineReducers } from 'redux'

import { selectedProgram, programs } from './program'
import { program_steps } from './program_step'
import { exercices } from './exercice'

export default combineReducers({
  selectedProgram,
  programs,
  program_steps,
  exercices
})
