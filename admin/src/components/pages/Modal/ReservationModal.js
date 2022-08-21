import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import './reservationmodal.css';
import DummyImg from '../../layout/images/dummy-img-man.png';
import homeImg from '../../layout/images/home-removebg-preview.png';
import pin from '../../layout/images/location.png';
import phone from '../../layout/images/phone.png';
import home from '../../../members_components/layout/images/home.png';
import axios from 'axios';

const ReservationModal = props => {
  const [mod, setmod] = useState([]);
  console.log('props are......', props.onModal);

  return (
    <>
      {props.onModal && (
        <Modal
          className="reservation_modal_main"
          centered
          show={props.show}
          onHide={props.onHide}
          keyboard={false}
          // className="reservationModal"
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <div className="reservation_header">
              <img
                src={
                  // props.user.user_img
                  //   ? process.env.REACT_APP_DEV_URL +
                  //     '/profile_images' +
                  //     props.user.user_img
                  // :
                  DummyImg
                }
                alt=""
              />
              <div>
                <p style={{ color: 'gray', fontSize: '16px' }}>
                  {props.onModal?.propId?.prop_address}
                </p>
                <p style={{ fontSize: '20px', fontWeight: 'bold' }}>
                  {props.onModal?.users?.first_name +
                    ' ' +
                    props.onModal?.users?.last_name}
                </p>
              </div>
            </div>
            <div className="user_details">
              <div className="left">
                <div className="prop_cont">
                  <img src={home} alt="" />
                  <div>
                    <p>property type</p>
                    <span>{props.onModal?.propId?.prop_type}</span>
                  </div>
                </div>
                <div className="prop_cont">
                  <img src={phone} alt="" />
                  <div>
                    <p>Contact Number</p>
                    <span>{props.onModal?.users?.contact_number}</span>
                  </div>
                </div>
                <div className="prop_cont">
                  <img src={pin} alt="" />
                  <div>
                    <p>Pincode</p>
                    <span>{props.onModal?.propId?.pincode}</span>
                  </div>
                </div>
              </div>
              <div className="right">
                <div className="prop_cont">
                  <div>
                    <p>property Address</p>
                    <span>{props.onModal?.propId?.prop_address}</span>
                  </div>
                </div>
                <div className="prop_cont">
                  <div>
                    <p>Email Addresss</p>
                    <span>{props.onModal?.users?.email}</span>
                  </div>
                </div>
                <div className="prop_cont">
                  <div>
                    <p>Landmark</p>
                    <span>{props.onModal?.propId?.landmark}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="reservation_header">
              <img
                src={
                  // props.user.user_img
                  //   ? process.env.REACT_APP_DEV_URL +
                  //     '/profile_images' +
                  //     props.user.user_img
                  // :
                  DummyImg
                }
                alt=""
              />
              <div>
                <p style={{ color: 'gray', fontSize: '16px' }}>Hosted By</p>
                <p style={{ fontSize: '20px', fontWeight: 'bold' }}>
                  {props.onModal?.propId?.users.first_name +
                    ' ' +
                    props.onModal?.propId?.users.last_name}
                </p>
              </div>
            </div>
            <div className="user_details">
              <div className="left">
                <div className="prop_cont">
                  <img src={home} alt="" />
                  <div>
                    <p>property type</p>
                    <span>{props.onModal?.propId?.prop_type}</span>
                  </div>
                </div>
                <div className="prop_cont">
                  <img src={phone} alt="" />
                  <div>
                    <p>Contact Number</p>
                    <span>{props.onModal?.propId?.users.contact_number}</span>
                  </div>
                </div>
                <div className="prop_cont">
                  <img src={pin} alt="" />
                  <div>
                    <p>Pincode</p>
                    <span>{props.onModal?.propId?.pincode}</span>
                  </div>
                </div>
              </div>
              <div className="right">
                <div className="prop_cont">
                  <div>
                    <p>property Address</p>
                    <span>{props.onModal?.propId?.prop_address}</span>
                  </div>
                </div>
                <div className="prop_cont">
                  <div>
                    <p>Email Addresss</p>
                    <span>{props.onModal?.propId?.users.email}</span>
                  </div>
                </div>
                <div className="prop_cont">
                  <div>
                    <p>Landmark</p>
                    <span>{props.onModal?.propId?.landmark}</span>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default ReservationModal;

{
  /* <div>
        <div className="image_sec">
          <div style={{ display: 'flex' }}>
            <img src={DummyImg} alt="" />
            <div>
              <p style={{ margin: 0, fontSize: '24px' }}>Location</p>
              <p style={{ fontSize: '34px', fontWeight: 'bold' }}>
                <span> {props.onModal?.users?.first_name}</span>{' '}
                <span>{props.onModal?.users?.last_name}</span>
              </p>
            </div>
          </div>
          <div>
            <p>Booking request For</p>
            <span style={{ fontSize: '25px', fontWeight: '600' }}>
              {props.onModal?.start_date}
            </span>
          </div>
        </div>
</div>*/
}

// <div className="detailsTopSection">
// <div className="location">
//   <img src={props.onModal?.users?.user_img} className="avatar" />
//   <span style={{ color: 'gray', fontSize: '15px' }}>
//     {props.onModal?.users?.address}
//   </span>
//   <br />
//   <span style={{ fontSize: '25px', fontWeight: '600' }}>
//     {props.onModal?.users?.first_name}
//     {props.onModal?.users?.last_name}
//   </span>
// </div>
// <div className="request">
//   <span
//     style={{
//       color: 'gray',

//       fontSize: '15px',
//     }}
//   >
//     Booking Request From
//   </span>
//   <br />
//   <span style={{ fontSize: '25px', fontWeight: '600' }}>
//     {props.onModal?.start_date}
//   </span>
// </div>
// <hr
//   style={{
//     height: '2px',

//     width: '700px',
//   }}
// />
// </div>
// <div className="row ">
// <div className="col-6 bookingRequest">
//   <div className="row" style={{}}>
//     <div className="propertyType col-12">
//       <img src={homeImg} className="homeImage" />
//       <span style={{}}>Property Type</span>
//       <br />
//       <span style={{}}>Bunglow</span>
//     </div>
//     <div className="propertyType col-12">
//       <img src={phone} className="homeImage" />
//       <span style={{}}>Contact Number</span>
//       <br />
//       <span style={{}}>{props.onModal?.users?.contact_number}</span>
//     </div>
//     <div className="propertyType col-12">
//       <img src={location} className="homeImage" />
//       <span style={{}}>Street/Pincode</span>
//       <br />
//       <span style={{}}>{props.onModal?.users?.address}</span>
//     </div>
//   </div>
// </div>
// <div className="col-6 bookingRequest">
//   <div className="row">
//     <div className="propertyType col-12">
//       <span
//         style={{
//           color: 'black',
//           fontWeight: 'bold',
//         }}
//       >
//         Property Address
//       </span>
//       <br />
//       <span
//         style={{
//           color: 'gray',
//         }}
//       >
//         421202 Merivale Road, Kanata, Ontarrio
//       </span>
//     </div>
//     <div className="propertyType col-12">
//       <span
//         style={{
//           color: 'black',
//           fontWeight: 'bold',
//         }}
//       >
//         Email Address
//       </span>
//       <br />
//       <span
//         style={{
//           color: 'gray',
//         }}
//       >
//         {props.onModal?.users?.email}
//       </span>
//     </div>
//     <div className="propertyType col-12">
//       <span
//         style={{
//           color: 'black',
//           fontWeight: 'bold',
//         }}
//       >
//         Landmark
//       </span>
//       <br />
//       <span
//         style={{
//           color: 'gray',
//         }}
//       >
//         {props.onModal?.users?.address}
//       </span>
//     </div>
//   </div>
// </div>
// </div>
// <hr
// style={{
//   height: '2px',

//   width: '700px',
//   left: '115px',
// }}
// />
// <div className="approveRequest">
// <div className="location">
//   <img
//     src={props.onModal?.propId?.users?.user_img}
//     className="avatar"
//   />
//   <span
//     style={{
//       color: 'gray',

//       fontSize: '15px',
//     }}
//   >
//     Hosted By
//   </span>
//   <br />
//   <span
//     style={{
//       fontSize: '25px',
//       fontWeight: '600',
//     }}
//   >
//     {props.onModal?.propId?.users?.address}
//   </span>
// </div>
// <div className="request">
//   <span
//     style={{
//       color: 'gray',

//       fontSize: '15px',
//     }}
//   >
//     Request On Action
//   </span>
//   <br />
//   <span style={{ fontSize: '25px', fontWeight: '600' }}>
//     {props.onModal?.propId?.users?.isApproved}
//   </span>
// </div>
// <hr
//   style={{
//     height: '2px',

//     width: '700px',
//   }}
// />
// </div>
// <div className="row" style={{}}>
// <div className="col-6 bookingRequest">
//   <div className="row" style={{}}>
//     <div className="propertyType col-12">
//       <img src={homeImg} className="homeImage" />
//       <span>Property Type</span>
//       <br />
//       <span>{props.onModal?.propId?.prop_type}</span>
//     </div>
//     <div className="propertyType col-12">
//       <img src={phone} className="homeImage" />
//       <span>Contact Number</span>
//       <br />
//       <span>{props.onModal?.propId?.users?.contact_number}</span>
//     </div>
//     <div className="propertyType col-12">
//       <img src={location} className="homeImage" />
//       <span>Street/Pincode</span>
//       <br />
//       <span>
//         {props.onModal?.propId?.street_name}/
//         {props.onModal?.propId?.pincode}
//       </span>
//     </div>
//   </div>
// </div>
// <div className="col-6 bookingRequest">
//   <div className="row">
//     <div className="propertyType col-12">
//       <span
//         style={{
//           color: 'black',
//           fontWeight: 'bold',
//         }}
//       >
//         Property Address
//       </span>
//       <br />
//       <span
//         style={{
//           color: 'gray',
//         }}
//       >
//         {props.onModal?.propId?.prop_address}
//       </span>
//     </div>
//     <div className="propertyType col-12">
//       <span
//         style={{
//           color: 'black',
//           fontWeight: 'bold',
//         }}
//       >
//         Email Address
//       </span>
//       <br />
//       <span
//         style={{
//           color: 'gray',
//         }}
//       >
//         {props.onModal?.propId?.users?.email}
//       </span>
//     </div>
//     <div className="propertyType col-12">
//       <span
//         style={{
//           color: 'black',
//           fontWeight: 'bold',
//         }}
//       >
//         Landmark
//       </span>
//       <br />
//       <span
//         style={{
//           color: 'gray',
//         }}
//       >
//         {props.onModal?.propId?.landmark}
//       </span>
//     </div>
//   </div>
// </div>
// </div>
