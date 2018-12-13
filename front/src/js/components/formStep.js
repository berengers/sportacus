import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Draggable } from 'react-beautiful-dnd'

import { fetchDeleteStep } from '../actions/step'
import * as type from '../actions/const'


class FormStep extends React.Component{
  constructor(props){
    super(props)
    this.inputChange = this.inputChange.bind(this)
    this.state = {
      step: this.props.step,
      validate: ""
    }
  }
  inputChange(e){
    const { name, value } = e.target

    if (!Number.isInteger(parseInt(value))) {
      alert("Use a number please")
      return
    }
    
    this.setState(prevState => ({
      step: {
        ...prevState.step,
        [name]: parseInt(value)
      }
    }))
  }
  cancelStep(){
    this.props.cancelStep()
  }
  saveStep(){
    const { step } = this.state
    this.props.editStep(step)
    this.props.cancelStep()
  }
  render(){
    const { id, exercise } = this.props.step
    const { series, repetitions, rest, rest_end, weight } = this.state.step
    const { location, step, mode } = this.props
    const styleForm = "d-block form-control col-10 mx-auto text-center"

    return (
      <Draggable draggableId={id} index={this.props.index} isDragDisabled={true}>
        {
          (provided, snapshot) => {
            return (
              <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className='bg-light text-center col-12 p-4 mb-3'
              >
                <div onClick={this.cancelStep.bind(this)} className="btn btn-dark btn-sm col-6 col-sm-2 float-none float-sm-left rounded-0">cancel</div>
                <div onClick={this.saveStep.bind(this)} className='btn btn-success btn-sm col-6 col-sm-2 float-none float-sm-right rounded-0'>ok</div>

                <p className="text-capitalize font-weight-bold" style={{fontSize: "1.8em"}}>{exercise.name}</p>
                {exercise.image?<div><img className='item_steps mw-100' style={{maxHeight: "9rem"}} src={exercise.image}/></div>:''}

                <form noValidate>
                <div className="row mt-4 font-weight-bold" style={{fontSize: '1.3rem'}}>
                  <div className="col-6 col-md px-0">Series
                    <input type="number" value={series} name="series" min="1" onChange={this.inputChange} className={styleForm}/>
                    <div className="invalid-feedback">
                      e-mail adress valid is required
                    </div>
                  </div>
                  <div className="col-6 col-md px-0">Reps
                    <input type="number" value={repetitions} name="repetitions" min="0" onChange={this.inputChange} className={styleForm}/>
                  </div>
                  <div className="col-6 col-md px-0">Weight
                    <input type="number" value={weight} name="weight" min="0" onChange={this.inputChange} className={styleForm}/>
                  </div>
                  <div className="col-6 col-md px-0">Rest
                    <input type="number" value={rest} name="rest" min="0" onChange={this.inputChange} className={styleForm}/></div>
                  <div className="col-12 col-md px-0">Rest end
                    <input type="number" value={rest_end} name="rest_end" min="0" onChange={this.inputChange} className={styleForm + " col-11 "}/>
                  </div>
                </div>
                </form>
              </div>
            )
          }
        }
      </Draggable>
    )
  }
}

FormStep.propTypes = {
  location: PropTypes.object.isRequired
}

const mapStateToProps = ({ location }) => ({ location })

const mapDispatchToProps = dispatch => {
  return {
    deleteStep: (id) => dispatch(fetchDeleteStep(id)),
    cancelStep: () => dispatch({ type: type.ID_STEP, payload: { id: -1 } }),
    editStep: (step) => dispatch({ type: type.EDIT_STEP, payload: { step } })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormStep)
