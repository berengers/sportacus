import React from 'react'
import { Link } from 'react-router-dom'

import '../../css/navbar.scss'

export default class NavBar extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <nav className='navbar navbar-expand-sm navbar-dark bg-dark' id='navbar'>
        <a className='navbar-brand' href='#'>SportProgram</a>
        <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navBarSupportedContent'>
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navBarSupportedContent'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item active'>
              <Link className='nav-link' to='/'>Home</Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/programs'>Programss</Link>
            </li>
          </ul>
          <Link className='btn btn-info mr-3' to='/login'>Logout</Link>
        </div>
      </nav>
    )
  }
}
