import 'bootstrap'
import React from "react";
import ReactDOM from "react-dom";
import { combineReducers, applyMiddleware, createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'
import createHashHistory from 'history/createHashHistory'
import thunkMiddleware from 'redux-thunk'
import { connectRoutes } from 'redux-first-router'

import Login from './components/login'
import App from './components/app'
import * as reducers from './reducers'
import { routesMap } from './routes'

const options = {
  notFoundPath: 'berenger',
  createHistory: createHashHistory
}

const { reducer, middleware, enhancer } = connectRoutes(routesMap, options)
const rootReducer = combineReducers({ ...reducers, location: reducer  })
const middlewares = applyMiddleware(middleware, thunkMiddleware)
const enhancers = compose(
  enhancer,
  middlewares,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const store = createStore(rootReducer, {}, enhancers)


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("index"));
