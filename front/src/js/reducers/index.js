import { combineReducers } from 'redux'

function firstReducer(state='ddd', action) {
  switch (action.type) {

    default:
      return state
  }
}


export default combineReducers({
  firstReducer
})
