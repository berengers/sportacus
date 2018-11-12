import React from 'react'
import { connect } from 'react-redux'
import uuidv4 from 'uuid/v4'

import '../../css/app.scss'
import ExerciseList from './exerciseList'
import Exercise from './exercise'

class Exercises extends React.Component{
  constructor(props){
    super(props)

    this.scenes = {
      'EXERCISES':    <ExerciseList />,
      'EXERCISE':     <Exercise mode="edit"/>,
      'NEW_EXERCISE': <Exercise mode="add"/>
    }
  }
  render(){
    const { location } = this.props

    return(
      <div className='row no-gutters p-3 col-md-10 col-xl-8 mx-auto'>
        {
          this.scenes[location.type]
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    location: state.location
  }
}

export default connect(mapStateToProps)(Exercises)
