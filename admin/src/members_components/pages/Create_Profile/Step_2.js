import React from 'react'
import homeImg from "../../layout/images/homeImg.png"

const Step_2 = () => {
    return (
        <div className='row Step_2_row'>
            <div className='col-12'>
                <select className="form-select Property_Type" aria-label="Default select example">
                    <option selected>Property Type</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
            </div>
            <div className='col-12'>
                <input className='form-control Property_Address' placeholder='Property Address' />
            </div>
            <div className='col-6'>
                <input className='form-control Street_Name' placeholder='Street Name' />
            </div>
            <div className='col-6'>
                <input className='form-control Pincode' placeholder='Pincode' />
            </div>
            <div className='col-12'>
                <input className='form-control Landmark' placeholder='Landmark' />
            </div>
            <div className='col-12'>
                <img src={homeImg} className="home_img_create_profile"/>
                
            </div>
        </div>
    )
}

export default Step_2