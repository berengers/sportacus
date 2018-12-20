import { redirect, NOT_FOUND } from 'redux-first-router'

import * as type from '../actions/const'
import { authorized } from '../actions/tools'
import { db } from '../actions/db'
import { fetchPrograms } from '../actions/program'
import { fetchStep } from '../actions/step'
import { fetchExercises, fetchExercise } from '../actions/exercise'
import { selectProgram, fetchProgram } from '../actions/program'
import { logout } from '../actions/login'

export const routesMap = {
  HOME: {
    path: '/',
    thunk: (dispatch) => {
      const token = localStorage.getItem("token")
      if (token) {
        dispatch(redirect({ type: type.PROGRAMS }))
      } else {
        dispatch(redirect({ type: type.LOGIN }))
      }
    }
  },
  PROGRAMS: {
    path: '/programs',
    thunk: (dispatch) => {
      dispatch({ type: type.LOADING })
      dispatch(fetchPrograms())
    }
  },
  PROGRAM: {
    path: '/programs/program/:program_id',
    thunk: (dispatch, getState) => {
      const { location: { payload: { program_id } }, programs, currentProgram } = getState()
      dispatch({ type: type.CHANGE_PAGE, payload: { page: 'Programs' } })
      dispatch({ type: type.INITIAL_CURRENT_STEP })

      if (currentProgram.id !== parseInt(program_id)) {
        dispatch({ type: type.LOADING })
        dispatch(fetchProgram(program_id))
      }
    },
    confirmLeave: (state, action) => {
      if (state.programChanged) {
        return 'Your changes are not saved, are you sure ?'
      }
    }
  },
  RUN_PROGRAM: {
    path: '/programs/program/:program_id/run',
    thunk: (dispatch, getState) => {
      const { location: { payload: { program_id } }, programs } = getState()
      dispatch(fetchProgram(program_id))
    }
  },
  FORM_STEP: {
    path: '/programs/program/:program_id/step/:step_id',
    thunk: (dispatch, getState) => {
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
    thunk: (dispatch, getState) => {
      const { location: { payload: {exercise_id} } } = getState()
      dispatch(fetchExercise(exercise_id))
    }
  },
  EXERCISES: {
    path: '/exercises',
    thunk: (dispatch) => {
      dispatch({ type: type.INITIAL_CURRENT_EXERCISE })
      dispatch(fetchExercises())
    }
  },
  EXERCISE: {
    path: '/exercises/exercise/:id',
    thunk: (dispatch, getState) => {
      const { location: { payload: { id } }, exercises } = getState()
      const exercise = (exercises.filter(exercise => exercise.id == id))[0]
      if (exercises.length > 0) {
        dispatch({ type: type.CURRENT_EXERCISE, payload: { exercise } })
      } else {
        dispatch({ type: type.LOADING })
        dispatch(fetchExercise(id))
      }
    }
  },
  NEW_EXERCISE: '/exercises/new_exercise',
  PROGRAM_EDITOR: '/program_editor',
  USER: '/user/:id',
  LOGIN: {
    path: '/login',
    thunk: (dispatch) => {
      dispatch({ type: type.CHANGE_PAGE, payload: { page: 'Login' } })
    }
  },
  REGISTER: '/register',
  LOGOUT: {
    path: '/logout',
    thunk: (dispatch) => {
      dispatch(logout())
      dispatch(redirect({ type: type.LOGIN }))
    }
  }
}
