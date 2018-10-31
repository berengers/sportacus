import React from 'react'
import { connect } from 'react-redux'
import uuidv4 from 'uuid/v4'
import Link from 'redux-first-router-link'

import ProgramStep from './programStep'

class Program extends React.Component{
  constructor(props){
    super(props)
  }
  inputChange(){
    console.log ("inputChange")
  }
  newProgramStep(){
    console.log("newProgramStep")
  }
  render(){
    const { location, program_steps } = this.props

    return (
      <div className="col-sm-10 col-md-8 mx-auto">
        <div className='row no-gutters'>
          <Link to="/workout" className='btn btn-info mb-3 col-sm-4'> {'← back to programs'} </Link>
          <div className="col-sm-4"></div>
          <Link to="/workout" className='btn btn-success mb-3 col-sm-4'> {'Run Workout' + '  ' + '►'} </Link>
        </div>
        <h4 className='text-center text-light bg-dark p-2' data-toggle='collapse' data-target='#programs'>{location.payload.program_name}</h4>
        <div className='row no-gutters w-100 mt-2' id='programs'>
          {
            program_steps.map( program_step => (
              <ProgramStep key={uuidv4()} program_step={program_step}/>
            ))
          }
          <div className='btn btn-warning text-center col-12 p-3' data-toggle="collapse" href="#collapseForm" role="button">
            +
          </div>
          <div className="collapse" id="collapseForm">
            <div className='card card-body text-left'>
              <div className='form-group'>
                <label>Name</label>
                <input name='name' onChange={this.inputChange.bind(this)} className='form-control' placeholder="name"/>
              </div>
              <div className='form-group'>
                <label>Visibility</label>
                <select  name='visibility' className="form-control" onChange={this.inputChange.bind(this)}>
                  <option value='PRIVATE'>PRIVATE</option>
                  <option value='PUBLIC'>PUBLIC</option>
                </select>
              </div>
              <div className='btn btn-info' onClick={this.newProgramStep.bind(this)}>ADD</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToprops = state => {
  return {
    location: state.location,
    program_steps: state.program_steps
  }
}

export default connect(mapStateToprops)(Program)
