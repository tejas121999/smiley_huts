import React from 'react';
import '../layout/css/campaigns.css';
import SheduleCampaigns from '../pages/tables/campaigns table/SheduleCampaigns';
import PreviousCampaigns from '../pages/tables/campaigns table/PreviousCampaigns';
import CampaignsDraft from '../pages/tables/campaigns table/CampaignsDraft';
import { useNavigate } from 'react-router-dom';

const Campaigns = () => {
  const navigate = useNavigate();

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="campaigns">
      <div className="campaigns_tab">
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
              Shedule Campaigns
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
              Campaigns Draft
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
              Previous Campaigns
            </button>
          </li>
          <button
            className="btn btn-green"
            style={{
              position: 'relative',
              left: '32%',
              height: '-webkit-fill-available',
            }}
            onClick={() => navigate('/createCampaigns')}
          >
            Create new Campaigns
          </button>
        </ul>
        <hr style={{ width: '95%', height: '3px', color: 'black' }} />
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <SheduleCampaigns />
          </div>
          <div
            className="tab-pane fade"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            {' '}
            <CampaignsDraft />
          </div>
          <div
            className="tab-pane fade"
            id="contact"
            role="tabpanel"
            aria-labelledby="contact-tab"
          >
            {' '}
            <PreviousCampaigns />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
