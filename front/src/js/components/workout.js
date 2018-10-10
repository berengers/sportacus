import React from 'react'
import { connect } from 'react-redux'
import uuidv4 from 'uuid/v4'

import '../../css/app.scss'
import { fetchPrograms } from '../actions/program'

class Workout extends React.Component{
  constructor(props){
    super(props)

    this.props.loadPrograms()
  }
  render(){
    const { programs } = this.props

    return(
      <div className='row no-gutters' id="workout">
        <div className='col-sm-3 bg-light p-3 pt-4 border-right'>
          <h4 className='text-center text-light bg-dark p-2' data-toggle='collapse' data-target='#programs'>Programs</h4>
          <div className='btn-group-vertical w-100 mt-3' id='programs'>

            {
              programs.map(program => (
                <div key={uuidv4()} className='btn btn-light border-op text-truncate'>
                  {program.name}
                </div>
              ))
            }

          </div>
        </div>

        <div className='col-sm-9 mr-auto text-center'>
          <h2>WORKOUT</h2>
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

const mapDispatchToProps = (dispatch) => {
  return {
    loadPrograms : () => {dispatch(fetchPrograms())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Workout)
