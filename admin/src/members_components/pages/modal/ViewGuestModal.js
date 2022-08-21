import React from 'react'
import { Modal } from "react-bootstrap";
import "../../layout/css/request_reservation.css"
import john_doe from "../../layout/images/john-doe.jpg"
import home from "../../layout/images/home.png"
import phone from "../../layout/images/phone.png"
import location from "../../layout/images/location.png"

const ViewGuestModal = (props) => {
    console.log("props------------",props.selectedGuestData);

    const formatDate = (dateVal) => {
        let dateObj = new Date(dateVal);
        const month = dateObj.toLocaleString('default', { month: 'short' });
        let day = dateObj.getDay();
        if(day < 10) {
            day = '0' + day;
        }
        let dateStr = day + " " + month;
        return dateStr;
    }

    return (
        <div>
            <Modal
                centered
                show={props.show}
                onHide={props.onHide}
                keyboard={false}
                className="guest_booking_modal"
            >
                <Modal.Body>
                    <div className='guest_booking_body p-1'>
                        <div className='request_reservation_top d-flex space-between'>
                            <div className="d-flex">
                                <div>
                                    <img src={john_doe} className="guest_req_img" />
                                </div>
                                <div className="d-flex flex-column ml-1 justify-center">
                                    <span className='Location_class'>{props.selectedGuestData.users?.address}</span>
                                    <span className='guest_req_name'>{props.selectedGuestData.users?.first_name} {props.selectedGuestData.users?.last_name}</span>
                                </div>
                            </div>

                            <div className="d-flex flex-column align-end justify-center">
                                <span className='guest_req_text'>Booking Request For</span>
                                <span className='guest_req_date'>{formatDate(props.selectedGuestData.start_date)} - {formatDate(props.selectedGuestData.end_date)}</span>
                            </div>
                        </div>

                        <hr style={{ width: "100%", height: "2px" }} />

                        <div className='request_reservation_midd'>
                            <div className=''>
                                <div className="d-flex space-between mb-1">
                                    <div className="d-flex w-100"> 
                                        <div>
                                            <img src={home} className="home_img" />
                                        </div>
                                        <div className="d-flex flex-column ml-1 justify-center">
                                            <span className='Property_type'>Property /Type</span>
                                            <span className='Bunglow'>{props.selectedGuestData.propId?.street_name}</span>
                                        </div>
                                    </div>

                                    <div className='w-100 border-left pl-1'>
                                        <span className="prop_add">Property Address</span>
                                        <br />
                                        <span className='prop_add_text'>{props.selectedGuestData.propId?.prop_address}</span>
                                    </div>
                                </div>

                                <div className="d-flex space-between mb-1"> 
                                    <div className="d-flex w-100">
                                        <div>
                                            <img src={phone} className="phone_img" />
                                        </div>
                                        <div className="d-flex flex-column ml-1 justify-center">
                                            <span className='contact_reserv_number'>Contact / Number</span>
                                            <span className='number_reserv'>{props.selectedGuestData.users?.contact_number}</span>
                                        </div>
                                    </div>

                                    <div className='w-100 border-left pl-1'>
                                        <span className='email_address'>Email Address</span>
                                        <br />
                                        <span className='email_add_text'>{props.selectedGuestData.users?.email}</span>
                                    </div>
                                </div>

                                <div className="d-flex space-between mb-1">
                                    <div className="d-flex w-100">
                                        <div>
                                            <img src={location} className="location_img" />
                                        </div>
                                        <div className="d-flex flex-column ml-1 justify-center">
                                            <span className='street_code'>Street / Pincode</span>
                                            <span className='street_code_text'>{props.selectedGuestData.propId?.street_name} / {props.selectedGuestData.propId?.pincode}</span>
                                        </div>
                                    </div>

                                    <div className='w-100 border-left pl-1'>
                                        <span className='landmark_reserv'>Landmark</span>
                                        <br />
                                        <span className='landmark_reserv_text'>{props.selectedGuestData.propId?.landmark}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <hr style={{ width: "100%", height: "2px" }} />

                        <div className='request_reservation_bottom w-100 text-end'>
                            <button className='btn btn-light Message_reserv mr-1'>Message Guest</button>

                            {
                                    props.selectedGuestData.isAccepted == true ? 
                                    <button className='btn btn-outline-dark decline_reserv mr-1' onClick={()=>{props.handleRequestApproval(props.selectedGuestData.id,0); props.onHide()}}>Decline</button> : 
                                    <button className='btn btn-outline-dark decline_reserv mr-1' disabled>Decline</button>
                            }

                            {
                                    props.selectedGuestData.isAccepted == true ?
                                    <button className='btn btn-green Accept_reserv' disabled>Accepted</button> :
                                    <button className='btn btn-green Accept_reserv' onClick={()=>{props.handleRequestApproval(props.selectedGuestData.id,1); props.onHide()}}>Accept</button>
                        }
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ViewGuestModal