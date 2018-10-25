import React from "react";
import ReactDOM from "react-dom";
import { combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'
// import createHistory from 'history/createBrowserHistory'
import createHashHistory from 'history/createHashHistory'
import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import 'bootstrap'
import { connectRoutes } from 'redux-first-router'

import UserPage from './components/userPage'
import Login from './components/login'
import App from './components/app'
import * as reducers from './reducers'
import { routesMap } from './routes'

const { reducer, middleware, enhancer } = connectRoutes(routesMap, { createHistory: createHashHistory })
const rootReducer = combineReducers({ ...reducers, location: reducer  })
const middlewares = applyMiddleware(middleware)

const store = createStore(rootReducer, compose(
  enhancer,
  middlewares,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("index"));
