import React from 'react'

import '../../css/app.scss'

export default class ProgramEditor extends React.Component{
  constructor(props){
    super(props)
  }
  render(){

    return(
      <div className='row no-gutters' id="program_editor">
        <div className='col-sm-3 bg-light p-3 pt-4 border-right'>
          <h4 className='text-center text-light bg-dark p-2' data-toggle='collapse' data-target='#exercices'>Exercices</h4>
          <div className='btn-group-vertical w-100 mt-3' id='exercices'>



          </div>
        </div>

        <div className='col-sm-9 mr-auto text-center'>
          <h2>PROGRAM EDITOR</h2>
        </div>
      </div>
    )
  }
}
