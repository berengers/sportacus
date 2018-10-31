import { redirect, NOT_FOUND } from 'redux-first-router'

import { fetchPrograms } from '../actions/program'
import { fetchProgramSteps } from '../actions/programStep'
import { fetchExercises, fetchExercise } from '../actions/exercise'
import { authorized } from '../actions/tools'
import { db } from '../actions/db'
import { selectProgram } from '../actions/program'

export const routesMap = {
  HOME: {
    path: '/',
    thunk: async (dispatch) => {
      dispatch(redirect({ type: "WORKOUT" }))
    }
  },
  WORKOUT: {
    path: '/workout',
    thunk: fetchPrograms()
  },
  PROGRAM: {
    path: '/workout/program/:program_id/:program_name',
    thunk: async (dispatch, getState) => {
      const { location: { payload: { program_id } } } = getState()
      dispatch({ type: "CHANGE_PAGE", payload: { page: 'Workout' } })
      // dispatch({ type: "SELECT_PROGRAM", payload: { program_id } })
      authorized(dispatch, db.fetchProgramSteps(program_id))
      .then((program_steps) => {
        console.log ("--- GOT PROGRAM_STEPS ---")
        dispatch({ type: "RECEIVE_PROGRAM_STEPS", payload: { program_steps } })
      })
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
      localStorage.removeItem("token")
      dispatch(redirect({ type: "LOGIN" }))
    }
  }
}
