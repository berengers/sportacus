import React from 'react'
import PropTypes from 'prop-types'
import uuidv4 from 'uuid/v4'
import { connect } from 'react-redux'
import Link from 'redux-first-router-link'

import { fetchCreateStep } from '../actions/step'

class ExerciseList extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      mode: "",
      currentExercise: 0
    }
  }
  editExercise(exercise, e){
    this.setState({ mode: "edit", currentExercise: exercise.id })
  }
  createStep(exercise, e){
    this.props.createStep(this.props.program.id, exercise.id)
  }
  render(){
    const { location, exercises } = this.props

    return (
      <React.Fragment>
        <h4 className='text-center text-dark bg-primary p-2 col-12'>{location.type === "CHOOSE_EXERCISE"?"Choose an exercise" : "Edit an exercise"}</h4>
        <div className='btn-group-vertical d-block mt-2 col-12' id='exercises'>
          {location.type === "EXERCISES" &&
            exercises.filter(exercise => exercise.visibility === "PRIVATE").map(exercise => (
              <Link
                to={`/exercises/exercise/${exercise.id}`}
                key={uuidv4()} className='btn btn-dark rounded mb-2 p-2'>

                <div className="d-flex align-items-center">
                  <div className="col-sm-8 mx-auto">
                      <h3 className="h3 text-uppercase font-weight-bold text-truncate">{exercise.name}</h3>
                      <small className="d-none d-sm-block text-muted text-truncate">{exercise.description}</small>
                  </div>

                  <div className="col-sm-4 d-none d-sm-flex justify-content-center" style={{overflow: "hidden"}}>
                  {exercise.image &&
                    <img className='' style={{height: "100px"}} src={exercise.image} />
                  }
                  </div>
                </div>
              </Link>
            ))
          }
          {location.type === "CHOOSE_EXERCISE" &&
            exercises.map(exercise => (
              <Link
              to={`/programs/program/${location.payload.program_id}`}
                key={uuidv4()} className='btn btn-dark rounded mb-2 p-2' onClick={this.createStep.bind(this, exercise)}>
                <div className='text-uppercase text-center text-truncate w-100 mb-2 font-weight-bold'>{exercise.name}</div>
                {exercise.image? <img className='item-exercise mw-100' style={{maxHeight: "7rem"}} src={exercise.image} />:''}
              </Link>
            ))
          }
          <Link to="/exercises/new_exercise" type="button" className="btn bg-primary text-dark text-center rounded-0 py-2" >
            NEW Exercise
          </Link>
        </div>
      </React.Fragment>
    )
  }
}

ExerciseList.propTypes = {
  location: PropTypes.object.isRequired,
  exercises: PropTypes.array.isRequired,
  program: PropTypes.object.isRequired
}

const mapStateToProps = ({ location, exercises, currentProgram }) => ({ location, exercises, program: currentProgram })

const mapDispatchToProps = dispatch => {
  return {
    createStep: (program_id, exercise_id) => dispatch(fetchCreateStep(program_id, exercise_id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseList)
