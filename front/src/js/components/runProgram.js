import React from 'react'
import { connect } from 'react-redux'
import uuidv4 from 'uuid/v4'
import Link from 'redux-first-router-link'

const medias = "http://localhost:2015/"

class RunProgram extends React.Component{
  constructor(props){
    super(props)
    this.state = { level: 0, subLevel: 1, totalCountDown: 5, countDown: 5, endProgram: false }
    this.beep = new Audio( medias + 'sounds/' + 'beep.mp3')
    this.finalBeep = new Audio( medias + 'sounds/' + 'finalBeep.mp3')
    this.ovation = new Audio( medias + 'sounds/' + 'ovation.mp3')

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
      count = steps[level].rest
    } else {
      count = steps[level].rest_end
    }

    this.setState({ countDown: count, totalCountDown: count })
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
    //   this.setState({ countDown: firstStep.rest })
    // }
  }
  componentWillUnmount(){
    clearInterval(this.intervalId)
  }
  render(){
    const { steps, program } = this.props
    const { level, subLevel, countDown, totalCountDown, endProgram } = this.state

    // let dashoffset = 376.991 / ((totalCountDown - countDown)+0.001)
    let dashoffset = totalCountDown > 0?(376.991 / totalCountDown) * (totalCountDown - countDown):0
    // MATH FLOOR
    console.log ("dashoffset ---> ", dashoffset)
    let step = steps[this.state.level]
    console.log ("this.state ---> ", this.state)

    return(
      <div className="col-12">
        <Link to={`/programs/program/${program.id}`} className="btn btn-dark mb-3 col-sm-4" >← back to program</Link>
        <div onClick={this.playProgram.bind(this)} className='btn btn-info mb-3 col-sm-4 offset-sm-4'>Play Program  ►</div>
        <div className="row no-gutters mb-2 position-relative">
          <h2 className="bg-primary mx-auto text-center text-dark py-2 col-12">{program.name}</h2>
        </div>
        {steps.length > 0 &&
          <React.Fragment>
            <div key={uuidv4()} className='bg-dark text-light text-center col-12 mb-4 p-4'>
              <p>{subLevel}/{steps[level].series}</p>
              <p className="text-capitalize font-weight-bold" style={{fontSize: "1.8em"}}>{step.exercise.name}</p>
              {step.exercise.image?
                <div><img className='item_steps mw-100' style={{maxHeight: "20rem"}}
                src={medias + 'images/exercises/' + step.exercise.image}/></div>
                :''
              }
              <div className="row mt-4 font-weight-bold" style={{fontSize: '1.3rem'}}>
                <div className="col-6 col-md">Series <span className="d-block badge badge-secondary p-1">{step.series}</span></div>
                  <div className="col-6 col-md">Reps <span className="d-block badge badge-secondary">{step.repetitions}</span></div>
                  <div className="col-6 col-md">Weight  <span className="d-block badge badge-secondary p-1">{step.weight}kg</span></div>
                  <div className="col-6 col-md">Rest  <span className="d-block badge badge-secondary p-1">{step.rest}s</span></div>
                  <div className="col-12 col-md">Rest end  <span className="d-block badge badge-secondary p-1">{step.rest_end}s</span></div>
                </div>

                <div className="row mt-4">
                {!endProgram && countDown > 0 &&
                  <div id="countDown" className="mx-auto">
                    <figure>
                      <figcaption className="text-light">{ this.state.countDown +'"' }</figcaption>
                      {/* width = radius * 2 + strokeWidth * 2  */}
                      {/* circumference = 2 x π x R = 2 * π * 72  */}
                      <svg width="132" height="132" id="circle">
                        <circle cx="66" cy="66" r="60" fill="var(--dark)" stroke="var(--light)" strokeWidth="6" strokeOpacity=".3" />
                        <circle cx="66" cy="66" r="60" fill="none" stroke="white" strokeWidth="6"
                          strokeDasharray="376.991" strokeDashoffset={dashoffset} />
                      </svg>
                    </figure>
                  </div>
                }
                {countDown == 0 && !endProgram &&
                  <button onClick={this.nextSet.bind(this)} className="btn btn-info px-5 mx-auto mw-100">SET FINISHED</button>
                }
                {endProgram &&
                  <div className="bg-dark col-6 mx-auto p-3 text-light font-weight-bold">You were finish your program!</div>
                }
                </div>
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
