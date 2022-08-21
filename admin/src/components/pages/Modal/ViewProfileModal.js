import Modal from 'react-bootstrap/Modal';
import dummy from '../../layout/images/dummy_img.png';
import home from '../../../members_components/layout/images/home.png';
import phone from '../../layout/images/phone.png';
import pin from '../../layout/images/location.png';
import '../../layout/css/viewProfileModal.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ViewProfileModal = props => {
  const [propertyData, setPropertyData] = useState();
  const [familyData, setFamilyData] = useState();

  console.log(props.user);
  useEffect(() => {
    const getPropDetails = async () => {
      const res = await axios.post(
        process.env.REACT_APP_DEV_URL + '/api/property/getpropertybyuserid',
        {
          user_id: props.user.id,
        },
        {
          headers: {
            'x-auth-token': localStorage.getItem('access-token'),
          },
        }
      );
      console.log(res);
      setPropertyData(res.data);
    };
    const getFamilyDetails = async () => {
      const res = await axios.post(
        process.env.REACT_APP_DEV_URL + '/api/family/getfamilybyuserid',
        {
          user_id: props.user.id,
        },
        {
          headers: {
            'x-auth-token': localStorage.getItem('access-token'),
          },
        }
      );
      console.log(res);
      setFamilyData(res.data);
    };
    getPropDetails();
    getFamilyDetails();
  }, [props.user]);
  return (
    <>
      {props.user && propertyData && familyData && (
        <Modal
          className="view_profile_modal_main"
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <div style={{ padding: ' 10px' }}>
              <div className="view_profile_header">
                <img
                  src={
                    props.user.user_img
                      ? process.env.REACT_APP_DEV_URL +
                        '/profile_images' +
                        props.user.user_img
                      : dummy
                  }
                  alt=""
                />
                <div>
                  <p style={{ color: 'gray', fontSize: '20px' }}>
                    {propertyData.prop_address}
                  </p>
                  <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
                    {props.user.first_name + ' ' + props.user.last_name}
                  </p>
                </div>
              </div>
              <div className="user_details">
                <div className="left">
                  <div className="prop_cont">
                    <img src={home} alt="" />
                    <div>
                      <p>property type</p>
                      <span>{propertyData.prop_type}</span>
                    </div>
                  </div>
                  <div className="prop_cont">
                    <img src={phone} alt="" />
                    <div>
                      <p>Contact Number</p>
                      <span>{props.user.contact_number}</span>
                    </div>
                  </div>
                  <div className="prop_cont">
                    <img src={pin} alt="" />
                    <div>
                      <p>Pincode</p>
                      <span>{propertyData.pincode}</span>
                    </div>
                  </div>
                </div>
                <div className="right">
                  <div className="prop_cont">
                    <div>
                      <p>property Address</p>
                      <span>{propertyData.prop_address}</span>
                    </div>
                  </div>
                  <div className="prop_cont">
                    <div>
                      <p>Email Addresss</p>
                      <span>{props.user.email}</span>
                    </div>
                  </div>
                  <div className="prop_cont">
                    <div>
                      <p>Landmark</p>
                      <span>{propertyData.landmark}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pet_details">
                <div>
                  <p>Do you have a pet at the property?</p>
                  <span>{props.user.having_pet ? 'Yes' : 'No'}</span>
                </div>
                <div>
                  <p>No of family Members at Home?</p>
                  <span>{props.user.famaly_members_count}</span>
                </div>
              </div>
              <div className="family_information">
                {familyData.map(family => {
                  return (
                    <div className="prop_cont">
                      <img src={dummy} alt="" />
                      <div>
                        <p>{family.member_name}</p>
                        <span>{family.member_relation}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};
export default ViewProfileModal;
