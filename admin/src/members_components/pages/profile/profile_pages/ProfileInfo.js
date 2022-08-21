import React, { useEffect, useRef, useState } from 'react';
import DummyImg from '../../../layout/images/john-doe.jpg';
import EditIcon from '../../../layout/images/SMILEY HUTS USER SIDE ICONS AND IMAGES/Group 4813.png';
import '../../../layout/css/profileInfo.css';
import Famaly from './Famaly';
import Personal from './Personal';
import Property from './Property';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import MyVerticallyCenteredModal from '../../../../components/pages/Modal/ChangePasswordModal';
import { Avatar } from '@material-ui/core';

const ProfileInfo = (props) => {
  const [changePassword, setChangePassword] = useState(false);
  let tabs = ['Personal', 'Property', 'Family'];

  // const [userData, setUserData] = useState({});
  const [personal, setPersonal] = useState();
  const [family, setFamily] = useState([]);
  const [property, setProperty] = useState({});
  const [selectedTab, setSelectedTab] = useState('Personal');

  const [morePropertyImages, setMorePropertyImages] = useState([]);
  console.log(morePropertyImages);
  useEffect(() => {
    const getUserDetails = async () => {
      const id = {
        userId: localStorage.getItem('user-id'),
      };
      const res = await axios.post(
        process.env.REACT_APP_DEV_URL + '/api/auth/getUserProfile',
        id,
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );
      // console.log(res.data);
      setPersonal(res.data.userProfile);
      setFamily(res.data.familyData);
      setProperty(res.data.propertyData);
    };
    getUserDetails();
  }, []);

  const token = localStorage.getItem('access-token');

  const [moreFamilyMembers, setMoreFamilyMmembers] = useState([]);


  const updateUserDetails = async () => {
    const data = new FormData();

    const propertyImgArr = new FormData();
    // for (const image of morePropertyImages) {
    //   propertyImgArr.append('property', image);
    //   // console.log('Images-------------------------', image);
    //   // formData.append("images", image);
    // }
    morePropertyImages.forEach(async img => {
      propertyImgArr.append('property', img);
    });

    for (var key of propertyImgArr.entries()) {
      console.log(key[0] + ', ' + key[1]);
    }

    const user = {
      familyData: { family, moreFamilyMembers },
      propertyData: property,
      userProfile: personal,
    };
    const id = localStorage.getItem('user-id');
    const res = await axios
      .post(process.env.REACT_APP_DEV_URL + '/api/auth/' + id, user, {
        headers: {
          'x-auth-token': token,
        },
      })
      .then(async () => {
        morePropertyImages.length > 0 &&
          (await axios
            .post(
              process.env.REACT_APP_DEV_URL + '/api/property/newPropertyImages',
              {
                userId: localStorage.getItem('user-id'),
                prop_id: property.id,
              },
              {
                headers: {
                  'x-auth-token': token,
                },
              }
            )
            .then(async res => {
              await axios.post(
                process.env.REACT_APP_DEV_URL +
                '/api/imgUplod/newProperty/' +
                res.data.images.id,
                propertyImgArr,
                {
                  headers: {
                    'x-auth-token': token,
                  },
                }
              );
            }).then(async () => {
              const result = await axios.post(
                process.env.REACT_APP_DEV_URL + '/api/imgUplod/user/' + id,
                data,
                { headers: { 'x-auth-token': token } }
              );
            }));
      });

    setSaveModal(true);
  };

  console.log(personal);

  const editProfileRef = useRef(null);

  const editProfileImage = async e => {
    const id = localStorage.getItem('user-id');
    const token = localStorage.getItem('access-token');
    const data = new FormData();
    data.append('user_img', e.target.files[0]);
    // console.log('============================================', imgData);
    const result = await axios.post(
      process.env.REACT_APP_DEV_URL + '/api/imgUplod/profile/' + id,
      data,
      { headers: { 'x-auth-token': token } }
    );
    if (result && result.data && result.data.path) {
      // console.log('============================================', imgData);
      // setProfileImg(result.data.path);
      window.location.reload();
    }
  };

  const [saveModal, setSaveModal] = useState(false);

  const user = localStorage.getItem('user_data')
  // console.log("user ==================", personal.first_name)

  const data = new FormData();

  return (
    <>
      <SaveModal show={saveModal} onHide={() => setSaveModal(false)} />
      <MyVerticallyCenteredModal
        show={changePassword}
        onHide={() => setChangePassword(false)}
      />
      <div className="profile-info-main">
        <div className="profile-info-left">
          <div className="profile-main">
            {personal && (
              <img
                className="profile"
                src={
                  personal.user_img
                    ? process.env.REACT_APP_DEV_URL +
                    '/profile_images/' +
                    personal.user_img
                    : DummyImg
                }
                alt="profileImage"
              />
            )}
            <input
              style={{ display: 'none' }}
              type="file"
              ref={editProfileRef}
              onChange={e => editProfileImage(e)}
            />
            <img
              onClick={() => {
                editProfileRef.current.click();
              }}
              className="edit"
              src={EditIcon}
              alt="Edit"
            />
            <span
              style={{
                color: 'lightgray',
                marginTop: '5px',
                borderBottom: '1px solid lightgray',
                fontWeight: '600',
              }}
            >
              Remove Image
            </span>
          </div>
          <button
            onClick={() => setChangePassword(true)}
            className="btn btn-green change-password"
          >
            Change Password
          </button>
        </div>
        <div className="profile-info-right">
          <div className="tabs">
            <ul>
              {tabs.map(tab => {
                return (
                  <li
                    onClick={() => setSelectedTab(tab)}
                    className={selectedTab === tab && 'selected'}
                  >
                    {tab}
                  </li>
                );
              })}
            </ul>
            <button onClick={updateUserDetails} className="save">
              Save
            </button>
          </div>
          <div className="tab-container">
            {selectedTab === 'Personal' && personal ? (
              <Personal personal={personal} setPersonal={setPersonal} />
            ) : null}
            {selectedTab === 'Property' && (
              <Property
                morePropertyImages={morePropertyImages}
                setMorePropertyImages={setMorePropertyImages}
                property={property}
                setProperty={setProperty}
              />
            )}
            {selectedTab === 'Family' && (
              <Famaly
                families={family}
                moreMembers={moreFamilyMembers}
                setMoreMembers={setMoreFamilyMmembers}
                setFamily={setFamily}
              />
            )}
          </div>
        </div>
      </div>
      <div className='mobile-view-profile-info-main'>
        <div className='mobile-view-profile-info'>
          <div className='mobile-view-profile-info-div'>
            <div className='profile-avatar-name-email'>
              <span>{personal?.first_name}&nbsp;{personal?.last_name}</span>
              <span style={{ fontSize: "20px" }}>{personal?.email}</span>
              <span
                onClick={() => setChangePassword(true)}
                style={{ color: "red" }}
              >
                Change Password
              </span>
            </div>
            {personal && (
              <>
                <input
                  style={{ display: 'none' }}
                  type="file"
                  ref={editProfileRef}
                  onChange={e => editProfileImage(e)}
                />
                <div className='profile-avatar-img'>
                  <img
                    className="profile"
                    src={
                      personal.user_img
                        ? process.env.REACT_APP_DEV_URL +
                        '/profile_images/' +
                        personal.user_img
                        : DummyImg
                    }

                    alt="profileImage"
                  />
                  <div className='edit-icon'>
                    <i class="fas fa-edit"
                      onClick={() => {
                        editProfileRef.current.click();
                      }}></i>
                  </div>

                </div>
              </>
            )}
          </div>
          <div className='mobile-view-profile-info-div-two'>
            <div className="profile-info-right-div-one">
              <div className="tabs">
                <ul>
                  {tabs.map(tab => {
                    return (
                      <li
                        onClick={() => setSelectedTab(tab)}
                        className={selectedTab === tab && 'selected'}
                      >
                        {tab}
                      </li>
                    );
                  })}
                </ul>
                <button onClick={updateUserDetails} className="save">
                  Save
                </button>
              </div>
              <div className="tab-container">
                {selectedTab === 'Personal' && personal ? (
                  <Personal personal={personal} setPersonal={setPersonal} data={data} />
                ) : null}
                {selectedTab === 'Property' && (
                  <Property
                    morePropertyImages={morePropertyImages}
                    setMorePropertyImages={setMorePropertyImages}
                    property={property}
                    setProperty={setProperty}
                  />
                )}
                {selectedTab === 'Family' && (
                  <Famaly
                    families={family}
                    moreMembers={moreFamilyMembers}
                    setMoreMembers={setMoreFamilyMmembers}
                    setFamily={setFamily}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;

const SaveModal = props => {
  return (
    <>
      <Modal
        className="save-modal"
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <p>Your Details have been successfully Updated</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-dark"
            onClick={() => {
              props.onHide();
              window.location.reload();
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
