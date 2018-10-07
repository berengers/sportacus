import React from "react";
import ReactDOM from "react-dom";
import rootReducer from './reducers'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'
import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router'
import 'bootstrap'
// console.log ("bootstrap ---> ", bootstrap)

import UserPage from './components/userPage'
import Login from './components/login'

const history = createBrowserHistory()

const store = createStore(
  connectRouter(history)(rootReducer),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  compose(
    applyMiddleware(
      routerMiddleware(history)
    ),
  ),
)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Switch>
          <Route path='/login' render={() => (<Login />)} />
          <Route path='/' render={() => (<UserPage />)} />
        </Switch>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("index"));