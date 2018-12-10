import React from 'react'
import { connect } from 'react-redux'
import uuidv4 from 'uuid/v4'

import Program from './program'
import ProgramList from './programList'
import ExerciseList from './exerciseList'
import RunProgram from './runProgram'

const scenes = {
  'PROGRAMS':   <ProgramList />,
  'PROGRAM':    <Program />,
  'CHOOSE_EXERCISE':   <ExerciseList />,
  'RUN_PROGRAM':<RunProgram />
}

const Programs = ({ location }) => {
  
  return(
    <div className='row no-gutters p-3 col-md-10 col-xl-6 mx-auto'>
      {
        scenes[location.type]
      }
    </div>
  )
}

const mapStateToProps = ({ location }) => ({ location })

export default connect(mapStateToProps)(Programs)
