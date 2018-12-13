import React from 'react'
import Link, { NavLink } from 'redux-first-router-link'

const NavBar = () => {
 
  return (
    <nav className='navbar navbar-expand-sm navbar-light bg-primary'>
      <a className='navbar-brand text-dark font-weight-bold' href='#'>SportPrograms</a>
      <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navBarSupportedContent'>
        <span className='navbar-toggler-icon'></span>
      </button>

      <div className='collapse navbar-collapse' id='navBarSupportedContent'>
        <ul className='navbar-nav mr-auto'>
          <li className='nav-item'>
            <NavLink activeClassName='active' className='nav-link' to='/programs'>PROGRAMS</NavLink>
          </li>
          <li className='nav-item'>
            <NavLink activeClassName='active' className='nav-link' to='/exercises'>EXERCISES</NavLink>
          </li>
        </ul>
        <Link to='/logout' className='btn btn-outline-dark mr-3'>Logout</Link>
      </div>
    </nav>
  )
}

export default NavBar
