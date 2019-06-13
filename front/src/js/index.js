import React from "react";
import ReactDOM from "react-dom";
import { combineReducers, applyMiddleware, createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import { createHashHistory } from 'history'
import thunkMiddleware from 'redux-thunk'
import { connectRoutes } from 'redux-first-router'
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly"
import 'bootstrap'

import App from './components/app'
import * as reducers from './reducers'
import { routesMap } from './routes'

const options = {
  notFoundPath: 'berenger',
  createHistory: createHashHistory
}

const { reducer, middleware, enhancer } = connectRoutes(routesMap, options)

const appReducer = combineReducers({ ...reducers, location: reducer  })
const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = undefined
  }
  return appReducer(state, action)
}

const middlewares = composeWithDevTools(applyMiddleware(middleware, thunkMiddleware))
const enhancers = compose(
  enhancer,
  middlewares
)

export const store = createStore(rootReducer, {}, enhancers)


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("index"));
