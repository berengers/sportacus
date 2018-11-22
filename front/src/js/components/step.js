import React from 'react'
import Link from 'redux-first-router-link'
import { connect } from 'react-redux'
import { Draggable } from 'react-beautiful-dnd'

import { fetchDeleteStep, editStep } from '../actions/step'

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
    // console.log ("step ---> ", step)
    // console.log ("this.props ---> ", this.props)
    // console.log ("id ---> ", id)
    // console.log ("editStep ---> ", editingStep)

    return (
      <Draggable draggableId={id} index={this.props.index} isDragDisabled={dragDisabled}>
        {
          (provided, snapshot) => {
            const getStyle = {
              background : snapshot.isDragging? "#15d6ff" : "#009eb7",
              ...provided.draggableProps.style,
            }

            return (
              <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className={'text-center col-12 p-4 mb-3 rounded ' +
              (snapshot.isDragging? "bg-warning" : "bg-info")}
              >
                {!dragDisabled &&
                  <div className="position-absolute" style={{ top: "50%", right: "1%", opacity: ".7" }}>
                    <img src="http://localhost:2015/icons/baseline-drag_indicator-24px.svg" />
                  </div>
                }
                <div style={mode === "wait"? {opacity: ".7"}:{}}>
                  <p className="text-capitalize font-weight-bold" style={{fontSize: "1.8em"}}>{exercise.name}</p>
                  {exercise.image?<div><img className='item_steps mw-100' style={{maxHeight: "9rem"}} src={exercise.image}/></div>:''}
                  <div className="row mt-4 font-weight-bold" style={{fontSize: '1.3rem'}}>
                    <div className="col-6 col-md">Series <span className="d-block badge badge-secondary p-1">{series}</span></div>
                    <div className="col-6 col-md">Reps <span className="d-block badge badge-secondary">{repetitions}</span></div>
                    <div className="col-6 col-md">Weight  <span className="d-block badge badge-secondary p-1">{weight}kg</span></div>
                    <div className="col-6 col-md">Rest  <span className="d-block badge badge-secondary p-1">{rest}s</span></div>
                    <div className="col-12 col-md">Rest end  <span className="d-block badge badge-secondary p-1">{rest_end}s</span></div>
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
    deleteStep: (id) => dispatch(fetchDeleteStep(id)),
    editStep: (id) => dispatch({ type: "ID_STEP", payload: { id } })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Step)
