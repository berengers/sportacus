import React from 'react'
import { connect } from 'react-redux'
import uuidv4 from 'uuid/v4'
import Link from 'redux-first-router-link'

class ProgramList extends React.Component{
  constructor(props){
    super(props)
    this.state = { name : '', visibility : 'PRIVATE', screen : 'programs_list' }
  }
  inputChange(e){
    this.setState({ [e.target.name] : e.target.value })
  }
  newProgram(){
    const { name, visibility } = this.state
    this.props.newProgram(name.trim(), visibility)
  }
  render(){
    const { programs } = this.props
    const { visibility } = this.state

    return (
      <div className='col-sm-6 mx-auto mt-5'>
        <h4>Choose Program</h4>
        <div className="list-group">
          {
            programs.map(program => (
              <Link to={`/workout/program/${program.id}/${program.name}`} key={uuidv4()} className="btn list-group-item list-group-item-action">{program.name}</Link>
            ))
          }
          <div className="btn list-group-item list-group-item-action bg-warning text-dark" data-toggle="collapse" href="#collapseExample" role="button">
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
    )
  }
}

const mapStateToProps = (state) => {
  return {
    programs : state.programs
  }
}

export default connect(mapStateToProps)(ProgramList)
