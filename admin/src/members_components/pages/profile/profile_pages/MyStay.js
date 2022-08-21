import React, { useState, useEffect } from 'react';
import BookModal from '../../../../components/pages/Modal/bookModal';
import '../../../layout/css/myStay.css';
import jhon_doe from '../../../layout/images/john-doe.jpg';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import EditMyStayModal from '../../modal/EditMyStayModal';
import Countdown, { zeroPad } from 'react-countdown';

const MyStay = ({ reviews }) => {
  const navigate = useNavigate();
  const [myStays, setMyStays] = useState([]);
  const [bookModal, setBookModal] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [selectedGuestData, setSelectedGuestData] = useState({});

  const [selectedBooking, setSelectedBooking] = useState();
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
  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_DEV_URL +
        '/api/booking/getuserIdInReservation/' +
        localStorage.getItem('user-id'),
        {
          headers: {
            'x-auth-token': localStorage.getItem('access-token'),
          },
        }
      )
      .then(res => {
        setMyStays(res.data.userData);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  console.log(myStays);

  const formatDate = dateVal => {
    let dateObj = new Date(dateVal);
    const month = dateObj.toLocaleString('default', { month: 'short' });
    let day = dateObj.getDate();
    if (day < 10) {
      day = '0' + day;
    }
    let dateStr = day + ' ' + month;
    return dateStr;
  };

  const openModal = guestData => {
    setModelOpen(true);
    setSelectedGuestData(guestData);
  };

  const handleSeeDetails = property => {
    navigate('/homeStayDetail', { state: property.propId, replace: true });
    window.scrollTo(0, 0);
  };

  const closeModal = () => setModelOpen(false);

  return (
    <div className="myStay">
      {myStays.map((stay, idx) => (
        <>
          <BookModal
            show={bookModal}
            onHide={() => setBookModal(false)}
            details={stay}
          />
          <EditMyStayModal
            show={modelOpen}
            onHide={closeModal}
            // booking={selectedBooking}
            selectedGuestData={selectedGuestData}
          />
          <div className="my-stay-card mb-1_5" key={idx}>
            <div className="item d-flex space-between">
              <div className="d-flex">
                <div className="">
                  <img src={jhon_doe} className="stay_profie_img" />
                </div>
                <div className="d-flex flex-column justify-center ml-1">
                  <span className="stay_profile">
                    {stay.propId?.users?.first_name}
                    &nbsp;
                    {stay.propId?.users?.last_name}
                  </span>
                  <span className="Stay_host">Host</span>
                </div>
              </div>

              <div className="d-flex flex-column">
                <div className="text-end">
                  <span className="completde">
                    {/* {stay.stay_completed == true ? "Completed" : "Incomplete"} */}
                    {!stay.isAccepted && <span>Incomplete</span>}
                    {stay.isAccepted === true && <span>Completed</span>}
                    {stay.isAccepted === 2 && <span>Cancelled</span>}
                    {stay.isAccepted === 3 && <span>Declined</span>}
                    {stay.isAccepted === 4 && <span>Completed</span>}
                  </span>
                  {/*<button className='completde btn btn-success'>Completed</button>*/}
                </div>
                <div>
                  <span className="Stay_date">
                    {!stay.isAccepted && (
                      <button
                        type="button"
                        class="btn btn-primary btn-sm"
                        onClick={() => {
                          setSelectedBooking(stay);
                          openModal(stay);
                        }}
                      >
                        Edit
                      </button>
                    )}
                    {formatDate(stay.start_date)} - {formatDate(stay.end_date)}
                  </span>
                </div>
              </div>
            </div>

            <hr style={{ width: '100%', height: '3px' }} />

            <div className="d-flex space-between">
              <div>
                <span
                  onClick={() => reviews('Reviews and Ratings')}
                  className="view_my_reating pointer"
                >
                  View My Rating
                </span>
              </div>
              <div>
                {stay.isAccepted === 4 && (
                  <button
                    className="btn btn-outline-dark view_HomeSaty"
                    onClick={() => handleSeeDetails(stay)}
                  >
                    <Countdown
                      renderer={handleTimeOut}
                      date={
                        new Date(Date.parse(stay.createdAt)).getTime() +
                        43200000
                      }
                    />
                  </button>
                )}
                <button
                  className="btn btn-outline-dark view_HomeSaty"
                  onClick={() => handleSeeDetails(stay)}
                >
                  View Homestay
                </button>
                <button
                  onClick={() => setBookModal(true)}
                  className="btn btn-dark Book_again"
                >
                  Book Again
                </button>
              </div>
            </div>
          </div>
          <div className='mobile-view-my-stay-card'>
            <div className='my-stay-div'>
              <div className='my-stay-div-one'>
                &nbsp;
                <div className='my-stay-img-name'>
                  <img src={jhon_doe} className="stay_profie_img" />
                </div>
                <div style={{ textAlign: "inherit" }}>
                  <span className="stay_profile">
                    {stay.propId?.users?.first_name}
                    &nbsp;
                    {stay.propId?.users?.last_name}
                  </span>
                  <br />
                  <span className="Stay_host">Host</span>
                </div>

                <div className="text-end">
                  <span className="completde">
                    {/* {stay.stay_completed == true ? "Completed" : "Incomplete"} */}
                    {!stay.isAccepted && <span>Incomplete</span>}
                    {stay.isAccepted === true && <span>Completed</span>}
                    {stay.isAccepted === 2 && <span>Cancelled</span>}
                    {stay.isAccepted === 3 && <span>Declined</span>}
                    {stay.isAccepted === 4 && <span>Completed</span>}
                  </span>
                  {/*<button className='completde btn btn-success'>Completed</button>*/}
                </div>
                &nbsp;
              </div>
              <div>
                <div className="d-flex flex-column">

                  <div>
                    <span className="Stay_date">
                      {!stay.isAccepted && (
                        <i class="fas fa-edit"
                          onClick={() => {
                            setSelectedBooking(stay);
                            openModal(stay);
                          }}></i>
                        // <button
                        //   type="button"
                        //   class="btn btn-primary btn-sm"
                        //   onClick={() => {
                        //     setSelectedBooking(stay);
                        //     openModal(stay);
                        //   }}
                        // >
                        //   Edit
                        // </button>
                      )}
                      &nbsp;
                      <>
                        {formatDate(stay.start_date)} - {formatDate(stay.end_date)}
                      </>
                      &nbsp;
                      &nbsp;
                    </span>

                  </div>
                </div>
              </div>
              <hr style={{ width: '100%', height: '3px' }} />

              <div>
                <div className="">
                  <div>
                    <span
                      onClick={() => reviews('Reviews and Ratings')}
                      className="view_my_reating pointer"
                    >
                      View My Rating
                    </span>
                  </div>
                  <div className='bottom_button'>
                    {stay.isAccepted === 4 && (
                      <button
                        className="btn btn-outline-dark view_HomeSaty"
                        onClick={() => handleSeeDetails(stay)}
                      >
                        <Countdown
                          renderer={handleTimeOut}
                          date={
                            new Date(Date.parse(stay.createdAt)).getTime() +
                            43200000
                          }
                        />
                      </button>
                    )}
                    <button
                      className="btn btn-outline-dark view_HomeSaty"
                      onClick={() => handleSeeDetails(stay)}
                    >
                      View Homestay
                    </button>
                    &nbsp;
                    <button
                      onClick={() => setBookModal(true)}
                      className="btn btn-dark Book_again"
                    >
                      Book Again
                    </button>

                  </div>
                </div>
              </div>
            </div>

          </div>
        </>
      ))}

      {/*<div className='item'>
                <img src={jhon_doe} className="stay_profie_img" />
                <span className='stay_profile'>John Doe</span>
                <span className='Stay_host'>Host</span>
                <button className='completde btn btn-success'>Completed</button>
                <span className='Stay_date'>29th Feb - 1st Mar</span>
                <hr style={{ width: "95%", height: "3px", position: "relative", left: "30px", top: "45px" }} />
                <span className='view_my_reating'>View My Rating</span>
                <div className='btn_class'>
                    <button className='btn btn-outline-dark view_HomeSaty'>View Homestay</button>
                    <button className='btn btn-dark Book_again'>Book Again</button>
                </div>
            </div>
            <div className='item'>
                <img src={jhon_doe} className="stay_profie_img" />
                <span className='stay_profile'>John Doe</span>
                <span className='Stay_host'>Host</span>
                <button className='completde btn btn-success'>Completed</button>
                <span className='Stay_date'>29th Feb - 1st Mar</span>
                <hr style={{ width: "95%", height: "3px", position: "relative", left: "30px", top: "45px" }} />
                <span className='view_my_reating'>View My Rating</span>
                <div className='btn_class'>
                    <button className='btn btn-outline-dark view_HomeSaty'>View Homestay</button>
                    <button className='btn btn-dark Book_again'>Book Again</button>
                </div>
            </div>*/}
    </div>
  );
};

export default MyStay;
