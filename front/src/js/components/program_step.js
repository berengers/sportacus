import React from 'react'

export default class ProgramStep extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    const { exercice, repetitions, rest_duration_between_series, rest_end_duration, series, weight } = this.props.program_step

    return (
      <div className='btn btn-light col mb-5'>
        <p className='btn btn-dark d-block float-none float-sm-right'>edit</p>
        <span className="programStep-title text-truncate">{exercice.name}</span>
        {exercice.image?<div><img className='item_steps' src={exercice.image}/></div>:''}
        <div>Reps : {repetitions}</div>
        <div>Rest duration between series : {rest_duration_between_series}s</div>
        <div>Rest end duration : {rest_end_duration}s</div>
        <div>Series : {series}</div>
        <div>Weight : {weight}kg</div>
      </div>
    )
  }
}
