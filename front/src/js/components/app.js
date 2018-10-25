import React from 'react'
import { connect } from 'react-redux'
import Link from 'redux-first-router-link'

import NavBar from './navbar'
import UserPage from './userPage'
import Login from './login'
import Workout from './workout'
import Home from './home'

class App extends React.Component{
  constructor(props){
    super(props)

    this.pages = {
      HOME:     <Home />,
      LOGIN:    <Login />,
      WORKOUT:  <Workout />
    }
  }
  render(){
    let { location, page } = this.props

    return (
      <React.Fragment>
        {location.pathname != "/login" &&
          <NavBar />
        }
        {
          this.pages[location.type]
        }
      </React.Fragment>
    )
  }
}

const mapStateToprops = state => {
  return {
    location: state.location,
    page: state.page
  }
}

export default connect(mapStateToprops)(App)
