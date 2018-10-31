import React from 'react'
import { connect } from 'react-redux'
import uuidv4 from 'uuid/v4'

import '../../css/app.scss'
import Program from './program'
import ProgramList from './programList'

class Workout extends React.Component{
  constructor(props){
    super(props)

    this.scenes = {
      'WORKOUT': <ProgramList />,
      'PROGRAM': <Program />
    }
  }
  render(){
    const { location } = this.props
    console.log ("this.scenes[location.type] ---> ", this.scenes[location.type])

    return(
      <div className='row no-gutters p-3' id="workout">
        {
          this.scenes[location.type]
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    programs : state.programs,
    location: state.location
  }
}

export default connect(mapStateToProps)(Workout)
