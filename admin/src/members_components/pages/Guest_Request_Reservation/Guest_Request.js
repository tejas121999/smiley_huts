import React, { useState, useEffect } from 'react';
import '../../layout/css/request_reservation.css';
import john_doe from '../../layout/images/john-doe.jpg';
import ViewGuestModal from '../modal/ViewGuestModal';
import MessageModal from '../modal/MessageModal';
import Countdown, { zeroPad } from 'react-countdown';

import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const Guest_Request = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [modelOpen, setModelOpen] = useState(false);
  const [guestRequests, setGuestRequests] = useState([]);
  const [selectedGuestData, setSelectedGuestData] = useState({});
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [selectMessagedata, setselectMessagedata] = useState({});

  useEffect(() => {
    axios
      .post(
        process.env.REACT_APP_DEV_URL + '/api/booking/getGuestRequestsByUserId',
        { userId: localStorage.getItem('user-id') },
        {
          headers: {
            'x-auth-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDAwMDIwNX0.SvPTaaSc2IRLVlg8OrurDPmqkaNtZnI4DXmn31SmMP8`,
          },
        }
      )
      .then(res => {
        console.log('res------------', res.data.all_bookings);
        setGuestRequests(res.data.all_bookings);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const formatDate = dateVal => {
    let dateObj = new Date(dateVal);
    console.log('dateObj----------------', dateVal);
    const month = dateObj.toLocaleString('default', { month: 'short' });
    let day = dateObj.getDate();
    console.log('day----------------', day);
    if (day < 10) {
      day = '0' + day;
    }
    let dateStr = day + ' ' + month;
    return dateStr;
  };

  const handleRequestApproval = (bookingId, isApproved) => {
    axios
      .post(
        process.env.REACT_APP_DEV_URL +
          '/api/booking/approveDeclineBookingRequest',
        { bookingId: bookingId, isAccepted: isApproved },
        {
          headers: {
            'x-auth-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDAwMDIwNX0.SvPTaaSc2IRLVlg8OrurDPmqkaNtZnI4DXmn31SmMP8`,
          },
        }
      )
      .then(res => {
        axios
          .post(
            process.env.REACT_APP_DEV_URL +
              '/api/booking/getGuestRequestsByUserId',
            { userId: localStorage.getItem('user-id') },
            {
              headers: {
                'x-auth-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDAwMDIwNX0.SvPTaaSc2IRLVlg8OrurDPmqkaNtZnI4DXmn31SmMP8`,
              },
            }
          )
          .then(res => {
            setGuestRequests(res.data.all_bookings);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };

  const openModal = guestData => {
    setModelOpen(true);
    setSelectedGuestData(guestData);
  };

  const closeModal = () => setModelOpen(false);

  const OpenMessageModal = messageData => {
    setMessageModalOpen(true);
    setselectMessagedata(messageData);
  };

  const handleTimeOut = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      <span></span>;
      // const res = await axios.post(
      //   process.env.REACT_APP_DEV_URL +
      //     '/api/booking/approveDeclineBookingRequest',
      //   { bookingId: bookingId, isAccepted: isApproved },
      //   {
      //     headers: {
      //       'x-auth-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDAwMDIwNX0.SvPTaaSc2IRLVlg8OrurDPmqkaNtZnI4DXmn31SmMP8`,
      //     },
      //   }
      // );
      // console.log(res);
    } else {
      // Render a countdown
      return (
        <span>
          {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
        </span>
      );
    }
  };

  const closeMessageModal = () => setMessageModalOpen(false);

  return (
    <div className="Guest_Request">
      <ViewGuestModal
        show={modelOpen}
        onHide={closeModal}
        selectedGuestData={selectedGuestData}
        handleRequestApproval={handleRequestApproval}
      />
      <MessageModal
        show={messageModalOpen}
        setClose={closeMessageModal}
        onHide={closeMessageModal}
        selectMessagedata={selectMessagedata}
      />
      {guestRequests.map((guestReq, key) => (
        <div className="Guest_Request_main mb-1" key={key}>
          <div className="d-flex flex-column">
            <div className="d-flex space-between w-100">
              <div className="d-flex">
                <div className="mr-1">
                  <img src={john_doe} className="Reservation_img" />
                </div>
                <div className="d-flex flex-column">
                  <p className="Reservation_name m-0">
                    {guestReq.users.first_name} {guestReq.users.last_name}
                  </p>
                  {/* <p>{console.log()}</p> */}
                  {!guestReq.isAccepted && (
                    <Countdown
                      renderer={handleTimeOut}
                      date={
                        new Date(Date.parse(guestReq.createdAt)).getTime() +
                        86400000
                      }
                    />
                  )}
                  <p className="Reservation_number m-0">
                    {guestReq.users.contact_number}
                  </p>
                </div>
              </div>

              <div>
                <span className="Reservation_date">
                  {formatDate(guestReq.start_date)} -{' '}
                  {formatDate(guestReq.end_date)}{' '}
                </span>
              </div>
            </div>

            <hr style={{ height: '2px' }} />

            <div className="d-flex space-between">
              <div>
                <p
                  className="Viwe_Guest_Details_text pointer"
                  onClick={() => openModal(guestReq)}
                >
                  View Guest Details
                </p>
              </div>

              <div>
                <button
                  className="btn btn-light Message_Guest mr-1"
                  onClick={() => OpenMessageModal(guestReq)}
                >
                  Message Guest
                </button>
                <button
                  className="btn btn-outline-dark Decline_Guest mr-1"
                  disabled={
                    guestReq.isAccepted == true ||
                    guestReq.isAccepted === 3 ||
                    guestReq.isAccepted === 2
                  }
                  onClick={() => handleRequestApproval(guestReq.id, 3)}
                >
                  {guestReq.isAccepted == 3 && 'Declined'}
                  {guestReq.isAccepted == 2 && 'Cancelled'}
                  {guestReq.isAccepted == 1 && 'Decline'}
                  {guestReq.isAccepted == 4 && 'Decline'}
                  {!guestReq.isAccepted && 'Decline'}
                </button>
                <button
                  className="btn btn-green Accept_guest"
                  disabled={
                    guestReq.isAccepted == true ||
                    guestReq.isAccepted === 3 ||
                    guestReq.isAccepted === 2
                  }
                  onClick={() => handleRequestApproval(guestReq.id, 1)}
                >
                  {guestReq.isAccepted == true ? 'Accepted' : 'Accept'}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/*<div className='Guest_Request_main'>
                <img src={john_doe} className="Reservation_img" />
                <p className='Reservation_name'>Sample Name</p>
                <p className='Reservation_number'>101-202-303</p>
                <span className='Reservation_date'>29th Feb - 1st Mar</span>
                <hr style={{ height: "3px", width: "97%", position: "relative", bottom: "160px", left: "25px" }} />
                <p className='Viwe_Guest_Details_text' onClick={openModal}>Viwe Guest Details</p>
                <button className='btn btn-light Message_Guest' >Message Guest</button>
                &nbsp;
                <button className='btn btn-outline-dark Decline_Guest'>Decline</button>
                &nbsp;
                <button className='btn btn-dark Accept_guest'>Accept(24.49)</button>
            </div>
            <div className='Guest_Request_main'>
                <img src={john_doe} className="Reservation_img" />
                <p className='Reservation_name'>Sample Name</p>
                <p className='Reservation_number'>101-202-303</p>
                <span className='Reservation_date'>29th Feb - 1st Mar</span>
                <hr style={{ height: "3px", width: "97%", position: "relative", bottom: "160px", left: "25px" }} />
                <p className='Viwe_Guest_Details_text' onClick={openModal}>Viwe Guest Details</p>
                <button className='btn btn-light Message_Guest' >Message Guest</button>
                &nbsp;
                <button className='btn btn-outline-dark Decline_Guest'>Decline</button>
                &nbsp;
                <button className='btn btn-dark Accept_guest'>Accept(24.49)</button>
            </div>
            <div className='Guest_Request_main'>
                <img src={john_doe} className="Reservation_img" />
                <p className='Reservation_name'>Sample Name</p>
                <p className='Reservation_number'>101-202-303</p>
                <span className='Reservation_date'>29th Feb - 1st Mar</span>
                <hr style={{ height: "3px", width: "97%", position: "relative", bottom: "160px", left: "25px" }} />
                <p className='Viwe_Guest_Details_text' onClick={openModal}>Viwe Guest Details</p>
                <button className='btn btn-light Message_Guest'>Message Guest</button>
                &nbsp;
                <button className='btn btn-outline-dark Decline_Guest'>Decline</button>
                &nbsp;
                <button className='btn btn-dark Accept_guest'>Accept(24.49)</button>
            </div>
            <div className='Guest_Request_main'>
                <img src={john_doe} className="Reservation_img" />
                <p className='Reservation_name'>Sample Name</p>
                <p className='Reservation_number'>101-202-303</p>
                <span className='Reservation_date'>29th Feb - 1st Mar</span>
                <hr style={{ height: "3px", width: "97%", position: "relative", bottom: "160px", left: "25px" }} />
                <p className='Viwe_Guest_Details_text' onClick={openModal}>Viwe Guest Details</p>
                <button className='btn btn-light Message_Guest'>Message Guest</button>
                &nbsp;
                <button className='btn btn-outline-dark Decline_Guest'>Decline</button>
                &nbsp;
                <button className='btn btn-dark Accept_guest'>Accept(24.49)</button>
            </div>*/}
    </div>
  );
};

export default Guest_Request;
