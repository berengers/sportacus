import React from 'react'
import { connect } from 'react-redux'

import { fetchCreateExercice } from '../actions/exercice'

class ModalNewExercice extends React.Component{
  constructor(props){
    super(props)

    this.state = { name: '', image: '', visibility: 'PRIVATE' }
  }
  inputChange(e){
    this.setState({ [e.target.name] : e.target.value })
  }
  addExercice(){
    const { name, image, visibility } = this.state
    this.props.newExercice(name, image, visibility)
  }
  render(){
    const { name, image, visibility } = this.state

    return (
      <div className="modal fade" id="newExerciceModal" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">New Exercice</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label className="col-form-label">Name:</label>
                  <input value={name} name="name" type="text" className="form-control" onChange={this.inputChange.bind(this)} />
                </div>
                <div className="form-group">
                  <label className="col-form-label">Image:</label>
                  <input value={image} name="image" type="text" className="form-control" onChange={this.inputChange.bind(this)} />
                </div>
                <div className="from-group">
                  <label className="col-form-label">Visibility:</label>
                  <select value={visibility} name="visibility" className="form-control" onChange={this.inputChange.bind(this)}>
                    <option value="PRIVATE">PRIVATE</option>
                    <option value="PUBLIC">PUBLIC</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.addExercice.bind(this)}>Add Exercice</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return {
    newExercice: (...args) => {dispatch(fetchCreateExercice(...args))}
  }
}

export const Modal_NewExercice = connect(mapStateToProps, mapDispatchToProps)(ModalNewExercice)
