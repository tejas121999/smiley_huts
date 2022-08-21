import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import '../../../layout/css/personal.css';
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import IdentificationDropzone from '../IdentificationDropzone';

const Personal = ({ setPersonal, personal, data }) => {
  // const [userData, setUserData] = useState(personal);
  // console.log(userData);
  const identityUploadRef = useRef(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const handleIdentityUpload = async e => {
    const id = localStorage.getItem('user-id');
    const token = localStorage.getItem('access-token');
    console.log('handleIdentityUpload data--------------', e.target.files[0]);
    // if (!e.target.files[0]) {
    //   setIdProofError('Please upload ID');
    // } else {
    //   setIdProofError('');
    // }
    // const data = new FormData();
    data.append('identity', e.target.files[0]);


    // console.log(result);

  };

  return (
    <div className="row personal-main">
      <div className="first-last">
        <div className="firstname">
          <input
            value={personal.first_name}
            onChange={e =>
              setPersonal(prev => ({ ...prev, ['first_name']: e.target.value }))
            }
            placeholder="First Name*"
          />
        </div>
        <div className="lastname">
          <input
            value={personal.last_name}
            onChange={e =>
              setPersonal(prev => ({ ...prev, last_name: e.target.value }))
            }
            placeholder="Last Name*"
          />
        </div>
      </div>
      <div className="area">
        {/* <textarea
          value={personal.address}
          onChange={e =>
            setPersonal(prev => ({ ...prev, address: e.target.value }))
          }
          placeholder="Residential Address*"
        /> */}
      </div>
      <div className="contact">
        <input
          value={personal.contact_number}
          onChange={e =>
            setPersonal(prev => ({ ...prev, contact_number: e.target.value }))
          }
          placeholder="Contact Number*"
        />
      </div>
      <div className="identification">
        <p>Identity Proof</p>
        {/* <p>{personal.user_id_proof}</p> */}
        {/* <input
          // value={personal.user_id_proof}
          onChange={e => handleIdentityUpload(e)}
          // value={personal.user_id_proof}
          type="file"
        // onChange={e =>
        //   setPersonal(prev => ({ ...prev, user_id_proof: e.target.value }))
        // }
        // placeholder="Identification Detail / Proof*"
        /> */}
        {/* <img
          style={{ height: '70px', width: '70px' }}
          src={
            process.env.REACT_APP_DEV_URL +
            '/identity_proof/' +
            personal.user_id_proof
          }
          alt=""
        />
        <input
          type="file"
          onChange={e => handleIdentityUpload(e)}
          // style={{ visibility: 'hidden' }}
          ref={identityUploadRef}
          name="identityProof"
        /> */}
        <IdentificationDropzone
          onChangeImage={handleIdentityUpload}
          id_img={personal.user_id_proof}
        />
      </div>
    </div>
  );
};

export default Personal;
