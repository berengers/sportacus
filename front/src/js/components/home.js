import React from 'react'
import Link from 'redux-first-router-link'

const container = "d-block mt-3 row"

const navLink = "btn btn-info col mb-3"

export default class Home extends React.Component{
  render(){
    return (
      <div className={container}>
      <Link to='/login' className={navLink}>Login '/login'</Link>
      <Link to={{ type: "LOGIN"}} className={navLink}>Login type</Link>
      <Link to={{ type: "SELECT_PROGRAM", payload: { program_id: 5 } }} className={navLink}>SELECT_PROGRAM</Link>
      <Link to='/workout' className={navLink}>fetch Workout</Link>
      </div>
    )
  }
}
