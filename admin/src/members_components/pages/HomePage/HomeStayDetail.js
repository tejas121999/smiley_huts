import { Avatar } from '@mui/material';
import React, { useState, useEffect } from 'react';
import HomeDetailsSlider from '../../../components/HomeDetailsSlider';
import '../../layout/css/homeStay.css';
import homeImg from '../../layout/images/homeImg.png';
import dummyImg from '../../layout/images/dummy_img.png';
import mapIcon from '../../layout/images/SMILEY HUTS USER SIDE ICONS AND IMAGES/Group 4810.png';
import Home from '../../layout/images/home.png';
import phone from '../../layout/images/phone.png';
import location from '../../layout/images/location.png';
import jhon_doe from '../../layout/images/john-doe.jpg';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import ReactStars from 'react-rating-stars-component';
import MapLocationModal from './MapLocationModal';
import ImageModal from '../../../components/pages/Modal/ImageModal';
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import { useRef } from 'react';
import PaypalModal from '../PaypalModal';
import PaypalHostModel from "../PaypalHostModel"

const HomeStayDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [next, setNext] = useState(1);
  const [allReviews, setAllReviews] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [openModal, setOpenModal] = useState(false);
  const [familyMembers, setFamilyMembers] = useState();
  const [personal, setPersonal] = useState();
  const token = localStorage.getItem('access-token');
  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);
  const [isSubscribe, setIsSubscribe] = useState()
  const [imageModal, setImageModal] = useState(false);

  const [paypalModal, setPaypalModal] = useState(false);
  const [PaypalisHostModel, setPaypalHostModel] = useState(false)

  const isUserActive = JSON.parse(localStorage.getItem('user_data')).isActive;
  console.log("isUserActive", isUserActive);


  console.log("location.state.users", location);

  const prop_imgs = JSON.parse(location.state.pro_img);
  // const user_img = JSON.parse(location?.state?.users?.user_img)
  const prop_lenght = 1;
  // console.log("==============", user_img);

  useEffect(() => {
    const getUserDetails = async () => {
      const id = {
        userId: localStorage.getItem('user-id'),
      };
      const res = await axios.post(
        process.env.REACT_APP_DEV_URL + '/api/auth/getUserProfile',
        id,
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );
      // console.log(res.data);
      setPersonal(res.data.userProfile)

    };
    getUserDetails();
  }, []);
  useEffect(() => {
    // window.scrollTo(0, 0)
    const today = new Date();
    const date = today.setDate(today.getDate());
    const defaultValue = new Date(date).toISOString().split('T')[0]; // yyyy-mm-dd
    console.log('DefDate-------', defaultValue);
    setStartDate(defaultValue);
    setEndDate(defaultValue);

    axios
      .get(
        process.env.REACT_APP_DEV_URL +
        '/api/property/' +
        Object.values(location)[3].id,
        {
          headers: {
            'x-auth-token': localStorage.getItem('access-token'),
          },
        }
      )
      .then(res => {
        setAllReviews(res.data.getAllReviews);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const nextStape = () => {
    setNext(next + 1);
  };

  const prevStape = () => {
    setNext(next - 1);
  };

  const currency = 'USD';

  const get_user_sub = async () => {
    const res = await
      axios
        .get(
          process.env.REACT_APP_DEV_URL
          + '/api/subscription/check-user-subscribe/'
          + localStorage.getItem('user-id'), {
          headers: {
            'x-auth-token': localStorage.getItem("access-token"),
          },
        }).then(res => {
          setIsSubscribe(res.status)
        })
  }

  useEffect(() => { get_user_sub() }, [])

  const bookProperty = async () => {

    var sub_end_date = new Date(personal?.subscription_end_date)
    var bookingDate = new Date(startDate)


    try {
      await axios.post(
        process.env.REACT_APP_DEV_URL + '/api/booking/checkBookings',
        {
          booking_user_id: localStorage.getItem('user-id'),
          property_id: Object.values(location)[3].id,
          start_date: startDate,
          end_date: endDate,
        },
        {
          headers: {
            'x-auth-token': localStorage.getItem('access-token'),
          },
        }
      ).then(res => {
        console.log("location.state.isHosted", typeof localStorage.getItem('isHosted'))
        if (sub_end_date.getTime() < bookingDate.getTime()) {
          alert("your subscription is over")
          setPaypalModal(true)
        } else if (localStorage.getItem('isHosted') === "false") {
          setPaypalHostModel(true)
        } else {
          axios
            .post(
              process.env.REACT_APP_DEV_URL + '/api/booking/addRequest',
              {
                booking_user_id: localStorage.getItem('user-id'),
                property_id: Object.values(location)[3].id,
                start_date: startDate,
                end_date: endDate,
                property_name: location.state.prop_address,
                owner_id: location.state.user_id,
                booked_user_name: JSON.parse(localStorage.getItem('user_data'))
                  .first_name,

              },
              {
                headers: {
                  'x-auth-token': localStorage.getItem('access-token'),
                },
              }
            )
            .then(res => {
              alert('Booking Complete!!');
              // setAllReviews(res.data.getAllReviews);
            })
            .catch(err => {
              alert(err.response.data);
            });
        }
      })
    } catch (err) {
      console.log(err.response.data);
      alert(err.response.data);
    }
  }

  const handleStartDateChange = e => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = e => {
    setEndDate(e.target.value);
  };

  const paymentRef = useRef(null);
  const setPayment = () => {
    paymentRef.current.click();
  };

  useEffect(() => {
    const getUserDetails = async () => {
      const id = {
        userId: location.state.user_id,
      };
      const res = await axios.post(
        process.env.REACT_APP_DEV_URL + '/api/auth/getUserProfile',
        id,
        {
          headers: {
            'x-auth-token':
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDA2MzI3N30.m2a26rvLm1yMErLovWMeZQhcQXlTrQOEdangNw-E3Ss',
          },
        }
      );
      console.log("res.data.familyData", res.data.familyData)
      setFamilyMembers(res.data.familyData);
    };
    getUserDetails();
  }, []);

  return (
    <div className="home_Stay_detail">
      <PaypalModal
        stayBooking={bookProperty}
        show={paypalModal}
        onHide={() => setPaypalModal(false)}
      />
      <PaypalHostModel
        stayBooking={bookProperty}
        show={PaypalisHostModel}
        onHide={() => setPaypalHostModel(false)}
      />
      <ImageModal
        show={imageModal}
        onHide={() => setImageModal(false)}
        images={prop_imgs}
      />
      <MapLocationModal
        searchProperties={[location.state]}
        show={openModal}
        onHide={handleModalClose}
      />
      <div className="home-details-images">
        <div
          className="home-details-images-left"
          style={{ marginRight: '10px' }}
        >
          {/* <img src={process.env.REACT_APP_DEV_URL + '/' + prop_imgs[0]} /> */}
        </div>
        {prop_imgs?.length > 1 && (
          <div className="home-details-images-right">
            <div className="second_img">
              <img src={process.env.REACT_APP_DEV_URL + '/' + prop_imgs[1]} />
            </div>

            {prop_imgs[2] && (
              <div className="last_img" onClick={() => setImageModal(true)}>
                <span className="more-images-length">
                  {prop_imgs?.length - 2 + '+'}
                </span>

                <img src={process.env.REACT_APP_DEV_URL + '/' + prop_imgs[2]} />
              </div>
            )}
          </div>
        )}
      </div>
      <div className="details_reviews">
        <div className="homeStay_owner_detail p-1">
          <div className="owner_details_head w-100">
            <div className="w-100 d-flex">
              <div>
                <img src={personal?.user_img
                  ? process.env.REACT_APP_DEV_URL +
                  '/profile_images/' +
                  personal?.user_img
                  : dummyImg
                } className="owner_details_Img" />
              </div>

              <div className="d-flex flex-column justify-center ml-1">
                <p className="hosted_by m-0">Hosted By</p>
                <p className="owner_name m-0">
                  {Object.values(location)[3].users.first_name}{' '}
                  {Object.values(location)[3].users.last_name}
                </p>
              </div>
            </div>

            <div>
              <img
                src={mapIcon}
                onClick={() => handleModalOpen()}
                className="owner_detail_map_button"
              />
            </div>
          </div>

          <hr style={{}} />

          <div className="property_details">
            <div className="property_details_left_side">
              <div className="property_details_div">
                <img src={Home} className="prop_details_home_img" />
                <div className="d-flex flex-column">
                  <span className="prop_type_text">Property Type</span>
                  <span className="prop_bunglow">
                    {Object.values(location)[3].prop_type}
                  </span>
                </div>
              </div>
              <div className="phone_Number_div">
                <img src={phone} className=" prop_details_phone_img" />
                <div className="d-flex flex-column">
                  <span className="cont_number">contact number</span>
                  <span className="Phon_num">
                    {Object.values(location)[3].users.contact_number}
                  </span>
                </div>
              </div>
              <div className="location_div">
                <img src={location} className="prop_details_location_img" />
                <div className="d-flex flex-column">
                  <span className="street_pin">Street/Pincode</span>
                  <span className="street_pin_text">
                    {Object.values(location)[3].pincode}
                  </span>
                </div>
              </div>
            </div>
            <div className="property_details_right_side">
              <div className="property_add_right_side">
                <span className="property_add_title">Property Address</span>
                <span className="property_add_body">
                  {Object.values(location)[3].prop_address}
                </span>
              </div>
              <div className="email_address_right_side">
                <span className="email_aaddress_title">Email Address</span>
                <span className="email_address_body">
                  {Object.values(location)[3].users.email}
                </span>
              </div>
              <div className="landmark_right_side">
                <span className="landmark_title">Landmark</span>
                <span className="landmark_body">
                  {Object.values(location)[3].landmark}{' '}
                </span>
              </div>
            </div>
          </div>

          <hr style={{}} />

          <div className="pet_members">
            <div className="pet">
              <img src={Home} className="prop_details_home_img" />
              <div className="d-flex flex-column">
                <span className="pet_text">Do you have a pet?</span>
                <span className="">
                  {Object.values(location)[3].users.having_pet == true
                    ? 'Yes'
                    : 'No'}
                </span>
              </div>
            </div>

            <div className="members">
              <img src={Home} className="prop_details_home_img" />
              <div className="d-flex flex-column">
                <span className="members_text">
                  No of family members at home
                </span>
                <span className="">{personal?.famaly_members_count}</span>
              </div>
            </div>
          </div>

          <hr style={{}} />

          <span className="famaly_members_list_text mb-1">
            Family Members Information
          </span>
          <div className="famaly_members_list">
            {familyMembers &&
              familyMembers.map(member => {
                return (
                  <div className="members_div">
                    <img src={jhon_doe} className="members_div_img" />
                    <div className="name_relation">
                      <span className="sample_name"> {member.member_name}</span>
                      <span className="relation">{member.member_relation}</span>
                    </div>
                  </div>
                );
              })}
          </div>

          <hr style={{}} />

          <div className="Inputfields">
            <input
              className="form-control start_date"
              type="date"
              onChange={handleStartDateChange}
              value={startDate}
              placeholder="Start Date"
            />
            <input
              className="form-control end_date"
              type="date"
              onChange={handleEndDateChange}
              value={endDate}
              placeholder="End Date"
            />
            <button
              className="btn btn-dark book_button"
              // onClick={isUserActive ? handleBooking : checkBookings}
              onClick={bookProperty}
            >
              Book
            </button>
          </div>
        </div>
        <div className="review_by_guest">
          <span className="review_by_guest_title mt-1 w-100">
            Review By Guest
          </span>

          {allReviews.map((review, key) => (
            <div className="review_by_guest_card p-1 mb-1" key={key}>
              <div className="d-flex">
                <div className="d-flex align-center">
                  <img src={jhon_doe} className="review_card_img" />
                </div>

                <div>
                  <span className="sample_name">
                    {review.users.first_name} {review.users.last_name}
                  </span>
                  <div className="">
                    <ReactStars
                      size={20}
                      value={review.review}
                      isHalf={true}
                      edit={false}
                    />
                  </div>
                </div>
              </div>
              <div className="review_card_body">{review.comment}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="home-slider-main">
        <h1>NearBy Homestays</h1>
        <HomeDetailsSlider nearBy={location.state} />
      </div>
    </div>
  );
};

export default HomeStayDetail;

