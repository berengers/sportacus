import React from 'react'
import { connect } from 'react-redux'

import { fetchCreateExercise, fetchEditExercise } from '../actions/exercise'

class ModalNewExercise extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      id: "",
      name: "",
      image: "",
      visibility: "PRIVATE"
    }
  }
  inputChange(e){
    this.setState({ [e.target.name] : e.target.value })
  }
  addOrEditExercise(){
    const { name, image, visibility } = this.state

    if (this.props.mode === "edit") {
      console.log ("editExercise")
      const id = this.props.exercise.id
      console.log ("id ---> ", id)
      this.props.editExercise(id, name, image, visibility)
    }
    else if (this.props.mode === "add") {
      console.log ("addExercise")
      this.props.newExercise(name, image, visibility)
    }

    this.setState({ name: '', image: '', visibility: 'PRIVATE' })
  }
  addExercise(){
    const { name, image, visibility } = this.state
    this.props.newExercise(name, image, visibility)
    this.setState({ name: '', image: '', visibility: 'PRIVATE' })
  }
  render(){
    console.log ("this.state ---> ", this.state)
    const currentExercise = this.props.exercise
    let { name, image, visibility } = this.state

    return (
      <div className="modal fade" id="stepModal" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">New Exercise</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label className="col-form-label">Name:</label>
                  <input id='nameInput' name="name" type="text" className="form-control" onChange={this.inputChange.bind(this)} />
                </div>
                <div className="form-group">
                  <label className="col-form-label">Image:</label>
                  <input value={image} id="imageInput" name="image" type="url" className="form-control" onChange={this.inputChange.bind(this)} />
                </div>
                <div className="from-group">
                  <label className="col-form-label">Visibility:</label>
                  <select value={visibility} id="visibilitySelect" name="visibility" className="form-control" onChange={this.inputChange.bind(this)}>
                    <option value="PRIVATE">PRIVATE</option>
                    <option value="PUBLIC">PUBLIC</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.addOrEditExercise.bind(this)}>
              {this.props.mode === "edit" &&
                "Update Exercise"
              }
              {this.props.mode === "add" &&
                "Add Exercise"
              }
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// const mapStateToProps = state => {
//   return {
//
//   }
// }

const mapDispatchToProps = dispatch => {
  return {
    newExercise: (...args) => {dispatch(fetchCreateExercise(...args))},
    editExercise: (...args) => {dispatch(fetchEditExercise(...args))}
  }
}

export default connect(null, mapDispatchToProps)(ModalNewExercise)
