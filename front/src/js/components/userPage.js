import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router'
import uuidv4 from 'uuid/v4'

import NavBar from './navbar'
import ProgramEditor from './program_editor'
import Workout from './workout'

export default class UserPage extends React.Component{
  constructor(props){
    super(props)

  }
  render(){

    return (
      <React.Fragment>
        <NavBar />

        <Switch>
          <Route path='/program_editor' render={() => (<ProgramEditor />)} />
          <Route path='/' render={() => (<Workout />)} />
        </Switch>


      </React.Fragment>
    )
  }
}
