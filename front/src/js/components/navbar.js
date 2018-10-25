import React from 'react'
import Link from 'redux-first-router-link'
import { connect } from 'react-redux'

import '../../css/navbar.scss'
import { logout } from '../actions/login'

export default class NavBar extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    const { pathname } = this.props

    return (
      <nav className='navbar navbar-expand-sm navbar-dark bg-dark' id='navbar'>
        <a className='navbar-brand text-info' href='#'>SportPrograms</a>
        <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navBarSupportedContent'>
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navBarSupportedContent'>
          <ul className='navbar-nav mr-auto'>
            <li className={'nav-item' + ' ' + (pathname=='/workout'|| pathname=='/'?'active':'')}>
              <Link className='nav-link' to='/workout'>Workout</Link>
            </li>
            <li className={'nav-item' + ' ' + (pathname=='/program_editor'?'active':'')}>
              <Link className='nav-link' to='/workout'>Program Editor</Link>
            </li>
          </ul>
          <Link to='/login' className='btn btn-info mr-3'>Logout</Link>
        </div>
      </nav>
    )
  }
}

// const mapStateToProps = (state) => {
//   return {
//     pathname : state.location.pathname
//   }
// }
//
// const mapDispatchToProps = dispatch => {
//   return  {
//     logout : () => {dispatch(logout())}
//   }
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
