import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import uuidv4 from 'uuid/v4'
import Link from 'redux-first-router-link'

import { fetchCreateProgram } from '../actions/program'
import loadingGif from '../../../../back/medias/icons/loading.gif'

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
    const { programs, loading } = this.props

    return (
      <div className='col-sm-8 mx-auto mt-5'>
      {loading?
          <div>
            <img className="d-block mx-auto mt-5" width="100px" src={loadingGif} />
          </div>

          :
         
         <React.Fragment>
          {programs.filter(p => p.visibility === 'PRIVATE').length > 0 &&
            <React.Fragment>
              <h4 className="text-light">PRIVATE</h4>
              <div className="list-group mb-3">
                {
                  programs.filter(p => p.visibility === "PRIVATE").map(program => (
                    <Link to={`/programs/program/${program.id}`} key={program.id}
                    className="btn btn-dark-grey py-2 font-weight-bold text-left pl-4 text-truncate rounded-0 mb-1"
                    style={{fontSize: "1.5rem"}}
                    >
                      {program.name}
                    </Link>
                  ))
                }
              </div>
            </React.Fragment>
          }
          <h4 className="text-light">PUBLIC</h4>
          <div className="list-group mb-3">
          {
            programs.filter(p => p.visibility === "PUBLIC").map( program => (
              <Link to={`/programs/program/${program.id}`} key={program.id}
              className="btn btn-dark-grey py-2 font-weight-bold text-left pl-4 text-truncate rounded-0 mb-1"
              style={{fontSize: "1.5rem"}}
              >
                {program.name}
              </Link>
            ))
          }
          </div>

          <button className="btn list-group-item list-group-item-action bg-primary text-dark rounded-0" type="button" data-toggle="collapse" data-target="#formNewProgram" aria-expanded="true" aria-controls="formNewProgram">
            NEW Program
          </button>
          <div className="collapse" id="formNewProgram">
            <div className='card card-body text-left bg-dark-grey text-light rounded-0'>
              <div className='form-group'>
                <label>Name</label>
                <input name='name' value={this.state.name} onChange={this.inputChange.bind(this)} className='form-control' placeholder="name"/>
              </div>
              <button className='btn btn-info' onClick={this.createProgram.bind(this)}>ADD</button>
            </div>
          </div>
          </React.Fragment>
        }
      </div>
    )
  }
}

ProgramList.propTypes = {
  programs: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
}

const mapStateToProps = ({ programs, loading }) => ({ programs, loading })

const mapDispatchToProps = dispatch => {
  return {
    createProgram: (name, visibility) => { dispatch(fetchCreateProgram(name, visibility)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgramList)
