import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import '../../css/navbar.scss'

class NavBar extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    const { pathname } = this.props

    return (
      <nav className='navbar navbar-expand-sm navbar-dark bg-dark' id='navbar'>
        <a className='navbar-brand' href='#'>SportPrograms</a>
        <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navBarSupportedContent'>
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navBarSupportedContent'>
          <ul className='navbar-nav mr-auto'>
            <li className={'nav-item' + ' ' + (pathname=='/workout'|| pathname=='/'?'active':'')}>
              <Link className='nav-link' to='/workout'>Workout</Link>
            </li>
            <li className={'nav-item' + ' ' + (pathname=='/program_editor'?'active':'')}>
              <Link className='nav-link' to='/program_editor'>Program Editor</Link>
            </li>
          </ul>
          <Link className='btn btn-info mr-3' to='/logout'>Logout</Link>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    pathname : state.router.location.pathname
  }
}

export default connect(mapStateToProps)(NavBar)
