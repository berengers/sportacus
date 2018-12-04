import React from 'react'
import Link from 'redux-first-router-link'
import { connect } from 'react-redux'
import { Draggable } from 'react-beautiful-dnd'

import { fetchDeleteStep, editStep } from '../actions/step'
import * as type from '../actions/const'
import dragIcon from '../../../../back/medias/icons/baseline-drag_indicator-24px.svg'

class Step extends React.Component{
  constructor(props){
    super(props)
  }
  deleteStep(id, e){
    this.props.deleteStep(id)
  }
  editStep(id, e){
    this.props.editStep(id)
  }
  render(){
    const { id, exercise, repetitions, rest, rest_end, series, weight } = this.props.step
    const { location, step, mode, editStep, editingStep, program } = this.props
    const dragDisabled = editingStep > -1 || program.visibility === "PUBLIC" ? true : false

    return (
      <Draggable draggableId={id} index={this.props.index} isDragDisabled={dragDisabled}>
        {
          (provided, snapshot) => {
            const bg = snapshot.isDragging ? "bg-dark-grey" : "bg-dark"

            return (
              <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className={'text-center text-light col-12 p-4 mb-3 rounded ' + bg}
              >
                {!dragDisabled &&
                  <div className="position-absolute" style={{ top: "50%", right: "1%", opacity: ".7" }}>
                    <img src={dragIcon} />
                  </div>
                }

                {program.visibility === "PRIVATE" && mode === "edit" &&
                  <React.Fragment>
                  <div onClick={this.deleteStep.bind(this, id)} className="btn btn-danger btn-sm col-6 col-sm-2 float-none float-sm-left rounded-0">delete</div>
                  <div onClick={this.props.editStep.bind(this, id)} className='btn btn-dark-grey btn-sm col-6 col-sm-2 float-none float-sm-right rounded-0'>edit</div>
                  </React.Fragment>
                }

                <div style={mode === "wait"? {opacity: ".4"}:{}}>
                  <p className="text-capitalize font-weight-bold" style={{fontSize: "1.8em"}}>{exercise.name}</p>
                  {exercise.image?<div><img className='item_steps mw-100' style={{maxHeight: "9rem"}}
                  src={exercise.image}/></div>:''}
                  <div className="row mt-4 font-weight-bold" style={{fontSize: '1.3rem'}}>
                    <div className="col-6 col-md px-0">Series <span className="d-block badge bg-dark-grey col-10 mx-auto">{series}</span></div>
                    <div className="col-6 col-md px-0">Reps <span className="d-block badge bg-dark-grey col-10 mx-auto">{repetitions}</span></div>
                    <div className="col-6 col-md px-0">Weight  <span className="d-block badge bg-dark-grey col-10 mx-auto">{weight}kg</span></div>
                    <div className="col-6 col-md px-0">Rest  <span className="d-block badge bg-dark-grey col-10 mx-auto">{rest}s</span></div>
                    <div className="col-12 col-md px-0">Rest end  <span className="d-block badge bg-dark-grey col-11 col-md-10 mx-auto">{rest_end}s</span></div>
                  </div>
                </div>
              </div>
            )
          }
        }
      </Draggable>
    )
  }
}

const mapStateToProps = state => {
  return {
    location: state.location,
    editingStep: state.editStep,
    program: state.currentProgram
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteStep: (id) => dispatch({ type: type.DELETE_STEP, payload: { id } }),
    editStep: (id) => dispatch({ type: type.ID_STEP, payload: { id } })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Step)
