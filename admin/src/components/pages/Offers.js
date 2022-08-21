import React from 'react';
import '../layout/css/Offers.css';
import OffersTable from '../pages/tables/offers/OffersTable';
import OfferDisable from './tables/offers/OfferDisable';
import OfferEnable from './tables/offers/OfferEnable';
import { useNavigate } from 'react-router-dom';

const Offers = () => {
  const navigate = useNavigate();
  return (
    <div className="Offers">
      <div className="tabClass offers_tab">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target="#home"
                type="button"
                role="tab"
                aria-controls="home"
                aria-selected="true"
              >
                Offers
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#profile"
                type="button"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
              >
                Enabled
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="contact-tab"
                data-bs-toggle="tab"
                data-bs-target="#contact"
                type="button"
                role="tab"
                aria-controls="contact"
                aria-selected="false"
              >
                Disabled
              </button>
            </li>
          </ul>
          <button
            className="btn btn-green"
            style={{
              // position: 'relative',
              // left: '58%',
              height: '-webkit-fill-available',
            }}
            onClick={() => navigate('/createOffe')}
          >
            Create new Offers
          </button>
        </div>
        <hr style={{ width: '95%', height: '3px', color: 'black' }} />
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <OffersTable />
          </div>
          <div
            className="tab-pane fade"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <OfferEnable />{' '}
          </div>
          <div
            className="tab-pane fade"
            id="contact"
            role="tabpanel"
            aria-labelledby="contact-tab"
          >
            {' '}
            <OfferDisable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offers;
