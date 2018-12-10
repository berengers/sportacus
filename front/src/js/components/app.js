import React from 'react'
import { connect } from 'react-redux'
import Link from 'redux-first-router-link'

import NavBar from './navbar'
import Login from './login'
import Register from './register'
import Programs from './programs'
import Exercises from './exercises'
import '../../css/app.scss'

class App extends React.Component{
  constructor(props){
    super(props)

    this.pages = {
      'Login':      <Login />,
      'Register':   <Register />,
      'Programs':   <Programs />,
      'Exercises':  <Exercises />,
      'Not-Found':  <h2 className='mx-auto mt-5 p-3 bg-warning text-center'>Sorry, this page dont exist</h2>
    }
  }
  render(){
    const { page } = this.props

    return (
      <React.Fragment>
        {page !== 'Login' && page !== 'Register' &&
          <NavBar />
        }
        {
          this.pages[page]
        }
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    page: state.page
  }
}

export default connect(mapStateToProps)(App)
