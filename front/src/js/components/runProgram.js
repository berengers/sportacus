import React from 'react'
import { connect } from 'react-redux'
import uuidv4 from 'uuid/v4'

class RunProgram extends React.Component{
  constructor(props){
    super(props)
    this.state = { level: 0, subLevel: 1, countDown: 3, endProgram: false }
    this.beep = new Audio('http://localhost:2015/beep.mp3')
    this.finalBeep = new Audio('http://localhost:2015/finalBeep.mp3')
    this.ovation = new Audio('http://localhost:2015/ovation.mp3')

    // if (this.props.steps.length > 0) {
    //   this.state = { level: 0, subLevel: 1, countDown: this.props.steps[0].rest_duration_between_series }
    // }

    // console.log ("this.state.level ---> ", this.state.level)
    // console.log ("this.state.subLevel ---> ", this.state.subLevel)
    // console.log ("this.state.countDown ---> ", this.state.countDown)
  }
  playProgram(e){
    this.countDown(this.state.countDown)
    e.target.style.display = "none"
  }
  countDown(count){

    this.intervalId = setInterval( () => {
      sportCounter()
    }, 1000)

    let countDown = count
    // this.setState({ countDown: --countDown })

    let sportCounter = (function () {
      // console.log ("this ---> ", this)
      // console.log ("this.state.displayCount ---> ", this.state.countDown)
      this.setState({ countDown: --countDown })

      if (countDown <= 3 && countDown > 0) {
        this.beep.play()
      } else if (countDown == 0) {
        this.finalBeep.play()
      }
      // countDown--

      if (countDown == 0) {
        console.log ("count finish !!!")
        clearInterval(this.intervalId)
      }
    }).bind(this)
  }
  nextSet(){
    const { level, subLevel } = this.state
    const { steps } = this.props
    let count

    if (subLevel != steps[level].series) {
      count = steps[level].rest_duration_between_series
    } else {
      count = steps[level].rest_end_duration
    }

    this.setState({ countDown: count })
    // console.log ("level ---> ", level)
    // console.log ("this.props.steps.length ---> ", this.props.steps.length)
    if (level == steps.length -1 && subLevel == steps[level].series) {
      this.setState({ endProgram: true })
      this.ovation.play()
      console.log("FINISH")
    } else if (this.state.subLevel < steps[level].series) {
      console.log('SUBLEVEL AGAIN')
      // console.log ("this.state.subLevel ---> ", subLevel)
      this.setState({ subLevel: this.state.subLevel + 1 })
      if (count != 0) {
        this.countDown(count)
      }
    } else {
      console.log("NEXT STEP")
      this.setState({ level: level + 1, subLevel: 1 })
      if (count != 0) {
        this.countDown(count)
      }
    }
  }
  componentDidUpdate(prevProps){
    // if (prevProps.steps.length == 0 && this.props.steps.length > 0) {
    //   const firstStep = this.props.steps[0]
    //   this.setState({ countDown: firstStep.rest_duration_between_series })
    // }
  }
  componentWillUnmount(){
    clearInterval(this.intervalId)
  }
  render(){
    const { steps, program } = this.props
    const { level, subLevel, countDown, endProgram } = this.state
    let step = steps[this.state.level]
    console.log ("this.state ---> ", this.state)

    const circleStyle = {
      fontSize: "3rem",
      width: "100px",
      height: "100px",
      lineHeight: "70px",
      textAlign: "center"
    }

    // let strokeD = 537 - (538 / this.state.countDown + 1)
    // console.log ("steps ---> ", steps)
    // console.log ("this.state.level ---> ", this.state.level)
    // console.log ("step ---> ", step)
    // let curStep = 0
    // console.log ("this.state ---> ", this.state)

    return(
      <div className="col-12">
        {/*<button className="btn btn-info flot-left">back to programs</button>*/}
        <div className="row no-gutters mb-2">
          <h2 className="bg-dark mx-auto text-center text-light py-2 col-12">{program.name}</h2>
        </div>
        <div onClick={this.playProgram.bind(this)} className='btn btn-success col-12 mb-2'>Play Program -></div>
        {steps.length > 0 &&
          <React.Fragment>
            <div key={uuidv4()} className='bg-info text-center col-12 mb-4 p-4'>
              <p>{subLevel}/{steps[level].series}</p>
              <p className="text-capitalize font-weight-bold" style={{fontSize: "1.8em"}}>{step.exercise.name}</p>
              {step.exercise.image?<div><img className='item_steps mw-100' style={{maxHeight: "20rem"}} src={step.exercise.image}/></div>:''}
              <div className="row mt-4 font-weight-bold" style={{fontSize: '1.3rem'}}>
                <div className="col-6 col-md">Series <span className="d-block badge badge-secondary p-1">{step.series}</span></div>
                  <div className="col-6 col-md">Reps <span className="d-block badge badge-secondary">{step.repetitions}</span></div>
                  <div className="col-6 col-md">Weight  <span className="d-block badge badge-secondary p-1">{step.weight}kg</span></div>
                  <div className="col-6 col-md">Rest  <span className="d-block badge badge-secondary p-1">{step.rest_duration_between_series}s</span></div>
                  <div className="col-12 col-md">Rest end  <span className="d-block badge badge-secondary p-1">{step.rest_end_duration}s</span></div>
                </div>

                <div className="row mt-4">
                {countDown > 0 &&
                  <p className="bg-dark mx-auto p-3 rounded-circle text-light" style={circleStyle}>
                    { this.state.countDown +'"' }
                  </p>
                }
                {countDown == 0 && !endProgram &&
                  <button onClick={this.nextSet.bind(this)} className="btn btn-dark col-6 mx-auto">SET FINISHED</button>
                }
                {endProgram &&
                  <div className="bg-dark col-6 mx-auto p-3 text-light font-weight-bold">You were finish your program!</div>
                }
                </div>

                {/*<div id="countDown" className="row">
                  <figure className="figure">
                    <figcaption>{"ljljljn"}</figcaption>

                    <svg width="150" height="150">
                      <circle className="outer"
                      style={{ strokeDashoffset: strokeD }}
                      cx="115" cy="73" r="65" transform="rotate(-90, 95, 95)" />
                    </svg>
                  </figure>
                </div>*/}
            </div>
          </React.Fragment>
        }
      </div>
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
