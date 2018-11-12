import React from 'react'
import { connect } from 'react-redux'

import { fetchCreateExercise } from '../actions/exercise'

class ModalExercise extends React.Component{
  constructor(props){
    super(props)
    console.log ("this.props ---> ", this.props)
    this.state = { name: '', image: '', visibility: 'PRIVATE' }
  }
  inputChange(e){
    this.setState({ [e.target.name] : e.target.value })
  }
  addExercise(){
    const { name, image, visibility } = this.state
    this.props.newExercise(name, image, visibility)
    this.setState({ name: '', image: '', visibility: 'PRIVATE' })
  }
  render(){
    const { name, image, visibility } = this.state

    return (
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
              <input value={name} id='nameInput' name="name" type="text" className="form-control" onChange={this.inputChange.bind(this)} />
            </div>
            <div className="form-group">
              <label className="col-form-label">Image:</label>
              <input value={image} id="imageInput" name="image" type="text" className="form-control" onChange={this.inputChange.bind(this)} />
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
          <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.addExercise.bind(this)}>Add Exercise</button>
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
    newExercise: (...args) => {dispatch(fetchCreateExercise(...args))}
  }
}

export default connect(null, mapDispatchToProps)(ModalExercise)
