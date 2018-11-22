import { RECEIVE_STEPS } from '../actions/step'

const initialStep = {
  id: 0,
  repetitions: 8,
  series: 3,
  weight: 0,
  rest: 45,
  rest_end: 90,
  exercise: {
    image: ""
  }
}

export function currentStep(state=initialStep, action){
  switch (action.type) {
    case "CURRENT_STEP":
      return action.payload.step
    case "INITIAL_CURRENT_STEP":
      return initialStep
    default:
      return state
  }
}

export function editStep(state=-1, action){
  switch (action.type) {
    case "ID_STEP":
      return action.payload.id
    default:
      return state
  }
}

export function steps(state=[], action){
  switch (action.type) {
    case "CURRENT_PROGRAM":
      return action.payload.program.steps
    case "CHANGE_POSITION":
      return action.payload.steps.map((step, index) => {
        step.position = index+1
        return step
      })
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
