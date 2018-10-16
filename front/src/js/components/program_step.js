import React from 'react'

export default class ProgramStep extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    const { name, image, repetitions, rest_duration_between_series, rest_end_duration, series, weight } = this.props.program_step

    return (
      <div className='btn btn-light col mb-5'>
        <h3 className="title-h3">{name}</h3>
        <ul>
          {image?<div><img className='item_steps' src={image}/></div>:''}
          <div>Reps : {repetitions}</div>
          <div>Rest duration between series : {rest_duration_between_series}s</div>
          <div>Rest end duration : {rest_end_duration}s</div>
          <div>Series : {series}</div>
          <div>Weight : {weight}kg</div>
        </ul>
      </div>
    )
  }
}
