import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

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

Programs.propTypes = {
  location: PropTypes.object.isRequired
}

const mapStateToProps = ({ location }) => ({ location })

export default connect(mapStateToProps)(Programs)
