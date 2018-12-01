import * as type from '../actions/const'

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
    case type.CURRENT_STEP:
      return action.payload.step
    case type.INITIAL_CURRENT_STEP:
      return initialStep
    default:
      return state
  }
}

export function editStep(state=-1, action){
  switch (action.type) {
    case type.ID_STEP:
      return action.payload.id
    case type.PROGRAMS:
    case type.PROGRAM:
    case type.EXERCISES:
      return -1
    default:
      return state
  }
}

export function steps(state=[], action){
  switch (action.type) {
    case type.CURRENT_PROGRAM:
      return action.payload.program.steps
    case type.CHANGE_POSITION:
      return action.payload.steps.map((step, index) => {
        step.position = index+1
        return step
      })
    case type.ADD_STEP:
      return [...state, action.payload.step]
    case type.DELETE_STEP:
      return state.filter(step => step.id != action.payload.id)
        .map((step, index) => {
          step.position = index+1
          return step
        })
    case type.EDIT_STEP:
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
