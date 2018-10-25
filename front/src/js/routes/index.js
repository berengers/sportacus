import { fetchPrograms, selectProgram } from '../actions/program'

export const routesMap = {
  WORKOUT: {
    path: '/',
    thunk: fetchPrograms()
  },
  LOGIN: '/login',
  PROGRAM_EDITOR: '/program_editor',
  USER: '/user/:id',
  SELECT_PROGRAM: '/program/:program_id'
}
