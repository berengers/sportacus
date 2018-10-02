import React from 'react'
import { connect } from 'react-redux'

import '../../css/userPage.scss'
import NavBar from './navbar'

class UserPage extends React.Component{
  constructor(props){
    super(props)
    console.log ("props ---> ", props)
  }
  render(){
    return (
      <React.Fragment>
        <NavBar />

        <div className='row no-gutters' id="userPage">

        <div className='col-sm-3 bg-light p-3 pt-4 border-right berenger'>
        <h4 className='text-center text-light bg-dark p-2' data-toggle='collapse' data-target='#programs'>Programs</h4>
        <div className='btn-group-vertical w-100 mt-3' id='programs'>
        <div className='btn btn-light text-truncate'>List 1</div>
        <div className='btn btn-light border-op text-truncate'>List 1 bonjour madame</div>
        <div className='btn btn-light border-op text-truncate'>List 2</div>
        <div className='btn btn-light border-op text-truncate'>List 1</div>
        <div className='btn btn-light border-op text-truncate'>List 1</div>
        <div className='btn btn-light border-op text-truncate'>List 1</div>
        <div className='btn btn-light border-op text-truncate'>List 1</div>
        <div className='btn btn-light border-op text-truncate'>List 1</div>
        <div className='btn btn-light border-op text-truncate'>List 1</div>
        </div>
        </div>

        <div className='col-sm-9'>

        </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    firstReducer: state.firstReducer
  }
}

export default connect(mapStateToProps)(UserPage)
