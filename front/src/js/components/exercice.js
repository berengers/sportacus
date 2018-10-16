import React from 'react'
import uuidv4 from 'uuid/v4'
import { connect } from 'react-redux'

class Exercice extends React.Component{
  constructor(props){
    super(props)
  }
  addExercice(){
    console.log ("this.props ---> ", this.props)
  }
  render(){
    const { exercices } = this.props
    console.log ("this.props ---> ", this.props)

    return (
      <div className='bg-light p-3 pt-4 border-right'>
        <h4 className='text-center text-light bg-info p-2' data-toggle='collapse' data-target='#exercices'>Exercices</h4>
        <div className='btn-group-vertical d-block mt-3' id='exercices'>
          {
            exercices.map(exercice => (
              <button key={uuidv4()} className='btn btn-dark rounded mb-3 p-2' onClick={this.addExercice.bind(this)}>
                <div className='text-capitalize text-center text-truncate w-100'>{exercice.name}</div>
                {exercice.image? <img className='item-exercice' src={exercice.image} />:''}
              </button>
            ))
          }
          <button type="button" className="btn btn-success rounded" data-toggle="modal" data-target="#newExerciceModal">
            NEW Exercice
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
      selectedProgram : state.selectedProgram
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addProgramStep: (program_id, exercice_id, position) => {}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Exercice)
