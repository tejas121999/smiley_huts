import React from 'react';
import { Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const NotActiveModal = props => {
  console.log('props------------', props.selectedGuestData);

  const formatDate = dateVal => {
    let dateObj = new Date(dateVal);
    const month = dateObj.toLocaleString('default', { month: 'short' });
    let day = dateObj.getDay();
    if (day < 10) {
      day = '0' + day;
    }
    let dateStr = day + ' ' + month;
    return dateStr;
  };

  const navigate = useNavigate();

  return (
    <div>
      <Modal
        centered
        show={props.show}
        onHide={props.onHide}
        keyboard={false}
        className="not_active_modal"
        backdrop={'static'}
      >
        <Modal.Body>
          <div>
            <span>
              {props.approved &&
                'Your account is not approved yet please wait for your account to be approved'}
              {props.active &&
                'No active subscription. Please subscribe to one of our package.'}
            </span>
            <br />

            {props.active && (
              // <Link to="/subscribe">
              <button
                onClick={navigate()}
                style={{
                  height: '40px',
                  marginTop: '10px',
                  border: 'none',
                  background: 'black',
                  color: 'white',
                }}
              >
                Go to subscription
              </button>
              // </Link>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default NotActiveModal;
