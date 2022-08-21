import axios from 'axios';
import React, { useState } from 'react';
import '../../layout/css/Offers.css';
import { useNavigate } from 'react-router-dom';

const CreateOffers = () => {
  const [offerName, setOfferName] = useState('');
  const [offerDesc, setOfferDesc] = useState('');
  const [offerTerms, setOfferTerms] = useState('');
  const [isOffer, setIsOffer] = useState();
  const [recipients, setRecipients] = useState();
  console.log(offerName, offerDesc, offerTerms, isOffer, recipients);
  const navigate = useNavigate();
  const handleOfferCreate = async e => {
    e.preventDefault();
    const res = await axios.post(
      process.env.REACT_APP_DEV_URL + '/api/offer/create-offer',
      {
        offer_user_id: localStorage.getItem('user-id'),
        offers_name: offerName,
        offer_desc: offerDesc,
        offer_terms: offerTerms,
        isOffer: isOffer,
        isMember: recipients,
      },
      {
        headers: {
          'x-auth-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDA3ODEzM30.FNfBFklZCDm39ZGicsuQuICMXarIhQh7BmUZ9m_8n7U`,
        },
      }
    );
    console.log(res);
    if (res.status == 200) {
      navigate('/offers');
    } else {
      alert('Error creating offer');
    }
  };

  return (
    <div className="Offers">
      <span className="create_offer_text">Create New Offers</span>
      <hr
        style={{
          width: '80%',
          height: '3px',
          color: 'black',
          position: 'absolute',
          top: '16%',
          // left:"15%"
        }}
      />
      <form>
        <div className="row">
          <div className="col-6 create_name">
            <span className="text_name">Name:</span>
            <input
              className="form-control create_name_input"
              value={offerName}
              onChange={e => setOfferName(e.target.value)}
            />
          </div>
          <div className="col-6 create_Desc">
            <span className="text_desc">Description:</span>
            <input
              value={offerDesc}
              onChange={e => setOfferDesc(e.target.value)}
              className="form-control create_Desc_input"
            />
          </div>
          <div className="col-6 create_offer">
            <span className="text_offer">Offers Teams:</span>
            <textarea
              value={offerTerms}
              onChange={e => setOfferTerms(e.target.value)}
              className="form-control create_offer_terms_input"
            />
          </div>
          <div className="col-6 offer_enable_checkbox">
            <span className="offer_enable">Offers:</span>
            <div class="form-check check_enable">
              <label class="form-check-label" for="flexRadioDefault1">
                Enable
              </label>
              <input
                class="form-check-input"
                value={true}
                type="radio"
                onChange={e => setIsOffer(e.target.value)}
                name="isEnabled"
                id="flexRadioDefault1"
              />
            </div>
            <div class="form-check check_disable">
              <label class="form-check-label" for="flexRadioDefault1">
                Disable
              </label>
              <input
                class="form-check-input"
                type="radio"
                onChange={e => setIsOffer(e.target.value)}
                value={false}
                name="isEnabled"
                id="flexRadioDefault1"
              />
            </div>
          </div>
          <div className="col-6 offer_Recipients_checkbox">
            <span className="text_recipients">Offers Recipients:</span>
            <div class="form-check check_Active">
              <label class="form-check-label" for="flexRadioDefault1">
                Active Members
              </label>
              <input
                class="form-check-input"
                type="radio"
                value={1}
                onChange={e => setRecipients(e.target.value)}
                name="recipient"
                id="flexRadioDefault1"
              />
            </div>
            <div class="form-check check_Deactivated">
              <label class="form-check-label" for="flexRadioDefault1">
                Deactivated Members
              </label>
              <input
                class="form-check-input"
                type="radio"
                name="recipient"
                value={0}
                onChange={e => setRecipients(e.target.value)}
                id="flexRadioDefault1"
              />
            </div>
            <div class="form-check check_Custom">
              <label class="form-check-label" for="flexRadioDefault1">
                Custom Selection
              </label>
              <input
                class="form-check-input"
                type="radio"
                name="recipient"
                value={2}
                onChange={e => setRecipients(e.target.value)}
                id="flexRadioDefault1"
              />
            </div>
          </div>
        </div>
        <button
          onClick={handleOfferCreate}
          type="button"
          class="btn btn-green send_offer"
        >
          Send Offer
        </button>
      </form>
    </div>
  );
};

export default CreateOffers;
