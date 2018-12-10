import React from 'react'
import { connect } from 'react-redux'
import Link from 'redux-first-router-link'

import NavBar from './navbar'
import Login from './login'
import Register from './register'
import Programs from './programs'
import Exercises from './exercises'
import '../../css/app.scss'

const pages = {
  'Login':      <Login />,
  'Register':   <Register />,
  'Programs':   <Programs />,
  'Exercises':  <Exercises />,
  'Not-Found':  <h2 className='mx-auto mt-5 p-3 bg-warning text-center'>Sorry, this page dont exist</h2>
};

const App = ({ page }) => {
  return (
    <React.Fragment>
      {page !== 'Login' && page !== 'Register' &&
        <NavBar />
      }
      {
        pages[page]
      }
    </React.Fragment>
    )
}
  

const mapStateToProps = ({ page }) => ({ page })

export default connect(mapStateToProps)(App)
