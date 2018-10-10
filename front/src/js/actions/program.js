import 'whatwg-fetch'

import { db } from './db'
import { authorized } from './tools'

export const LOAD_PROGRAMS = 'LOAD_PROGRAMS'

export function loadPrograms(programs){
  return {
    type: LOAD_PROGRAMS,
    programs
  }
}

export function fetchPrograms() {
  return dispatch => {
    authorized(dispatch, db.fetchPrograms())
    .then((programs) => {
      console.log ("--- GOT PROGRAMS ---")
      dispatch(loadPrograms(programs))
    })
  }
}
