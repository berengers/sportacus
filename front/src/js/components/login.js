import React from 'react'
import { connect } from 'react-redux'
import Link from 'redux-first-router-link'

import { fetchToken } from '../actions/login'


class Login extends React.Component{
  constructor(props){
    super(props)

    this.state = { email : '', password : '', validate: '' }
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
    const { error } = this.props
    console.log ("error ---> ", error)

    return (
      <div className='mx-auto' style={{maxWidth: "450px"}}>
        <div className='container-fluid mt-5'>
          <form className={'bg-dark-grey text-light rounded p-3 ' + this.state.validate} noValidate>
            <div className='form-group'>
              <label>Email Adress</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroupPrepend">@</span>
                </div>
                <input onChange={this.changeInput.bind(this)} name='email' type='email' className='form-control' placeholder='email' autoFocus required/>
                <div className="invalid-feedback">
                  e-mail adress valid is required
                </div>
              </div>
              <div className='valid-feedback'>
                Looks good
              </div>
            </div>
            <div className='form-group'>
              <label>Password</label>
              <input onChange={this.changeInput.bind(this)} name='password' className='form-control' placeholder='password' required/>
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
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    error: state.error
  }
}
const mapDispatchToProps = dispatch => {
  return {
    login : (username, password) => {dispatch(fetchToken(username, password))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
