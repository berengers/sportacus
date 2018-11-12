import React from 'react'
import { connect } from 'react-redux'
import Link from 'redux-first-router-link'

import { fetchCreateStep, fetchDeleteStep, fetchEditStep } from '../actions/step'

class FormStep extends React.Component{
  constructor(props){
    super(props)
    this.inputChange = this.inputChange.bind(this)
    this.state = {
      exercise: this.props.exercise,
      mode: this.props.mode,
      repetitions: this.props.step.repetitions,
      series: this.props.step.series,
      weight: this.props.step.weight,
      rest_bs: this.props.step.rest_duration_between_series,
      rest_be: this.props.step.rest_end_duration
    }
  }
  inputChange(e){
    this.setState({ [e.target.name]: e.target.value })
  }
  saveStep(){
    const { repetitions, series, weight, rest_bs, rest_be } = this.state
    const exercise_id = this.props.exercise.id
    const { program_id } = this.props.location.payload
    const { id } = this.props.step

    if (this.state.mode === "add") {
      this.props.createStep(repetitions, series, weight, rest_bs, rest_be, program_id, exercise_id)
    }
    else if (this.state.mode === "edit") {
      this.props.editStep(id, repetitions, series, weight, rest_bs, rest_be, program_id, exercise_id)
    }
  }
  componentDidUpdate(prevProps, prevState){
    const prevStep = prevProps.step
    const { step } = this.props
    if (prevStep.id == 0 && step.id > 0) {
      this.setState({
        exercise: step.exercise,
        repetitions: step.repetitions,
        series: step.series,
        weight: step.weight,
        rest_bs: step.rest_duration_between_series,
        rest_be: step.rest_end_duration
      })
    }
  }
  render(){
    const { location, step } = this.props
    const { mode, exercise, repetitions, series, weight, rest_bs, rest_be } = this.state

    return (
      <React.Fragment>
        <div className="d-flex justify-content-between w-100">
          <Link to={`/programs/program/${location.payload.program_id}`} className="btn btn-info btn-sm d-block">← Back to Program</Link>
        </div>
        <div className="col-12 border p-3 mt-3">
          <div className="col-12 mb-3">
          <h3>{step.exercise.name, exercise.name}</h3>
          {
            step.exercise.image.length > 0 || exercise.image.length > 0?
            <img name="image" src={step.exercise.image, exercise.image} className="border mw-100" style={{maxHeight: "25rem"}} />
            :
            ""
          }
          </div>
          <div className="row">
            <div className="form-group col-sm-2">
            <label>Repetitions</label>
            <input type="number" value={repetitions} name="repetitions" onChange={this.inputChange} className="form-control" />
            </div>
            <div className="form-group col-sm-2">
            <label>Series</label>
            <input type="number" value={series} name="series" onChange={this.inputChange} className="form-control" />
            </div>
            <div className="form-group col-sm-2">
            <label>Weight</label>
            <input type="number" value={weight} name="weight" onChange={this.inputChange} className="form-control" />
            </div>
            <div className="col-sm-2"></div>
            <div className="form-group col-sm-2">
              <label>Rest BS</label>
              <input type="number" value={rest_bs} name="rest_bs" onChange={this.inputChange} className="form-control" />
            </div>
            <div className="form-group col-sm-2">
              <label>Rest BE</label>
              <input type="number" value={rest_be} name="rest_be" onChange={this.inputChange} className="form-control" />
            </div>
          </div>
          <div className="d-flex justify-content-between mt-4">
            <button onClick={this.saveStep.bind(this)} className="btn btn-info" type="submit">Save Exercise</button>
            <Link to={`/programs/program/${location.payload.program_id}`} className="btn btn-secondary">Cancel</Link>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    location: state.location,
    step: state.currentStep,
    exercise: state.currentExercise
  }
}
const mapDispatchToProps = dispatch => {
  return {
    createStep: (...args) => dispatch(fetchCreateStep(...args)),
    editStep: (...args) => dispatch(fetchEditStep(...args))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormStep)
