import "../layout/css/subscription_admin.css"
import AddIcon from '@mui/icons-material/Add';
import SubscriptionModal from './Modal/SubscriptionModal';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AllSubscription from './subscription/AllSubscription';
import DeActiveSubscription from './subscription/DeActiveSubscription';
import ActiveSubscription from './subscription/ActiveSubscription';

const Subscription = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const handleModalOpen = () => {
    setOpenModal(true);
  };
  const handleModalClose = () => setOpenModal(false);
  return (
    <div>
      <SubscriptionModal
        show={openModal}
        onHide={handleModalClose}
      />
      <div className="">
        <div className="tabClass subscription_tab">
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
                  All
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
                  Active
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
                  De-Active
                </button>
              </li>
            </ul>
            <button
              className="btn btn-dark"
              style={{
                // position: 'relative',
                // left: '58%',
                height: '-webkit-fill-available',
              }}
              onClick={() => handleModalOpen()}
            >
              Create New
            </button>
          </div>
          <hr style={{ width: '100%', height: '3px', color: 'black' }} />
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <AllSubscription />
            </div>
            <div
              className="tab-pane fade"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <ActiveSubscription />
            </div>
            <div
              className="tab-pane fade"
              id="contact"
              role="tabpanel"
              aria-labelledby="contact-tab"
            >
              {' '}
              <DeActiveSubscription />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;


