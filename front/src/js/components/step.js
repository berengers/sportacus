import React from 'react'
import Link from 'redux-first-router-link'
import { connect } from 'react-redux'

import { fetchDeleteStep } from '../actions/step'

class Step extends React.Component{
  constructor(props){
    super(props)
  }
  deleteStep(id, e){
    this.props.deleteStep(id)
  }
  render(){
    const { id, exercise, repetitions, rest_duration_between_series, rest_end_duration, series, weight } = this.props.step
    const { location } = this.props

    return (
      <div className='bg-info text-center col-12 mb-4 p-4'>
        <div onClick={this.deleteStep.bind(this, id)} className="btn btn-danger btn-sm col-6 col-sm-2 float-none float-sm-left rounded-0">delete</div>
        <Link to={`${location.pathname}/step/${id}`} className='btn btn-dark btn-sm col-6 col-sm-2 float-none float-sm-right rounded-0'>edit</Link>
        <p className="text-capitalize font-weight-bold" style={{fontSize: "1.8em"}}>{exercise.name}</p>
        {exercise.image?<div><img className='item_steps mw-100' style={{maxHeight: "20rem"}} src={exercise.image}/></div>:''}
        <div className="row mt-4 font-weight-bold" style={{fontSize: '1.3rem'}}>
        <div className="col-6 col-md">Series <span className="d-block badge badge-secondary p-1">{series}</span></div>
          <div className="col-6 col-md">Reps <span className="d-block badge badge-secondary">{repetitions}</span></div>
          <div className="col-6 col-md">Weight  <span className="d-block badge badge-secondary p-1">{weight}kg</span></div>
          <div className="col-6 col-md">Rest  <span className="d-block badge badge-secondary p-1">{rest_duration_between_series}s</span></div>
          <div className="col-12 col-md">Rest end  <span className="d-block badge badge-secondary p-1">{rest_end_duration}s</span></div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    location: state.location
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteStep: (id) => dispatch(fetchDeleteStep(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Step)
