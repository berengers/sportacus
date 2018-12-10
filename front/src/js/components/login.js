import React from 'react'
import { connect } from 'react-redux'
import Link from 'redux-first-router-link'

import { fetchToken } from '../actions/login'
import * as type from '../actions/const'


class Login extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      email : this.props.user.email,
      password : '',
      validate: ''
    }
    this.handleClick = this.handleClick.bind(this)
  }
  changeInput(e){
    this.setState({ [e.target.name] : e.target.value })
  }
  handleClick(e){
    e.preventDefault()
    e.stopPropagation()
    const form = document.querySelector('form')

    if (!form.checkValidity()) {
        this.setState({ validate: "was-validated" })
        return
    }
    const { email, password } = this.state
    this.props.login(email, password)
  }
  render(){
    const { user, error } = this.props
    const { email, password } = this.state

    return (
      <div className='mx-auto' style={{maxWidth: "450px"}}>
        <div className='container-fluid mt-5'>
          {user.email.length > 0 &&
            <div className="alert alert-success">Your account was created</div>
          }
          <form className={'bg-dark-grey text-light rounded p-3 ' + this.state.validate} noValidate>
            <div className='form-group'>
              <label>Email Adress</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroupPrepend">@</span>
                </div>
                <input onChange={this.changeInput.bind(this)} value={email} name='email' type='email' className='form-control' placeholder='email' autoFocus required/>
                <div className="invalid-feedback">
                  e-mail adress valid is required
                </div>
              </div>
            </div>
            <div className='form-group'>
              <label>Password</label>
              <input onChange={this.changeInput.bind(this)} value={password} name='password' className='form-control' placeholder='password' required/>
              <div className="invalid-feedback">
                password is required
              </div>
            </div>
            <Link to='/login' onClick={this.handleClick.bind(this)} className='btn btn-info'>Submit</Link>
          </form>
          {error === "error login" &&
            <div className="alert alert-danger mt-3 font-weight-bold" role="alert">
              Wrong email or password
            </div>
          }
          <Link to="/register" className="btn btn-primary btn-sm col-12 mt-3">
            Create an account
          </Link>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
    error: state.error
  }
}
const mapDispatchToProps = dispatch => {
  return {
    login : (username, password) => { dispatch(fetchToken(username, password)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
