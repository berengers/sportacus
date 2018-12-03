import React from 'react'
import { connect } from 'react-redux'
import uuidv4 from 'uuid/v4'
import Link from 'redux-first-router-link'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import Step from './step'
import FormStep from './formStep'
import * as type from '../actions/const'
import { fetchUpdateProgram } from '../actions/program'
import loading from '../../../../back/medias/icons/loading.gif'

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
  updateProgram(){
    const { program, steps, updateProgram } = this.props
    program.steps = steps
    updateProgram(program)
  }
  componentDidUpdate(prevProps){
    if (prevProps.steps.length === 0 && this.props.steps.length > 0) {
      this.initialSteps = this.props.steps
      this.setState({})
    }
  }
  render(){
    const { location, program, steps, charging, editStep, programChanged } = this.props
    const mode = program.visibility === "PUBLIC"? "read":"edit"
    const dif =  JSON.stringify(this.initialSteps) === JSON.stringify(this.props.steps)

    return (
      <div className="col-12">
        <div className='row no-gutters'>
          <Link to="/programs" className='btn btn-dark-grey mb-3 col-sm-4'> {'← back to programs'} </Link>
          <Link to={`/programs/program/${program.id}/run`} className='btn btn-info mb-3 col-sm-4 offset-sm-4'> {'Run Programs' + '  ' + '►'} </Link>
        </div>

        <h4 className='text-center text-dark font-weight-bold bg-primary p-2 text-capitalize'>{program.name}</h4>
          {programChanged &&
            <a className={"btn btn-success col-12 text-light" + (editStep > -1?" disabled":"")} onClick={this.updateProgram.bind(this)}>SAVE CHANGES</a>
          }
          {charging?
            <img
            className="d-block mx-auto mt-5" width="100px"
            src={loading} />
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
    changePosition: (steps) => dispatch({ type: type.CHANGE_POSITION, payload: { steps } }),
    updateProgram: (program) => dispatch(fetchUpdateProgram(program))
  }
}
const mapStateToProps = state => {
  return {
    location: state.location,
    program: state.currentProgram,
    steps: state.steps,
    charging: state.charging,
    editStep: state.editStep,
    programChanged: state.programChanged
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Program)
