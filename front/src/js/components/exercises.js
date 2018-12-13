import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import uuidv4 from 'uuid/v4'

import ExerciseList from './exerciseList'
import FormExercise from './formExercise'

const scenes = {
  'EXERCISES': <ExerciseList />,
  'EXERCISE': <FormExercise mode="edit" />,
  'NEW_EXERCISE': <FormExercise mode="add" />
}


const Exercises = ({ location }) => {

  return(
    <div className='row no-gutters p-3 col-md-10 col-xl-8 mx-auto'>
      {
        scenes[location.type]
      }
    </div>
  )
}

Exercises.propTypes = {
  location: PropTypes.object.isRequired
}

const mapStateToProps = ({ location }) => ({ location })

export default connect(mapStateToProps)(Exercises)
