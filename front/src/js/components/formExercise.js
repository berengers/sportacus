import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Link from 'redux-first-router-link'

import { fetchCreateExercise, fetchEditExercise, fetchDeleteExercise } from '../actions/exercise'
import loadingGif from '../../../../back/medias/icons/loading.gif'

class FormExercise extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      id: this.props.exercise.id,
      name: this.props.exercise.name,
      image: this.props.exercise.image,
      description: this.props.exercise.description,
      visibility: this.props.exercise.visibility
    }
  }
  inputChange(e){
    this.setState({ [e.target.name]: e.target.value })
  }
  saveExercise(){
    const { mode, createExercise, editExercise } = this.props
    const { id, name, image, description, visibility } = this.state

    if (mode === "add") {
      createExercise(name, image, description, visibility)
    } else if (mode === "edit") {
      editExercise(id, name, image, description, visibility)
    }
  }
  deleteExercice(){
    this.props.deleteExercice(this.props.exercise.id)
  }
  static getDerivedStateFromProps(props, state){
    const { id, name, image, description, visibility } = props.exercise

    if (props.exercise.id != state.id) {
      return {
        name: name,
        image: image,
        description: description,
        visibility: visibility
      }
    }

    return null
  }
  render(){
    const { name, image, description, visibility } = this.state
    const { mode, loading } = this.props

    return (
      <React.Fragment>
        <Link to="/exercises" className="btn btn-info btn-sm mb-3">← Back to Exercises</Link>
        <div className="col-12 bg-dark text-light p-3 border">
        {loading?
          <div>
            <img className="d-block mx-auto my-5" width="100px" src={loadingGif} />
          </div>

          :

          <React.Fragment>
          {mode === "edit" &&
            <div onClick={this.deleteExercice.bind(this)} className="btn btn-danger btn-sm float-right">delete</div>
          }
          <div className="form-group">
            <label>Name</label>
            <input type="text" value={name} name="name" onChange={this.inputChange.bind(this)} className="form-control col-12" />
          </div>
          <div className="form-group">
            <label className="d-block">Image (url)</label>
            {image &&
              <img name="image" src={image} className="border mw-100 mb-3" style={{maxHeight: "25rem"}} />
            }
            <input type="url" value={image} name="image" onChange={this.inputChange.bind(this)} className="form-control col-12" />
          </div>
          <div className="form-group">
            <label className="d-block">Description</label>
            <textarea value={description} name="description" onChange={this.inputChange.bind(this)} className="col-12" ></textarea>
          </div>
          <button onClick={this.saveExercise.bind(this)} className="btn btn-info float-left" type="submit">Save Exercise</button>
          <Link to="/exercises" className="btn btn-secondary float-right">Cancel</Link>
          </React.Fragment>
        }
        </div>
      </React.Fragment>
    )
  }
}

FormExercise.propTypes = {
  exercise: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    visibility: PropTypes.string.isRequired
  })
}

const mapStateToProps = ({ currentExercise, loading }) => ({ exercise: currentExercise, loading })

const mapDispatchToProps = dispatch => {
  return {
    createExercise: (...args) => { dispatch(fetchCreateExercise(...args)) },
    editExercise: (...args) => { dispatch(fetchEditExercise(...args)) },
    deleteExercice: (id) => { dispatch(fetchDeleteExercise(id)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormExercise)
