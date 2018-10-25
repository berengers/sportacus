import React from 'react'
import { connect } from 'react-redux'
import uuidv4 from 'uuid/v4'

import '../../css/app.scss'
import { fetchPrograms } from '../actions/program'
import { fetchProgramSteps } from '../actions/programStep'
import ProgramStep from './program_step'

class Workout extends React.Component{
  constructor(props){
    super(props)

    this.state = { sidebar : 'programs' }
  }
  handleClick(program_id, e){
    this.props.loadProgramSteps(program_id)
    this.setState({ sidebar : 'workout' })
  }
  gotoProgramsBar(){
    this.setState({sidebar:'programs'})
  }
  render(){
    // console.log ("this.props ---> ", this.props)
    const { programs, program_steps } = this.props
    const { sidebar } = this.state
    console.log ("program_steps ---> ", program_steps)

    return(
      <div className='row no-gutters' id="workout">
        <div className='col-sm-3 d-none d-sm-block bg-light p-3 pt-4 border-right'>

          <div>
            <div className={'program-bar ' + (sidebar=='programs'?'':'d-none')}>
              <h4 className='text-center text-light bg-dark p-2' data-toggle='collapse' data-target='#programs'>Programs</h4>
              <div className='btn-group-vertical w-100 mt-3' id='programs'>
                {
                  programs.map( program => (
                    <a key={uuidv4()} className='btn btn-light border-op text-truncate' onClick={this.handleClick.bind(this, program.id)}>
                      {program.name}
                    </a>
                  ))
                }
              </div>
            </div>

            <div className={'workout-bar ' + (sidebar=='workout'?'':'d-none')}>
              <div className='btn btn-info mb-3' onClick={this.gotoProgramsBar.bind(this)}> {'←'} </div>
              <h4 className='text-center text-light bg-dark p-2' data-toggle='collapse' data-target='#programs'>Workout</h4>
              <div className='btn-group-vertical w-100 mt-2' id='programs'>
                {
                  program_steps.map( program_step => (
                    <p key={uuidv4()}>{program_step.name}</p>
                  ))
                }
              </div>
            </div>
          </div>

        </div>

        <div className='col-sm-9 mr-auto text-center'>
          {
            program_steps.length == 0 &&
              <div className='w-100 h-100 bg-black pt-5 bg-secondary'>
              <h2 className='alert alert-secondary w-75 mx-auto'>Choose a program</h2>
              </div>
          }
          {
            program_steps.map( program_step => (
              <ProgramStep key={uuidv4()} program_step={program_step}/>
            ))
          }

        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    programs : state.programs,
    program_steps : state.program_steps
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadProgramSteps : (program_id) => {dispatch(fetchProgramSteps(program_id))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Workout)
