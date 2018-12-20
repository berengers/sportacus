import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Link from 'redux-first-router-link'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import Step from './step'
import FormStep from './formStep'
import * as type from '../actions/const'
import { fetchUpdateProgram } from '../actions/program'
import loadingGif from '../../../../back/medias/icons/loading.gif'



const Program = (props) => {
  const { dispatch, program, steps, loading, editStep, programChanged } = props
  const mode = program.visibility === "PUBLIC"? "read":"edit"
  
  const order = (list, indexSource, indexDestinatioin) => {
    const [itemMoved] = list.splice(indexSource, 1)
    list.splice(indexDestinatioin, 0, itemMoved)
    return list
  }
  const onDragEnd = (result) => {
    const orderedSteps = order(steps, result.source.index, result.destination.index)
    dispatch({ type: type.CHANGE_POSITION, payload: { steps } })
  }
  const updateProgram = () => {
    program.steps = steps
    dispatch(fetchUpdateProgram(program))
  }

  return (
    <div className="col-12">
      <div className='row no-gutters'>
        <Link to="/programs" className='btn btn-dark-grey mb-3 col-sm-4'> {'← back to programs'} </Link>
        <Link to={`/programs/program/${program.id}/run`} className='btn btn-info mb-3 col-sm-4 offset-sm-4'> {'Run Programs' + '  ' + '►'} </Link>
      </div>

      <h4 className='text-center text-dark font-weight-bold bg-primary p-2 text-capitalize'>{program.name}</h4>
        {programChanged &&
          <a className={"btn btn-success col-12 text-light" + (editStep > -1?" disabled":"")} onClick={ () => updateProgram()}>SAVE CHANGES</a>
        }
        {loading?
          <img
          className="d-block mx-auto mt-5" width="100px"
          src={loadingGif} />
          :
          <React.Fragment>
          <DragDropContext onDragEnd={ (r) => {onDragEnd(r)} }>
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

Program.propTypes = {
  program: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    visibility: PropTypes.string.isRequired
  }),
  steps: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  editStep: PropTypes.number.isRequired,
  programChanged: PropTypes.bool.isRequired
}

const mapStateToProps = state => {
  return {
    program: state.currentProgram,
    steps: state.steps,
    loading: state.loading,
    editStep: state.editStep,
    programChanged: state.programChanged
  }
}

export default connect(mapStateToProps)(Program)
