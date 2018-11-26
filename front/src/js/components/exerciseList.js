import React from 'react'
import uuidv4 from 'uuid/v4'
import { connect } from 'react-redux'
import Link from 'redux-first-router-link'

import { fetchCreateStep } from '../actions/step'

const medias = "http://localhost:2015/"

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
    const pathImage = `${medias}/images/exercises/`

    return (
      <React.Fragment>
        <h4 className='text-center text-dark bg-primary p-2 col-12'>{location.type === "CHOOSE_EXERCISE"?"Choose an exercise" : "Edit an exercise"}</h4>
        <div className='btn-group-vertical d-block mt-2 col-12' id='exercises'>
          {location.type === "EXERCISES" &&
            exercises.filter(exercise => exercise.visibility === "PRIVATE").map(exercise => (
              <Link
              to={`/exercises/exercise/${exercise.id}`}
                key={uuidv4()} className='btn btn-dark rounded mb-2 p-2' onClick={this.createStep.bind(this, exercise)}>
                <div className='text-uppercase text-center text-truncate w-100 mb-2 font-weight-bold'>{exercise.name}</div>
                {exercise.image?
                  <img className='item-exercise mw-100' style={{maxHeight: "10rem"}} src={pathImage + exercise.image} />
                  :''
                }
              </Link>
            ))
          }
          {location.type === "CHOOSE_EXERCISE" &&
            exercises.map(exercise => (
              <Link
              to={`/programs/program/${location.payload.program_id}`}
                key={uuidv4()} className='btn btn-dark rounded mb-2 p-2' onClick={this.createStep.bind(this, exercise)}>
                <div className='text-uppercase text-center text-truncate w-100 mb-2 font-weight-bold'>{exercise.name}</div>
                {exercise.image? <img className='item-exercise mw-100' style={{maxHeight: "12rem"}} src={pathImage + exercise.image} />:''}
              </Link>
            ))
          }
          <Link to="/exercises/new_exercise" type="button" className="btn btn-info rounded" >
            NEW Exercise
          </Link>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    location: state.location,
    exercises: state.exercises,
    program: state.currentProgram
  }
}
const mapDispatchToProps = dispatch => {
  return {
    createStep: (program_id, exercise_id) => dispatch(fetchCreateStep(program_id, exercise_id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseList)
