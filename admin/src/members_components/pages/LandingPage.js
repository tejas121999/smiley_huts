import React, { useState, useEffect, useRef } from 'react';
import '../layout/css/Landingpage.css';
import restimonial from '../layout/images/SMILEY HUTS USER SIDE ICONS AND IMAGES/restimonial.png';
import SliderComp from '../../components/Slider';
import '../../components/slider.css';
import TopImg from '../layout/images/home page with overlay section 1.png';
import ourStory from '../layout/images/ourStoryImg.png';
import whySmileyHomes from '../layout/images/WHY_SMILEY_HOMES.png';
import UnregistererHeader from '../../components/UnregistererHeader';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import MyVerticallyCenteredModal from '../../components/pages/Modal/ChangePasswordModal';
import Testimony from '../../components/Testimony';
import BottomComp from '../../components/BottomComp';
import TestimonySlider from '../../components/TestimonySlider';
import axios from 'axios';
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import offer_1 from "../layout/images/home like stays.png"
import offer_2 from "../layout/images/affordable rates.png"
import offer_3 from "../layout/images/verified members.png"


const LandingPage = () => {
  const { user } = useAuth();
  let navigate = useNavigate();
  const currency = "USD";
  const reSubscribeRef = useRef(null);
  const [subscription, setSubscription] = useState()
  const [amount, setAmount] = useState("");
  const [newStartDate, setNewStartDate] = useState("");
  const [newEndDate, setNewEndDate] = useState("");
  const [subscriptionData, setSubscriptionData] = useState("");
  const [userData, setUserData] = useState("");

  useEffect(() => {
    if (user == null) {
      console.log('After Logout---------', user);
    } else {
      navigate('/homepage');
    }
    if (user !== null || user !== undefined) {
      // navigate('/homepage');
    }
  }, []);

  useEffect(() => {
    axios
      .post(
        process.env.REACT_APP_DEV_URL + "/api/subscription/getSubscriptionById",
        { subId: 1, userId: localStorage.getItem("user-id") },
        {
          headers: {
            "x-auth-token": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDAwMDIwNX0.SvPTaaSc2IRLVlg8OrurDPmqkaNtZnI4DXmn31SmMP8`,
          },
        }
      )
      .then((res) => {
        console.log("user_data=============", res.data.user_data);
        // console.log('user_subs=============', res.data.user_subs);

        var new_start_date = new Date(res.data.user_data.subscription_end_date); // Now
        new_start_date.setDate(new_start_date.getDate() + 30);

        var new_end_date = new Date(new_start_date);
        new_end_date.setDate(new_end_date.getDate() + 30);

        setSubscriptionData(res.data.user_subs);
        setUserData(res.data.user_data);
        setAmount(res.data.user_subs.price);
        setNewStartDate(new_start_date);
        setNewEndDate(new_end_date);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const loadSubscription = async () => {
    const res = await axios.get(process.env.REACT_APP_DEV_URL +
      '/api/subscription/get_sub', {
      // headers:
      //   { 'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsImlhdCI6MTY1NDAwMDI2MX0.hHPVp4jf2pNcEZoRWB-E8vvlRUey3CX1pDQuHV0QtOA' }
    }
    );
    // console.log("res==============", res)
    setSubscription(res.data.view_plane)
  }

  useEffect(() => {
    loadSubscription();
  }, []);

  const handleOnSubscription = async (paymentData) => {
    // console.log("paymentData------------", paymentData);
    // let data = {
    //   user_id: localStorage.getItem("user-id"),
    //   order_id: paymentData.orderID,
    //   payer_id: paymentData.payerID,
    //   facilitator_access_token: paymentData.facilitatorAccessToken,
    //   payment_source: paymentData.paymentSource,
    //   payment_method: "CREDIT_CARD",
    //   amount: amount,
    //   newEndDate: newEndDate,
    //   newStartDate: newStartDate,
    // };
    // const saveSubData = await axios
    //   .post(
    //     process.env.REACT_APP_DEV_URL + "/api/subscription/onReSubscriptionComplete",
    //     data,
    //     { headers: { "x-auth-token": localStorage.getItem("access-token") } }
    //   )
    //   .then((res) => {
    //     alert("Payment Successful");
    //     console.log("sub save data----------", res);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // navigate('/login');
  };

  const onClickNavigate = () => {
    navigate('/login');

  }
  return (
    <>
      <UnregistererHeader />
      <div className="landing-main">
        <div className="landing-img">
          <img src={TopImg} alt="..." />
          <div className="landing-text landing-section-1-bg">
            <h1>Stay Together, Save Together</h1>
            <p>
              Affordable stays | Verified hosts | Happy Vacation
            </p>
          </div>
        </div>
        <div className="platform">
          <h1>What does Smiley Huts offer?</h1>
          <div className="text">
            <p>
              We are a premium membership group and pride ourselves in helping
              you connect with thousands of verified hosts, where you can book
              affordable stays all across the globe. With a very nominal subscription fee,
              you can chose to spend up to 4 nights 5 days every month at any of your favorite location
            </p>
          </div>
          <button
            className="know-more btn-green"
            onClick={() => navigate('/aboutUs')}
          >
            Know More
          </button>
        </div>
        <div className="offers">
          <h1>What Smiley Huts Offer?</h1>
          <div className="offer-content">
            <div className='zoom'>
              {/* <div className="offer_1 landing-offer-1">
                <h3>Home-like stays</h3>
                <p>
                  Feel at home away from home with clean and comfortable stays
                </p>
              </div> */}
              <div className="card" style={{ width: "20rem" }}>
                <img className=" " src={offer_1} alt="Card image cap" />
                <div className="card-img-overlay card-text-overlay">
                  <h3>Home-like stays</h3>
                  <p>
                    Feel at home away from home with clean and comfortable stays
                  </p>
                </div>
              </div>
            </div>
            <div className='zoom'>
              {/* <div className="offer_2 landing-offer-1">
                <h3>Affordable Rates </h3>
                <p>
                  Nominal monthly subscription fee. Less than the price of a pizza per week
                </p>
              </div> */}
              <div className="card" style={{ width: "20rem" }}>
                <img className="" src={offer_2} alt="Card image cap" />
                <div className="card-img-overlay card-text-overlay">
                  <h3>Affordable Rates </h3>
                  <p>
                    Nominal monthly subscription fee. Less than the price of a pizza per week
                  </p>
                </div>
              </div>
            </div>
            <div className='zoom'>
              {/* <div className="offer_3 landing-offer-1">
                <h3>Verified members</h3>
                <p >
                  All are members are verified. So whether you are hosting or you are a guest, be tension free.
                </p>
              </div> */}
              <div className="card " style={{ width: "20rem" }}>
                <img className="" src={offer_3} alt="Card image cap" />
                <div className="card-img-overlay card-text-overlay">
                  <h3>Verified members</h3>
                  <p >
                    All are members are verified. So whether you are hosting or you are a guest, be tension free.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="why">
          <div className="why-text">
            <div className="text">
              <h1>Why Smiley Huts?</h1>
              <div>
                <p>
                  We are in the process of offering you the best staycation at the most affordable price. <br />This is why you should join us -
                </p>
                <p>1. Free stays for up to 4 nights every month.</p>
                <p>2. Properties as comfortable as your home.</p>
                <p>3. Affordable monthly subscription.</p>
                <p>4. Verified members.</p>
                <p>5. New properties added every month.</p>
              </div>
              <button
                className="know-more btn-green"
                onClick={() => (window.location.href = '/register')}
              >
                Register
              </button>
            </div>
          </div>
          <div className="why-img">
            <img src={whySmileyHomes} alt="why" />
          </div>
        </div>
        <div className="out-locations">
          <div className="locations-text">
            <h1>Our Reach/Locations</h1>
            <p>
              Search for your favorite city and book your stay in minutes.
            </p>
          </div>
        </div>
        <div className="slider-main container">
          <SliderComp />
        </div>
        <div className="offers-sub-plan">
          <h1>Subscription Plan</h1>
          <div className="subscription-plane-content">
            {subscription?.map(subscribe => (
              <>
                {
                  subscribe.isSubscription == true ?
                    (<div className='zoom'>
                      <div className="subscription-div landing-offer-1">
                        <span className='subscription-price'>
                          {subscribe.price}$/&nbsp;{subscribe.select_sub_month}&nbsp;Monthly
                        </span>
                        <p>
                          {subscribe.description}
                        </p>
                        <PayPalScriptProvider
                          options={{
                            "client-id":
                              "AW5pF1We8b1Orr99Ci1jNQDuIxJg_lxtszoZ-qD7MUcxWeXcWOM1Y463UI49nOj6jkDuaiUfeycEb7lj",
                          }}
                        >
                          {/*<PayPalButtons style={{ layout: "horizontal" }} />*/}
                          <PayPalButtons
                            // onClick={onClickNavigate}
                            style={{ layout: "horizontal" }}
                            ref={reSubscribeRef}
                            id="re-subscribe"
                            disabled={false}
                            forceReRender={[subscribe.price, currency, { layout: "horizontal" }]}
                            fundingSource={undefined}
                            locale={"en_ca"}
                            createOrder={(data, actions) => {
                              return actions.order
                                .create({
                                  purchase_units: [
                                    {
                                      amount: {
                                        currency_code: currency,
                                        value: subscribe.price,
                                      },
                                    },
                                  ],
                                })
                                .then((orderId) => {
                                  // Your code here after create the order

                                  return orderId;
                                });
                            }}
                            onApprove={function (data, actions) {
                              return actions.order.capture().then(function () {
                                console.log("data--------------", data);
                                handleOnSubscription(data);
                                // Your code here after capture the order
                              });
                            }}
                          />
                        </PayPalScriptProvider>
                        {/* <button className='btn btn-dark subscription-button'>subscription</button> */}
                      </div>
                    </div>) :
                    null
                }
              </>
            ))}
          </div>
        </div>
        <div style={{ marginTop: "100px", marginBottom: "100px" }}>
          <TestimonySlider title="What Our Members Say" />

        </div>
        <BottomComp />
      </div>
    </>
  );
};

export default LandingPage;

// const [next, setNext] = useState(1);
// const prevText = () => {
//   setNext(next - 1);
// };

// const nextText = () => {
//   setNext(next + 1);
// };

// const [nextLoc, setNextLoc] = useState(1);

// const prevLocation = () => {
//   setNextLoc(nextLoc - 1);
// };

// const nextLocation = () => {
//   setNextLoc(nextLoc + 1);
// };

// console.log(nextLoc);
// return (
//   <div className="LandingPage">
//     <div className="card text-white">
//       <img src={TopImg} className="card-img" alt="..." />
//       <div className="card-img-overlay LandingText">
//         {next == 1 ? (
//           <>
//             <p className="card-text landing_card_text">
//               Stay Together , Save Together
//             </p>
//             <p className="landing_card_body">
//               industry. Lorem Ipsum has been the industry's standard dummy
//             </p>
//           </>
//         ) : next == 2 ? (
//           <>
//             <p className="card-text landing_card_text">Home Like Stay</p>
//             <p className="landing_card_body">
//               industry. Lorem Ipsum has been the industry's standard dummy
//             </p>
//           </>
//         ) : (
//           <>
//             <p className="card-text landing_card_text">
//               Find Home Away From Famaly
//             </p>
//             <p className="landing_card_body">
//               text ever since the 1500s, when an unknown printer took a galley
//             </p>
//           </>
//         )}
//       </div>
//     </div>
//     {/* <button
//       className="carousel-control-prev Previous_button"
//       type="button"
//       data-bs-target="#myCarousel"
//       data-bs-slide="prev"
//       disabled={next == 1}
//       onClick={prevText}
//     >
//       <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//       <span className="visually-hidden">Previous</span>
//     </button> */}
//     {/* <button
//       className="carousel-control-next next_button"
//       type="button"
//       data-bs-target="#myCarousel"
//       data-bs-slide="next"
//       disabled={next == 3}
//       onClick={nextText}
//     >
//       <span className="carousel-control-next-icon" aria-hidden="true"></span>
//       <span className="visually-hidden">Next</span>
//     </button> */}
//     <div className="Smiley_home_Platform">
//       <div>
//         <p className="Smiley_home_Platform_title">Smiley Home Platform</p>
//         <p className="Smiley_home_Platform_body">
//           Lorem Ipsum is simply dummy text of the printing and typesetting
//           industry. Lorem Ipsum has been the industry's standard dummy text
//           ever since the 1500s, when an unknown printer took a galley of type
//           and scrambled it to make a type specimen book.
//         </p>
//         <button className="btn btn-dark Konow_More_button">Konow More</button>
//       </div>
//       <div className="What_Smiley_Homes_Offers">
//         <p className="Smiley_Homes_Offers_text">What Smiley Homes Offers?</p>
//         <div className="Homes_Offers_div">
//           <div className="home_like_stay_1">
//             <p className="home_like_stay_text">
//               Home-Like <br />
//               Stay
//             </p>
//             <p className="home_like_stay_body_text">
//               Lorem Ipsum is simply dummy text of the printing and typesetting
//               industry.
//             </p>
//           </div>
//           <div className="home_like_stay_2">
//             <p className="home_like_stay_text">
//               Home-Like <br />
//               Stay
//             </p>
//             <p className="home_like_stay_body_text">
//               Lorem Ipsum is simply dummy text of the printing and typesetting
//               industry.
//             </p>
//           </div>
//           <div className="home_like_stay_3">
//             <p className="home_like_stay_text">
//               Home-Like <br />
//               Stay
//             </p>
//             <p className="home_like_stay_body_text">
//               Lorem Ipsum is simply dummy text of the printing and typesetting
//               industry.
//             </p>
//           </div>
//         </div>
//       </div>
//       <div className="why_smil_homes">
//         <div className="why_smil_homes_text">
//           <p className="why_smil_homes_title">Why Smiley Homes ?</p>
//           <p className="why_smil_homes_title_text">
//             Lorem Ipsum is simply dummy text of the printing
//             <br /> and typesetting industry
//           </p>
//           <p className="why_smiley_homes_List">
//             <span className="Dash">-</span>typesetting industry{' '}
//           </p>
//           <p className="why_smiley_homes_List">
//             <span className="Dash">-</span>typesetting industry{' '}
//           </p>
//           <p className="why_smiley_homes_List">
//             <span className="Dash">-</span>typesetting industry{' '}
//           </p>
//           <p className="why_smiley_homes_List">
//             <span className="Dash">-</span>typesetting industry{' '}
//           </p>
//           <button className="btn btn-dark Why_Smiley_homes_Register_button">
//             Register
//           </button>
//         </div>
//       </div>
//       <div>
//         <img src={ourStory} className="why_smil_homes_img" />
//       </div>
//     </div>
//     <div className="our_rich_location">
//       <p className="our_rich_location_Title_text">Our Reach / Location</p>
//       <p className="our_rich_location_body_text">
//         Lorem Ipsum is simply dummy text of the printing <br />
//         and typesetting industry
//       </p>
//       <div className="our_rich_location_slider">
//         {nextLoc == 1 ? (
//           <>
//             <div className="our_rich_location_img">1</div>
//             <div className="our_rich_location_img">2</div>
//             <div className="our_rich_location_img">3</div>
//           </>
//         ) : nextLoc == 2 ? (
//           <>
//             <div className="our_rich_location_img">4</div>
//             <div className="our_rich_location_img">5</div>
//             <div className="our_rich_location_img">6</div>
//           </>
//         ) : (
//           <>
//             <div className="our_rich_location_img">7</div>
//             <div className="our_rich_location_img">8</div>
//             <div className="our_rich_location_img">9</div>
//           </>
//         )}
//       </div>
//       <button
//         className="carousel-control-prev Slider_prev"
//         type="button"
//         data-bs-target="#myCarousel"
//         data-bs-slide="prev"
//         disabled={nextLoc == 1}
//         onClick={prevLocation}
//       >
//         <span
//           className="carousel-control-prev-icon"
//           aria-hidden="true"
//         ></span>
//         <span className="visually-hidden">Previous</span>
//       </button>
//       <button
//         className="carousel-control-next Slider_next"
//         type="button"
//         data-bs-target="#myCarousel"
//         data-bs-slide="next"
//         disabled={nextLoc == 3}
//         onClick={nextLocation}
//       >
//         <span
//           className="carousel-control-next-icon"
//           aria-hidden="true"
//         ></span>
//         <span className="visually-hidden">Next</span>
//       </button>
//     </div>
//     <div className="Landing_page_offer_section">
//       <div className="card">
//         <img src={TopImg} className="card-img offer_section_img" />
//         <div className="card-img-overlay offer_section">
//           <p className="offer_top">0$/ Monthly</p>
//           <p className="offer_text">dummy text</p>
//           <p className="offer_text">dummy text</p>
//           <p className="offer_text">dummy text</p>
//           <p className="offer_text">dummy text</p>
//         </div>
//       </div>
//     </div>
//     <div className="Success_story">
//       <div className="Success_Story_Title">What Our Member's Say</div>
//       <div className="Success_Story_card">
//         <div className="story_text">
//           <p className="story_text_body">
//             Lorem Ipsum is simply dummy text of the printing and typesetting
//             industry. Lorem Ipsum has been the industry's standard dummy text
//             ever since the 1500s, when an unknown printer took a galley of
//             type and scrambled it to make a type specimen book. It has
//             survived not only five centuries, but also the leap into
//             electronic typesetting,
//           </p>
//           <p className="story_text_name">Sample Name</p>
//           <p className="story_text_Location">Location</p>
//         </div>
//         <div className="story_img">
//           <img src={story_img} className="story_img_body" />
//         </div>
//       </div>
//     </div>
//   </div>
