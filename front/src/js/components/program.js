import React from 'react'
import { connect } from 'react-redux'
import uuidv4 from 'uuid/v4'
import Link from 'redux-first-router-link'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import Step from './step'
import FormStep from './formStep'
import * as type from '../actions/const'

class Program extends React.Component{
  constructor(props){
    super(props)
    this.initialSteps = []
  }
  order(list, indexSource, indexDestinatioin) {
    const [itemMoved] = list.splice(indexSource, 1)
    list.splice(indexDestinatioin, 0, itemMoved)
    return list
  }
  onDragEnd(result){
    const { steps, changePosition } = this.props
    const orderedSteps = this.order(steps, result.source.index, result.destination.index)
    changePosition(orderedSteps)
  }
  saveProgram(){
    const { program, steps } = this.props
    program.steps = steps
  }
  componentDidUpdate(prevProps){
    if (prevProps.steps.length === 0 && this.props.steps.length > 0) {
      this.initialSteps = this.props.steps
      this.setState({})
    }
  }
  render(){
    const { location, program, steps, charging, editStep } = this.props
    const mode = program.visibility === "PUBLIC"? "read":"edit"
    const dif =  JSON.stringify(this.initialSteps) === JSON.stringify(this.props.steps)

    return (
      <div className="col-12">
        <div className='row no-gutters'>
          <Link to="/programs" className='btn btn-dark-grey mb-3 col-sm-4'> {'← back to programs'} </Link>
          <Link to={`/programs/program/${program.id}/run`} className='btn btn-info mb-3 col-sm-4 offset-sm-4'> {'Run Programs' + '  ' + '►'} </Link>
        </div>

        <h4 className='text-center text-dark font-weight-bold bg-primary p-2 text-capitalize'>{program.name}</h4>
          {dif &&
            <a className={"btn btn-info col-12 text-light" + (editStep > -1?" disabled":"")} onClick={this.saveProgram.bind(this)}>SAVE CHANGES</a>
          }
          {charging?
            <img
            className="d-block mx-auto mt-5" width="100px"
            src="http://localhost:2015/icons/loading.gif" />
            :
            <React.Fragment>
            <DragDropContext onDragEnd={this.onDragEnd.bind(this)}>
              <Droppable droppableId="droppable-1">
              {
                (provided, snapshot) => {
                  return (
                    <div
                    ref={provided.innerRef}
                    style={{backgroundColor: ""}}{...provided.droppableProps}
                    className='row no-gutters w-100 mt-2'
                    >
                    {
                      steps.map( (step, index) => {
                        if (editStep === step.id) {
                          return <FormStep key={step.id} step={step} index={index} mode={mode}/>
                        }
                        if (editStep > -1) {
                          return <Step key={step.id} step={step} index={index} mode={"wait"}/>
                        }
                        return <Step key={step.id} step={step} index={index} mode={mode}/>
                      })
                    }
                    {provided.placeholder}
                    </div>
                  )
                }
              }
              </Droppable>
            </DragDropContext>
            {program.visibility === "PRIVATE" &&
              <Link
              to={`/programs/program/${program.id}/choose_exercise`}
              className={'btn btn-warning text-center col-12 p-2' + (editStep>-1?' disabled':'')}
              >+</Link>
            }
            </React.Fragment>
          }

      </div>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    changePosition: (steps) => dispatch({ type: type.CHANGE_POSITION, payload: { steps } })
  }
}
const mapStateToProps = state => {
  return {
    location: state.location,
    program: state.currentProgram,
    steps: state.steps,
    charging: state.charging,
    editStep: state.editStep
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Program)
