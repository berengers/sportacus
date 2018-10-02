import React from 'react'

import NavBar from './navbar'
import Login from './login'
import UserPage from './userPage'

export default class App extends React.Component{
  render(){
    return (
      <React.Fragment>
        <NavBar />
        <UserPage />
      </React.Fragment>
    )
  }
}
