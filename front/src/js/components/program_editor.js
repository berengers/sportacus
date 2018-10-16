import React from 'react'
import { connect } from 'react-redux'
import uuidv4 from 'uuid/v4'

import '../../css/app.scss'
import { fetchExercices } from '../actions/exercice'
import { fetchPrograms, fetchCreateProgram } from '../actions/program'
import { fetchProgramSteps } from '../actions/programStep'
import ProgramStep from './program_step'
import { Modal_NewExercice } from './modal'
import Exercice from './exercice'

class ProgramEditor extends React.Component{
  constructor(props){
    super(props)

    this.state = { name : '', visibility : 'PRIVATE', screen : 'programs_list' }
    this.props.loadPrograms()
  }
  loadProgramSteps(program_id, e){
    this.props.loadProgramSteps(program_id)
    this.setState({ screen : 'programs' })
  }
  inputChange(e){
    this.setState({ [e.target.name] : e.target.value })
  }
  newProgram(){
    const { name, visibility } = this.state
    this.props.newProgram(name.trim(), visibility)
  }
  newExercice(){
    console.log ("3 ---> ", 3)
  }
  changeScreen(display, e){
    this.setState({ screen: display })
  }
  render(){
    const { exercices, programs, program_steps } = this.props
    const { visibility, screen } = this.state
    // console.log ("exercices ---> ", exercices)
    // console.log ("programs ---> ", programs)
    // console.log ("program_steps ---> ", program_steps)

    return(
      <React.Fragment>
      <Modal_NewExercice />

      <div className='row no-gutters' id="program_editor">

          {screen == 'programs_list' &&
            <div className='w-50 mx-auto mt-5'>
              <h4>Choose Program</h4>
              <div className="list-group">
                {
                  programs.map(program => (
                    <div key={uuidv4()} onClick={this.loadProgramSteps.bind(this, program.id)} className="btn list-group-item list-group-item-action">{program.name}</div>
                  ))
                }
                <div className="btn list-group-item list-group-item-action bg-success text-light" data-toggle="collapse" href="#collapseExample" role="button">
                  NEW Program
                </div>
                <div className="collapse" id="collapseExample">
                  <div className='card card-body text-left'>
                    <div className='form-group'>
                      <label>Name</label>
                      <input name='name' value={this.state.name} onChange={this.inputChange.bind(this)} className='form-control' placeholder="name"/>
                    </div>
                    <div className='form-group'>
                      <label>Visibility</label>
                      <select value={visibility} name='visibility' className="form-control" onChange={this.inputChange.bind(this)}>
                        <option value='PRIVATE'>PRIVATE</option>
                        <option value='PUBLIC'>PUBLIC</option>
                      </select>
                    </div>
                    <div className='btn btn-info' onClick={this.newProgram.bind(this)}>ADD</div>
                  </div>
                </div>
              </div>
            </div>
          }

          {screen == 'programs' &&
            <div>
              <div className='btn btn-info mr-auto my-3 ml-3' onClick={this.changeScreen.bind(this, 'programs_list')}>back to programs</div>
              {
                program_steps.map(program_step => (
                  <ProgramStep key={uuidv4()} program_step={program_step} />
                ))
              }
              <div className='add-button btn btn-success py-3 px-4' onClick={this.changeScreen.bind(this, 'exercices')}> + </div>
            </div>
          }

          {screen == 'exercices' &&
            <Exercice exercices={exercices}/>
          }

      </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    exercices: state.exercices,
    programs: state.programs,
    program_steps : state.program_steps
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadExercices: () => {dispatch(fetchExercices())},
    loadPrograms: () => {dispatch(fetchPrograms())},
    loadProgramSteps: (program_id) => {dispatch(fetchProgramSteps(program_id))},
    newProgram: (name, visibility) => {dispatch(fetchCreateProgram(name, visibility))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgramEditor)
