import React from 'react'
import { connect } from 'react-redux'

class RunProgram extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    const { program, steps } = this.props

    return(
      <React.Fragment>
        
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    program: state.currentProgram,
    steps: state.steps
  }
}

export default connect(mapStateToProps)(RunProgram)
