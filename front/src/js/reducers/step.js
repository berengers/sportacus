import { RECEIVE_STEPS } from '../actions/step'

const initialState = {
  id: 0,
  repetitions: 0,
  series: 0,
  weight: 0,
  rest_duration_between_series: 0,
  rest_end_duration: 0,
  exercise: {
    image: ""
  }
}

export function currentStep(state=initialState, action){
  switch (action.type) {
    case "CURRENT_STEP":
      return action.payload.step
    case "INITIAL_CURRENT_STEP":
      return initialState
    default:
      return state
  }
}

export function steps(state=[], action){
  switch (action.type) {
    case "CURRENT_PROGRAM":
      return action.payload.program.steps
    case "ADD_STEP":
      return [...state, action.payload.step]
    case "DELETE_STEP":
      return state.filter(step => step.id != action.payload.id)
    case "EDIT_STEP":
      return state.map(step => {
        if (step.id == action.payload.step.id) {
          step = action.payload.step
        }
        return step
      })
    default:
      return state
  }
}
