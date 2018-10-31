import React from 'react'
import { connect } from 'react-redux'
import Link from 'redux-first-router-link'

import { fetchCreateExercise, fetchEditExercise, fetchDeleteExercise } from '../actions/exercise'

class Exercise extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      id: this.props.exercise.id,
      name: this.props.exercise.name,
      image: this.props.exercise.image,
      visibility: this.props.exercise.visibility
    }
  }
  inputChange(e){
    this.setState({ [e.target.name]: e.target.value })
  }
  saveExercise(){
    const { mode, createExercise, editExercise } = this.props
    const { id, name, image, visibility } = this.state

    if (mode === "add") {
      createExercise(name, image, visibility)
    } else if (mode === "edit") {
      editExercise(id, name, image, visibility)
    }
  }
  deleteExercice(){
    this.props.deleteExercice(this.props.exercise.id)
  }
  componentDidUpdate(prevProps, prevState){
    const prevExercise = prevProps.exercise
    const { exercise } = this.props
    if (prevExercise.name.length == 0 && exercise.name.length > 0) {
      this.setState({
        id: exercise.id,
        name: exercise.name,
        image: exercise.image,
        visibility: exercise.visibility
      })
    }
  }
  render(){
    const { name, image, visibility } = this.state
    const { mode } = this.props

    return (
      <React.Fragment>
        <Link to="/exercises" className="btn btn-info btn-sm mb-3">← Back to Exercises</Link>
        <div className="col-12 border p-3">
          {mode === "edit" &&
            <div onClick={this.deleteExercice.bind(this)} className="btn btn-outline-danger btn-sm float-right">delete</div>
          }
          <div className="form-group">
            <label>Name</label>
            <input type="text" value={name} name="name" onChange={this.inputChange.bind(this)} className="form-control col-12" />
          </div>
          <div className="form-group">
          <label className="d-block">Image (url)</label>
          {
            image.length > 0?
                <img name="image" src={image} className="border mw-100" />
              :
              ""
          }
          <input type="url" value={image} name="image" onChange={this.inputChange.bind(this)} className="form-control col-12" />
          </div>
          <div className='form-group'>
            <label>Visibility</label>
            <select value={visibility} name='visibility' className="form-control" onChange={this.inputChange.bind(this)}>
              <option value='PRIVATE'>PRIVATE</option>
              <option value='PUBLIC'>PUBLIC</option>
            </select>
          </div>
          <button onClick={this.saveExercise.bind(this)} className="btn btn-info float-left" type="submit">Save Exercise</button>
          <Link to="/exercises" className="btn btn-secondary float-right">Cancel</Link>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    exercise: state.currentExercise
  }
}
const mapDispatchToProps = dispatch => {
  return {
    createExercise: (...args) => { dispatch(fetchCreateExercise(...args)) },
    editExercise: (...args) => { dispatch(fetchEditExercise(...args)) },
    deleteExercice: (id) => { dispatch(fetchDeleteExercise(id)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Exercise)
