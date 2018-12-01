import React from 'react'
import { connect } from 'react-redux'
import uuidv4 from 'uuid/v4'

import Program from './program'
import ProgramList from './programList'
import ExerciseList from './exerciseList'
import RunProgram from './runProgram'

class Programs extends React.Component{
  constructor(props){
    super(props)

    this.scenes = {
      'PROGRAMS':   <ProgramList />,
      'PROGRAM':    <Program />,
      'CHOOSE_EXERCISE':   <ExerciseList />,
      'RUN_PROGRAM':<RunProgram />
    }
  }
  render(){
    const { location } = this.props

    return(
      <div className='row no-gutters p-3 col-md-10 col-xl-6 mx-auto'>
        {
          this.scenes[location.type]
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    programs : state.programs,
    location: state.location
  }
}

export default connect(mapStateToProps)(Programs)
