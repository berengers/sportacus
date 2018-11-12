import { redirect, NOT_FOUND } from 'redux-first-router'

import { authorized } from '../actions/tools'
import { db } from '../actions/db'
import { fetchPrograms } from '../actions/program'
import { fetchSteps, fetchStep } from '../actions/step'
import { fetchExercises, fetchExercise } from '../actions/exercise'
import { selectProgram } from '../actions/program'
import { logout } from '../actions/login'

export const routesMap = {
  HOME: {
    path: '/',
    thunk: async (dispatch) => {
      dispatch(redirect({ type: "PROGRAMS" }))
    }
  },
  PROGRAMS: {
    path: '/programs',
    thunk: fetchPrograms()
  },
  PROGRAM: {
    path: '/programs/program/:program_id',
    thunk: async (dispatch, getState) => {
      const { location: { payload: { program_id } }, programs } = getState()
      dispatch({ type: "CHANGE_PAGE", payload: { page: 'Programs' } })
      dispatch({ type: "INITIAL_CURRENT_STEP" })
      dispatch({ type: "CHARGING_STEPS" })
      dispatch(fetchSteps(program_id))
    }
  },
  RUN_PROGRAM: {
    path: '/programs/program/:program_id/run',
    thunk: async (dispatch, getState) => {
      const { location: { payload: { program_id } }, programs } = getState()
      dispatch(fetchSteps(program_id))
    }
  },
  FORM_STEP: {
    path: '/programs/program/:program_id/step/:step_id',
    thunk: async (dispatch, getState) => {
      const { location: { payload: {step_id} } } = getState()
      dispatch(fetchStep(step_id))
    }
  },
  CHOOSE_EXERCISE: {
    path: '/programs/program/:program_id/choose_exercise',
    thunk: fetchExercises()
  },
  NEW_STEP: {
    path: '/programs/program/:program_id/exercise/:exercise_id',
    thunk: async (dispatch, getState) => {
      const { location: { payload: {exercise_id} } } = getState()
      dispatch(fetchExercise(exercise_id))
    }
  },
  EXERCISES: {
    path: '/exercises',
    thunk: async (dispatch) => {
      dispatch({ type: "INITIAL_CURRENT_EXERCISE" })
      dispatch(fetchExercises())
    }
  },
  EXERCISE: {
    path: '/exercises/exercise/:id',
    thunk: async (dispatch, getState) => {
      const { location: { payload: { id } }, exercises } = getState()
      const exercise = (exercises.filter(exercise => exercise.id == id))[0]
      if (exercises.length > 0) {
        dispatch({ type: "CURRENT_EXERCISE", payload: { exercise } })
      } else {
        dispatch(fetchExercise(id))
      }
    }
  },
  NEW_EXERCISE: '/exercises/new_exercise',
  PROGRAM_EDITOR: '/program_editor',
  USER: '/user/:id',
  SELECT_PROGRAM: '/program/:program_id',
  LOGIN: {
    path: '/login',
    thunk: async (dispatch) => {
      dispatch({ type: "CHANGE_PAGE", payload: { page: 'Login' } })
    }
  },
  LOGOUT: {
    path: '/logout',
    thunk: async (dispatch) => {
      dispatch(logout())
      dispatch(redirect({ type: "LOGIN" }))
    }
  }
}
