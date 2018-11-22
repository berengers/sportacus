import React from 'react'
import { connect } from 'react-redux'
import uuidv4 from 'uuid/v4'
import Link from 'redux-first-router-link'

import { fetchCreateProgram } from '../actions/program'

class ProgramList extends React.Component{
  constructor(props){
    super(props)
    this.state = { name : '', visibility : 'PRIVATE', screen : 'programs_list' }
  }
  inputChange(e){
    this.setState({ [e.target.name] : e.target.value })
  }
  createProgram(){
    const { name, visibility } = this.state
    this.props.createProgram(name.trim(), visibility)
  }
  render(){
    const { programs } = this.props
    const { visibility } = this.state

    return (
      <div className='col-sm-8 mx-auto mt-5'>
        {programs.filter(p => p.visibility === 'PRIVATE').length > 0 &&
          <React.Fragment>
          <h4>PRIVATE</h4>
          <div className="list-group mb-3">
            {
              programs.filter(p => p.visibility === "PRIVATE").map(program => (
                <Link to={`/programs/program/${program.id}`} key={uuidv4()} className="btn list-group-item list-group-item-action">{program.name}</Link>
              ))
            }
          </div>
          </React.Fragment>
        }
        <h4>PUBLIC</h4>
        <div className="list-group mb-3">
        {
          programs.filter(p => p.visibility === "PUBLIC").map( program => (
            <Link to={`/programs/program/${program.id}`} key={uuidv4()} className="btn list-group-item list-group-item-action">{program.name}</Link>
          ))
        }
        </div>

        <button className="btn list-group-item list-group-item-action bg-success text-light" type="button" data-toggle="collapse" data-target="#formNewProgram" aria-expanded="true" aria-controls="formNewProgram">
          NEW Program
        </button>
        <div className="collapse" id="formNewProgram">
          <div className='card card-body text-left'>
            <div className='form-group'>
              <label>Name</label>
              <input name='name' value={this.state.name} onChange={this.inputChange.bind(this)} className='form-control' placeholder="name"/>
            </div>
            <button className='btn btn-info' onClick={this.createProgram.bind(this)}>ADD</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    programs : state.programs
  }
}
const mapDispatchToProps = dispatch => {
  return {
    createProgram: (name, visibility) => { dispatch(fetchCreateProgram(name, visibility)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgramList)
