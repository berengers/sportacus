import React from 'react'
import { connect } from 'react-redux'
import uuidv4 from 'uuid/v4'
import Link from 'redux-first-router-link'

import Step from './step'

class Program extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    const { location, program, steps } = this.props
    // console.log ("this.props ---> ", this.props)
    // console.log ("program ---> ", program)

    return (
      <div className="col-12">
        <div className='row no-gutters'>
          <Link to="/programs" className='btn btn-info mb-3 col-sm-4'> {'← back to programs'} </Link>
          <div className="col-sm-4"></div>
          <Link to={`/programs/program/${program.id}/run`} className='btn btn-success mb-3 col-sm-4'> {'Run Programs' + '  ' + '►'} </Link>
        </div>
        <h4 className='text-center text-light bg-dark p-2 text-capitalize' data-toggle='collapse' data-target='#programs'>{program.name}</h4>
        <div className='row no-gutters w-100 mt-2' id='programs'>
          {
            steps.map( step => (
              <Step key={uuidv4()} step={step}/>
            ))
          }
          <Link to={`/programs/program/${program.id}/choose_exercise`} className='btn btn-warning text-center col-12 p-3' >+</Link>
        </div>
      </div>
    )
  }
}

const mapStateToprops = state => {
  return {
    location: state.location,
    program: state.currentProgram,
    steps: state.steps
  }
}

export default connect(mapStateToprops)(Program)
