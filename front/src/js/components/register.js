import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import  Link from 'redux-first-router-link'

import { fetchCreateUser } from '../actions/user'


class Register extends React.Component{
  constructor(props){
    super(props)
    this.state = { email : "", username : "", password : "", validate: "" }
    this.changeInput = this.changeInput.bind(this)
  }
  changeInput(e){
    this.setState({ [e.target.name]: e.target.value })
  }
  createAccount(e){
    e.preventDefault()
    e.stopPropagation()
    const form = document.querySelector('form')
    const { error } = this.props

    if (!form.checkValidity()) {
      this.setState({ validate: "was-validated" })
      return
    }

    const { email, username, password } = this.state
    this.props.createUser(email, username, password)
  }
  render(){
    const { error } = this.props
    console.log ("this.props.error ---> ", this.props.error)

    return (
      <div className="mx-auto" style={{maxWidth: "450px"}}>
        <div className="container-fluid mt-5">
          <form className={"bg-dark-grey text-light rounded p-3 " + this.state.validate} noValidate>
            <div className="form-group">
              <label>Email Adress</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroupPrepend">@</span>
                </div>
                <input onChange={this.changeInput} name="email" type="email" className="form-control" placeholder="email" autoFocus required/>
                <div className="invalid-feedback">
                  e-mail adress valid is required
                </div>
              </div>
              {error === "Email already exist" &&
                <div className="alert-danger mt-2 px-2">sorry, this email already exist</div>
              }
            </div>
            <div className="form-group">
              <label>Username</label>
              <div className="input-group">
                <input onChange={this.changeInput} name="username" type="text" className="form-control" placeholder="username" required/>
                <div className="invalid-feedback">
                  username valid is required
                </div>
              </div>
              {error === "Username already exist" &&
                <div className="alert-danger mt-2 px-2">sorry, this username already exist</div>
              }
            </div>
            <div className="form-group">
              <label>Password</label>
              <input onChange={this.changeInput} name="password" className="form-control" placeholder="password" minLength="7" required/>
              <div className="invalid-feedback">
                at least 7 characters
              </div>
            </div>
            <button onClick={this.createAccount.bind(this)} className="btn btn-info mt-3">Create an account</button>
          </form>
          {"error" === "error login" &&
            <div className="alert alert-danger mt-3 font-weight-bold" role="alert">
              Wrong email or password
            </div>
          }
          <Link to="/login" className="btn btn-primary btn-sm col-12 mt-3">
            You have an account? Login ->
          </Link>
        </div>
      </div>
    )
  }
}

Register.propTypes = {
  error: PropTypes.string.isRequired
}

const mapStateToProps = ({ error }) => ({ error })

const mapDispatchToProps = dispatch => {
  return {
    createUser: (...args) => { dispatch(fetchCreateUser(...args)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
