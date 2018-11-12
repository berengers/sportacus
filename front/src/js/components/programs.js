import React from 'react'
import { connect } from 'react-redux'
import uuidv4 from 'uuid/v4'

import '../../css/app.scss'
import Program from './program'
import ProgramList from './programList'
import FormStep from './formStep'
import ExerciseList from './exerciseList'
import RunProgram from './runProgram'

class Programs extends React.Component{
  constructor(props){
    super(props)

    this.scenes = {
      'PROGRAMS':   <ProgramList />,
      'PROGRAM':    <Program />,
      'FORM_STEP':  <FormStep mode="edit" />,
      'CHOOSE_EXERCISE':   <ExerciseList />,
      'NEW_STEP':   <FormStep mode="add" />,
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