import React from 'react'
import uuidv4 from 'uuid/v4'
import { connect } from 'react-redux'
import Link from 'redux-first-router-link'

import { Modal_NewExercise } from './modal'
import ModalExercise from './modalExercise'

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
  modalModeAdd(){
    this.setState({ mode: "add", currentExercise: 0 })
  }
  render(){
    const { exercises } = this.props

    return (
      <React.Fragment>
        <h4 className='text-center text-light bg-info p-2 col-12'>Exercises</h4>
        <div className='btn-group-vertical d-block mt-2 col-12' id='exercises'>
          {
            exercises.map(exercise => (
              <Link to={`/exercises/exercise/${exercise.id}`} key={uuidv4()} className='btn btn-dark rounded mb-2 p-2' >
                <div className='text-uppercase text-center text-truncate w-100 mb-2 font-weight-bold'>{exercise.name}</div>
                {exercise.image? <img className='item-exercise' src={exercise.image} />:''}
              </Link>
            ))
          }
          <Link to="/exercises/new_exercise" type="button" className="btn btn-success rounded" >
            NEW Exercise
          </Link>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    exercises: state.exercises
  }
}

export default connect(mapStateToProps)(ExerciseList)
