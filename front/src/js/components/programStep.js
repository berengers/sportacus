import React from 'react'

export default class ProgramStep extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    const { exercise, repetitions, rest_duration_between_series, rest_end_duration, series, weight } = this.props.program_step

    return (
      <div className='bg-info text-center col-12 mb-4 p-4'>
        <div className='btn btn-dark d-block float-none float-sm-right'>edit</div>
        <span style={{fontSize: "2em"}}>{exercise.name}</span>
        {exercise.image?<div><img className='item_steps' src={exercise.image}/></div>:''}
        <div>Reps : {repetitions}</div>
        <div>Rest duration between series : {rest_duration_between_series}s</div>
        <div>Rest end duration : {rest_end_duration}s</div>
        <div>Series : {series}</div>
        <div>Weight : {weight}kg</div>
      </div>
    )
  }
}
