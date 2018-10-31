import React from 'react'
import { connect } from 'react-redux'
import Link from 'redux-first-router-link'

import NavBar from './navbar'
import Login from './login'
import Workout from './workout'
import Exercises from './exercises'

class App extends React.Component{
  constructor(props){
    super(props)

    this.pages = {
      'Login':      <Login />,
      'Workout':    <Workout />,
      'Exercises':  <Exercises />,
      'Not-Found':  <h2 className='mx-auto mt-5 p-3 bg-warning text-center'>Sorry, this page dont exist</h2>
    }
  }
  render(){
    const { location, page } = this.props

    return (
      <React.Fragment>
        {location.pathname != "/login" &&
          <NavBar />
        }
        {
          this.pages[page]
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
