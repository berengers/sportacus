import React from 'react'
import { connect } from 'react-redux'
import Link from 'redux-first-router-link'

import '../../css/login.scss'
import { fetchToken } from '../actions/login'


class Login extends React.Component{
  constructor(props){
    super(props)

    this.state = { email : '', password : '' }
    this.handleClick = this.handleClick.bind(this)
  }
  changeInput(e){
    this.setState({ [e.target.name] : e.target.value })
  }
  handleClick(){
    const { email, password } = this.state
    this.props.login(email, password)
  }
  render(){
    return (
      <div className='mx-auto' id='login'>
        <div className='container-fluid mt-5'>
          <div className='border rounded bg-light p-3'>
            <div className='form-group'>
              <label>Email Adress</label>
              <input onChange={this.changeInput.bind(this)} name='email' type='email' className='form-control' placeholder='email'/>
              <div className='valid-feedback'>
                Looks good
              </div>
            </div>
            <div className='form-group'>
              <label>Password</label>
              <input onChange={this.changeInput.bind(this)} name='password' className='form-control' placeholder='password' />
            </div>
            <Link to='/login' onClick={this.handleClick.bind(this)} className='btn btn-info'>Submit</Link>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login : (username, password) => {dispatch(fetchToken(username, password))}
  }
}

export default connect(null, mapDispatchToProps)(Login)
