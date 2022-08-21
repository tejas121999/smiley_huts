import React from 'react';
import BottomComp from '../../components/BottomComp';
import TestimonySlider from '../../components/TestimonySlider';
import UnregistererHeader from '../../components/UnregistererHeader';
import '../layout/css/Aboutus.css';
import TopImg from '../layout/images/AboutUS.png';
import ourStory from '../layout/images/ourStoryImg.png';
import story_img from '../layout/images/SMILEY HUTS USER SIDE ICONS AND IMAGES/restimonial.png';

const AboutUs = () => {
  return (
    <>
      {!localStorage.getItem('user_data') &&
        < UnregistererHeader />
      }

      <div className="AboutUs">
        <div className="card bg-dark text-white">
          <img src={TopImg} className="card-img About_Us_img" alt="..." />
          <div className="card-img-overlay">
            <h5 className="card-title About_us_title">About Us</h5>
          </div>
        </div>
        <div className="Simpe_Homes_Platform">
          <span className="Simpe_Homes_Platform_text">
            What is Smiley Huts?
          </span>
          <p className="Simpe_Homes_Platform_man_text">
            We are a premium membership group and pride ourselves in helping you connect with thousands of verified hosts,
            where you can book affordable stays all across the globe. With a very nominal subscription fee,
            you can chose to spend up to 4 nights 5 days every month at any of your favorite location
          </p>
        </div>
        {/* <div className="about-us-one"> */}
        <div style={{ padding: "100px" }}>
          <div className="What_We_Do">
            <div className="what-text">
              <p className="What_We_Do_head">What We Do</p>
              <p className="What_We_Do_Text">
                We provide a platform to search and book home stays across the globe.
                We offer the service at an extremely nominal monthly subscription -<br />
                1. Register and provide your verification details.<br />
                2. Subscribe to one of our plans. <br />
                3. Be a host and provide your property for stay for only one booking a month.<br />
                4. Travel as a guest across the globe and book stays for free. <br />
              </p>
            </div>
          </div>
          {/* <div className="mission-vision-main"> */}
          <div className="mission_vision">
            <div className="mission">
              <div className="mission-text">
                <p className="mission_title">Our Mission & Vision</p>
                <p className="mission_body">
                  Smiley Huts with its unique sense of travel and place, is devoted towards offering affordable stays across the globe to its members, ensuring great standards of hospitality in an informally elegant atmosphere.<br /><br />
                  Our greatest asset, and the key to our success, is our members. We believe that true world-class status is only achieved when a place combines the traditions of its local community with exceptional personal service.<br /><br />
                  We believe each of us needs a sense of dignity, pride and satisfaction in what we do. Because satisfying our guests depends on the united efforts of many, we are most effective when we work together cooperatively, respecting each other’s contributions and importance.
                </p>
              </div>
            </div>
            <div className="vision">
              <div className="vision-text">
                <p className="vision_title">Our Rules</p>
                <p className="vision_body">
                  1. Since this is a closed circle premium membership group, the host would thank you for keeping the property clean and in the same condition as it was provided to you.<br />
                  2. Providing the room as a host is for a maximum of 4 nights a month (1st to end of the month).<br />
                  3. Booking a room as a guest is for a maximum of 4 nights a month.<br />
                  4. Booking Service can be availed only once a month.<br />
                  5. For a 3 month subscription, booking can be done only 3 times and maximum of 15 days.<br />
                  6. Booking cannot be made before or after the subscription period.<br />
                  7. Only verified members can book and stay at the properties. If you are bringing along another guest with you, the person also needs to be verified and added to your profile.<br />
                  8. Confirming the booking is up to the host and can take up to 24 hours. Please allow enough time for the host to review and approve the booking request.<br />
                  9. If you are a host yourself, you can travel for free. If you are not providing your property, your membership is subject to availability.<br />
                  10.If you are not a host, you would need to pay a fee for every booking, part of which will go to the host.<br />
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
        <div className="about-us-two">
          <div className="We_Help_Our_Members">
            <span className="We_Help_Our_Members_title">
              We Help Our Members
            </span>
            <div className="We_Help_Our_Members_card">
              <div className='zoom'>
                <div className="Find_Home">
                  <p className="Find_Home_text">
                    <div className="circle"></div>
                    Find Home Away From Home
                  </p>
                </div>
              </div>
              <div className='zoom'>
                <div className="Reduce">
                  <p className="Reduce_text">
                    <div className="circle"></div>
                    Stay at No Cost
                  </p>
                </div>
              </div>
              <div className='zoom'>
                <div className="Relation">
                  <p className="Relation_text">
                    <div className="circle"></div>
                    Connect with verified members
                  </p>
                </div>
              </div>

            </div>
          </div>
          <div className="ourStory">
            <div className="ourStoryText">
              <p className="ourStory_title">Our Story</p>
              <p className="ourStory_body">
                Smiley Huts started with a passion to provide a warm and comfortable experience for all travelers across Canada.
                In the world of ever increasing expenses, some dreams of traveling and exploring new places never become reality.
                We imagined a world where people would stay wherever they go happily and the only thing they worry about is taking the best possible photograph and capturing the moment.
                We are very young and extremely motivated to provide the best service in North America.While we look to add more locations each month,
                we also ensure to provide the best experience for every stay. Come join us in this journey.
              </p>
              <button
                className="become-member-button btn-green"
                onClick={() => (window.location.href = '/register')}
                style={{
                  height: '6vh',
                  width: '150px',
                  borderRadius: '5px',
                  border: 'none',
                }}
              >
                Join Us Today
              </button>
            </div>
            <div className="our_story_img">
              <img src={ourStory} className="ourStoryImg" />
            </div>
          </div>
        </div>

        <div style={{ marginTop: "100px", marginBottom: "100px" }}>
          <TestimonySlider title="Success Stories" />
        </div>
        <BottomComp />
      </div>
    </>
  );
};

export default AboutUs;
