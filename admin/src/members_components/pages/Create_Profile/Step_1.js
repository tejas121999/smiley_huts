import React from 'react'
import DropzoneComponrnt from "../../layout/DropzoneComponent"

const Step_1 = () => {
  return (
    <div className='row step_1_row'>
      <div className='col-6'>
        <input className='form-control First_Name' placeholder='First Name' />
      </div>
      <div className='col-6'>
        <input className='form-control Last_Name' placeholder='Last Name' />
      </div>
      <div className='col-8'>
        <textarea className='form-control Residental_Address' rows={5} placeholder='Residental Address' />
      </div>
      <div className='col-4 img_uplod'>
        <DropzoneComponrnt />
      </div>
      <div className='col-12'>
        <input className='form-control Contact_Number' placeholder='Contact Number' />
      </div>
      <div className='col-12'>
        <input className='form-control proof' placeholder='Identification Details / Proof'/>
      </div>
    </div>
  )
}

export default Step_1