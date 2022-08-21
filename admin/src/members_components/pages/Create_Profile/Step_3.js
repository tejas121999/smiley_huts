import React from 'react'

const Step_3 = () => {
  return (
    <div className='row Step_3_row'>
      <div className='col-12'>
        <select className="form-select Property_Type" aria-label="Default select example">
          <option selected>Do You Have Pet At The Property</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <div className='col-12'>
        <input className='form-control Property_Address' placeholder='Numbers Of Famaly Members?' />
      </div>
      <div className='row add_members'>
        <div className='col-5'>
          <input className='form-control Street_Name' placeholder='Name' />
        </div>
        <div className='col-5'>
          <input className='form-control Street_Name' placeholder='Relation' />
        </div>
        <div className='col-2'>
          <button className='btn btn-dark Add_img'>Add Img</button>
        </div>
      </div>
      <div className='col-12'>
        <button className='btn btn-light Add_members'>+ Add Members</button>
      </div>
    </div>
  )
}

export default Step_3