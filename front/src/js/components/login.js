import React from 'react'
// import bstyle from 'bootstrap/dist/css/bootstrap.css'
// console.log ("bstyle ---> ", bstyle)
import '../../css/login.scss'


export default class Login extends React.Component{
  render(){
    return (
      <div className='mx-auto' id='login'>
        <div className='container-fluid mt-5'>
          <form className='border rounded bg-light p-3'>
            <div className='form-group'>
              <label>Email Adress</label>
              <input type='email' className='form-control' placeholder='email'/>
              <div className='valid-feedback'>
                Looks good
              </div>
            </div>
            <div className='form-group'>
              <label>Password</label>
              <input type='password' className='form-control' placeholder='password' />
            </div>
            <button type='submit' className='btn btn-info'>Submit</button>
          </form>
        </div>
      </div>
    )
  }
}
