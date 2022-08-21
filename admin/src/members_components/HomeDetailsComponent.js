import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import dummy from '../members_components/layout/images/dummy-img-man.png';
import ReactStars from 'react-rating-stars-component';
import mapImg from '../members_components/layout/images/SMILEY HUTS USER SIDE ICONS AND IMAGES/Group 4798.png';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MapLocationModal from './pages/HomePage/MapLocationModal';

const HomeDetailsComponent = ({ property }) => {
  console.log("home details =================", property);
  const navigate = useNavigate();
  const [mapModalProperties, setMapModalProperties] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const handleSeeDetails = property => {
    navigate('/homeStayDetail', { state: property, replace: true });
    window.scrollTo(0, 0);
  };

  const handleShowPropertyOnMap = property => {
    setMapModalProperties([property]);
    setOpenModal(true);
  };

  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  return (
    <>
      <div className="stay-details-slider-main">
        <MapLocationModal
          show={openModal}
          onHide={handleModalClose}
          searchProperties={mapModalProperties}
        />
        <div className="relative-img">
          {JSON.parse(property.pro_img)?.length > 0 && (
            <img
              style={{ width: '100%' }}
              src={
                process.env.REACT_APP_DEV_URL +
                `/${JSON.parse(property.pro_img)[0]}`
              }
            />
          )}
          <div className="w-100 profile-img">
            {/* <Avatar src={dummy} className="avatar" /> <span>John Doe</span> */}
            <img className="avatar-image" src={property.user_img ? property.user_img : dummy} alt="" />
            <span style={{ display: 'inline-block', color: "black" }}>
              {property.users.first_name + ' ' + property.users.last_name}
            </span>
          </div>
        </div>
        <p>{property.prop_type}</p>
        <h1>{property.prop_address}</h1>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span style={{ marginRight: '5px', fontSize: '14px' }}>
            {property.landmark}
          </span>
          |
          <span style={{ marginLeft: '5px' }}>
            <ReactStars
              size={20}
              value={parseInt(property.review)}
              isHalf={true}
              edit={false}
            />
          </span>
        </div>
        <div
          className="button-container"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '50px',
          }}
        >
          <button
            className="btn-green see-details"
            onClick={() => handleSeeDetails(property)}
          >
            See Details
          </button>
          <img
            src={mapImg}
            onClick={() => handleShowPropertyOnMap(property)}
            className="map_img"
          />
        </div>
      </div>
    </>
  );
};
export default HomeDetailsComponent;
