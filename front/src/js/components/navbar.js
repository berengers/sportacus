import React from 'react'
import Link, { NavLink } from 'redux-first-router-link'
import { connect } from 'react-redux'

import { logout } from '../actions/login'

export default class NavBar extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    const { pathname } = this.props

    return (
      <nav className='navbar navbar-expand-sm navbar-dark bg-dark'>
        <a className='navbar-brand text-info' href='#'>SportPrograms</a>
        <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navBarSupportedContent'>
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navBarSupportedContent'>
          <ul className='navbar-nav mr-auto'>
            <li className={'nav-item' + ' ' + (pathname=='/'|| pathname=='/'?'active':'')}>
              <NavLink activeClassName='active' className='nav-link' to='/programs'>PROGRAMS</NavLink>
            </li>
            <li className={'nav-item' + ' ' + (pathname=='/program_editor'?'active':'')}>
              <NavLink activeClassName='active' className='nav-link' to='/exercises'>EXERCISES</NavLink>
            </li>
          </ul>
          <Link to='/logout' className='btn btn-info mr-3'>Logout</Link>
        </div>
      </nav>
    )
  }
}
