import './homeDetailsSlider.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import mapImg from '../members_components/layout/images/SMILEY HUTS USER SIDE ICONS AND IMAGES/Group 4798.png';
import { Avatar } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import dummy from '../members_components/layout/images/dummy-img-man.png';
import MapLocationModal from '../members_components/pages/HomePage/MapLocationModal';
import HomeDetailsComponent from '../members_components/HomeDetailsComponent';
// import map_img from '../members_components/layout/images/SMILEY HUTS USER SIDE ICONS AND IMAGES/Group 4810.png';

const HomeDetailsSlider = ({ nearBy }) => {
  const navigate = useNavigate();

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 800, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const lat = nearBy.lat;
  const lon = nearBy.lon;

  const [properties, setProperties] = useState([]);

  const handleSeeDetails = property => {
    navigate('/homeStayDetail', { state: property, replace: true });
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    axios
      .post(
        process.env.REACT_APP_DEV_URL + '/api/property/getNearByProperties',
        {
          lat, lon, prop_type: localStorage.getItem('property-type')
        },
        {
          headers: {
            'x-auth-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDAwMDIwNX0.SvPTaaSc2IRLVlg8OrurDPmqkaNtZnI4DXmn31SmMP8`,
          },
        }
      )
      .then(res => {
        console.log(
          'res=============',
          res
          // JSON.parse(res.data.getAllprop[0].pro_img)
        );
        setProperties(res.data.getNearByProp);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  console.log('===========================', properties);

  const [mapModalProperties, setMapModalProperties] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const handleModalClose = () => setOpenModal(false);

  const handleShowPropertyOnMap = property => {
    setMapModalProperties([property]);
    setOpenModal(true);
  };

  return (
    <>
      {/* <div
        // className="homeStayList_card"
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          height: '600px',
          boxShadow: 'none',
        }}
      > */}
      <Carousel
        showDots={false}
        responsive={responsive}
        autoPlay={false}
        ssr={true}
        infinite={true}
        className="home-stay-slider"
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {properties.map((property, key) => {
          return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <HomeDetailsComponent property={property} />;
            </div>
          );
        })}
      </Carousel>
      {/* </div> */}
      <MapLocationModal
        show={openModal}
        onHide={handleModalClose}
        searchProperties={mapModalProperties}
      />
    </>
  );
};
export default HomeDetailsSlider;
