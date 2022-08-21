import React, { useState, useRef, useEffect } from 'react';
import '../../layout/css/createProfile.css';
import logo_ing from '../../layout/images/login_register_logo.png';
import DropzoneComponrnt from '../../layout/DropzoneComponent';
import homeImg from '../../layout/images/homeImg.png';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Autocomplete from 'react-google-autocomplete';
import Dropzone from './DropzoneProperty';
import UnregistererHeader from '../../../components/UnregistererHeader';
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Switch from "@material-ui/core/Switch";
import { width } from '@mui/system';


const Create_Profile = () => {
  const [nextStape, setNextStape] = useState(1);
  const navigate = useNavigate();

  const [propertyImagesArr, setPropertyImagesArr] = useState([]);

  const [playerNameInputs, setPlayerNameInputs] = useState([
    // {id: 0,imgSrc:"/img/man.png",value: ""},{id: 1,imgSrc:"/img/man.png",value: ""}
    [
      { id: 0, value: '' },
      { id: 0, value: '' },
    ],
  ]);

  const [propertyInputs, setPropertyInputs] = useState([
    // {id: 0,imgSrc:"/img/man.png",value: ""},{id: 1,imgSrc:"/img/man.png",value: ""}
    { id: 0, value: '' },
  ]);

  var newPropertyImg = [...propertyInputs];

  const handlePropertyInput = e => {
    e.preventDefault();
    let newInputId = newPropertyImg[newPropertyImg.length - 1].id + 1;
    newPropertyImg.push({ id: newInputId, value: '' });
    setPropertyInputs(newPropertyImg);
  };

  const [lat, setLat] = useState(0.0);

  const [lng, setLng] = useState(0.0);

  const identityUploadRef = useRef(null);

  const [property, setProperty] = useState('');
  const [propetyType, setPropertyType] = useState('');
  const [userAddress, setuserAddress] = useState('');
  const [street, setStreet] = useState('');
  // console.log("userAddress++++++++++++=================", userAddress.geometry.location.lat())
  // const lat = userAddress?.geometry?.location.lat()
  // const lon = userAddress?.geometry?.location.lon()

  const [pet, setPet] = useState(false);

  const id = localStorage.getItem('user-id');

  const [fNameError, setFnameError] = useState('');
  const [lNameError, setLnameError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [contactNoError, setContactNoError] = useState('');
  const [idProofError, setIdProofError] = useState('');

  const [propTypeError, setPropTypeError] = useState('');
  const [locationError, setLocationError] = useState('');
  const [streetNameError, setStreetNameError] = useState('');
  const [pinCodeError, setPinCodeError] = useState('');
  const [landmarkError, setLandMarkError] = useState('');
  const [propertyImageError, setPropertyImageError] = useState('');

  const [petError, setPetError] = useState('');
  const [noOfMembersError, setNoOfMembersError] = useState('');
  const [familyMembersError, setFamilyMembersError] = useState('');
  const [user_id_proof, setUserIdProof] = useState('');

  // const [noOfMembers,setNoOfMembersError] = useState('');

  const [identityProofFile, setIdentityProofFile] = useState(null);

  const changeNextStape = () => {

    if (nextStape == 1) {
      let errorBit = 0;

      if (
        profile.first_name == null ||
        profile.first_name.trim() === '' ||
        !profile.first_name.match('[a-zA-Z]+')
      ) {
        setFnameError('First Name is required.');
        errorBit++;
      } else {
        setFnameError('');
      }

      if (
        profile.last_name == null ||
        profile.last_name.trim() === '' ||
        !profile.last_name.match('[a-zA-Z]+')
      ) {
        setLnameError('Last Name is required.');
        errorBit++;
      } else {
        setLnameError('');
      }

      // if (profile.address == null || profile.address.trim() === '') {
      //   setAddressError('Address is required.');
      //   errorBit++;
      // } else {
      //   setAddressError('');
      // }

      if (
        profile.contact_number == null ||
        profile.contact_number.trim() === ''
      ) {
        setContactNoError('Contact Number is required.');
        errorBit++;
      } else {
        setContactNoError('');
      }
      if (
        profile.contact_number.length < 10 ||
        profile.contact_number.length > 10 ||
        !profile.contact_number.match('[0-9]*')
      ) {
        setContactNoError('Please enter valid contact number');
        errorBit++;
      } else {
        setContactNoError('');
      }
      // if (user_id_proof == '') {
      //   setIdProofError('Please Upload Identity proof');
      //   errorBit++;
      // } else {
      //   setIdProofError('');
      // }

      // if (
      //   profile.user_id_proof == null ||
      //   profile.user_id_proof.trim() === ''
      // ) {
      //   setIdProofError('Address is required.');
      //   errorBit++;
      // } else {
      //   setIdProofError('');
      // }

      if (errorBit > 0) {
        return false;
      }

      setNextStape(nextStape + 1);
    } else if (nextStape == 2) {
      let errorBit = 0;

      if (propertyData.prop_type == null || propertyData.prop_type.trim() === '') {
        setPropTypeError('Property type is required.');
        errorBit++;
      } else {
        setPropTypeError('');
      }

      if (userAddress == null || Object.keys(userAddress).length <= 0) {
        setLocationError('Location is required.');
        errorBit++;
      } else {
        setLocationError('');
      }

      if (propertyData.pincode == null || propertyData.pincode.trim() === '') {
        setPinCodeError('Pin code is required.');
        errorBit++;
      } else {
        setPinCodeError('');
      }
      if (propertyData.pro_img.length === 0) {
        setPropertyImageError('Property Images are required.');
        errorBit++;
      } else {
        setPropertyImageError('');
      }
      if (propertyData.pincode.length < 3 || propertyData.pincode.match('[^A-Za-z0-9]')) {
        setPinCodeError('Please enter valid Pincode.');
        errorBit++;
      } else {
        setPinCodeError('');
      }
      if (
        propertyData.landmark == null ||
        propertyData.landmark.trim() === ''
        // profile.landmark.match('[^A-Za-z0-9]')
      ) {
        setLandMarkError('Landmark is required.');
        errorBit++;
      } else {
        setLandMarkError('');
      }
      if (errorBit > 0) {
        return false;
      }
      setNextStape(nextStape + 1);
    }
  };

  const backStape = () => {
    setNextStape(nextStape - 1);
  };

  const [profileImg, setProfileImg] = useState('');
  const [propertyImg, setPropertyImg] = useState('');

  const handleSelect = e => {
    setProperty(e.target.value);
  };
  const [isHosted, setIsHost] = React.useState(false);

  const handleIsHost = (event) => {

    if (event.target.checked == false) {
      setIsHost(false);
    } else {
      setIsHost(true);
    }

  };

  const { loginFun, user } = useAuth();
  const [proImages, setProImages] = useState([]);
  const [profile, setProfile] = useState({
    email: localStorage.getItem('email'),
    first_name: '',
    last_name: '',
    address: '',
    user_img: profileImg,
    contact_number: '',
    user_id_proof: '',
    having_pet: '',
    famalyMember_count: '',
    isApproved: 0,
    isActive: 0,
    fam_user_id: id,
    family: [{ member_name: '', member_relation: '', family_member_img: '' }],
    // eslint-disable-next-line no-dupe-keys
    famalyMember_count: '',
  });

  const imageArray = JSON.stringify(propertyImagesArr)

  console.log("isHosted = = == = = = ==", isHosted)
  localStorage.setItem('isHosted', isHosted)
  const [propertyData, setPropertyData] = useState({
    prop_type: "",
    prop_address: "",
    street_name: "",
    pincode: "",
    landmark: "",
    pro_img: propertyImagesArr,
    review: "",
    photo_req: "",
    user_id: id,
    lat: '',
    lon: '',
    isHosted: isHosted
  })

  localStorage.setItem("property-type", propertyData.prop_type)
  const handleChange = e => {
    let { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
    setPropertyData({ ...propertyData, [name]: value })
    // console.log(profile);
  };

  const handlePet = e => {
    setPet(e.target.value);
  };

  let arr = [];


  console.log("property data ================", propertyData)
  const handleSubmit = async e => {
    e.preventDefault();

    let errorBit = 0;

    if (profile.having_pet == null || profile.having_pet === '') {
      setPetError('Have a pet field is required.');
      errorBit++;
    } else {
      setPetError('');
    }

    if (errorBit > 0) {
      return false;
    }
    console.log('Propertyimagesarr-----------', propertyImagesArr);
    const token = localStorage.getItem('access-token');
    try {
      const user_id = localStorage.getItem('user-id');
      const data = new FormData();
      const propertyImgArr = new FormData();
      for (const image of propertyImagesArr) {
        propertyImgArr.append('property', image);
      }
      profile.pro_img = JSON.stringify(propertyData.pro_img);
      const res = axios
        .post(
          process.env.REACT_APP_DEV_URL + '/api/auth/createProfile',
          profile,
          {
            headers: { 'x-auth-token': token },
          }
        )
        .then(async res => {
          Promise.all(
            familyImageArr.map(async (fam, i) => {
              const familyArr = new FormData();
              familyArr.append('famaly', fam);
              return axios.post(
                process.env.REACT_APP_DEV_URL +
                '/api/imgUplod/memberImg/' +
                res.data.resData[i].id,
                familyArr,
                {
                  headers: { 'x-auth-token': token },
                }
              );
            })
          );
        })
        .then(() => {
          axios
            .post(
              process.env.REACT_APP_DEV_URL + '/api/auth/create-property',
              propertyData,
              {
                headers: { 'x-auth-token': token },
              }
            ).then(async res => {
              alert("Successfully Created Profile")
            })
        })

        .then(() => {
          axios.post(
            process.env.REACT_APP_DEV_URL + '/api/setting/createSetting',
            { userId: localStorage.getItem('user-id') },
            {
              headers: { 'x-auth-token': token },
            }
          );
        })
        // console.log(res);

        .then(response => {
          axios
            .post(
              process.env.REACT_APP_DEV_URL + '/api/imgUplod/property/' + id,
              propertyImgArr,
              {
                headers: { 'x-auth-token': token },
              }
            )
            .then(response2 => {
              if (response2.data.message == 'image uploades successfully') {
                navigate('/subscribe', {
                  state: response2.data.userData,
                  replace: true,
                });
              }
            })
        });

    } catch (err) {
      alert(err);
    }
  };

  var newPlayerInputs = [...playerNameInputs];

  const handleAddPlayerInput = e => {
    e.preventDefault();
    let newInputId = newPlayerInputs[newPlayerInputs.length - 1].id + 1;
    newPlayerInputs.push([
      { id: newInputId, value: '' },
      { id: newInputId, value: '' },
    ]);
    setPlayerNameInputs(newPlayerInputs);
  };

  const handleEnterNickNameInputChange = e => {
    let modifiedPlayerInputs = [...playerNameInputs];
    modifiedPlayerInputs[e.target.dataset.id].value = e.target.value;
    setPlayerNameInputs(modifiedPlayerInputs);

  };

  const addFamilyMembers = e => {
    e.preventDefault();
    setProfile(prev => ({
      ...prev,
      family: [
        ...profile.family,
        {
          member_name: '',
          member_relation: '',
          family_member_img: '',
        },
      ],
    }));
  };



  const handleProfileImageUplode = async imgData => {
    const token = localStorage.getItem('access-token');
    const data = new FormData();
    data.append('user_img', imgData[0]);

    const result = await axios.post(
      process.env.REACT_APP_DEV_URL + '/api/imgUplod/profile/' + id,
      data,
      { headers: { 'x-auth-token': token } }
    );
    if (result && result.data && result.data.path) {

      setProfileImg(result.data.path);
    }
  };

  const handlePropertyImageUplode = async imgData => {
    const token = localStorage.getItem('access-token');

    setPropertyData(prev => ({
      ...prev,
      pro_img: [...propertyData.pro_img, imgData[0]],
    }));
    setPropertyImagesArr(oldArr => [...oldArr, imgData[0]]);
  };

  const handleIdentityTrigger = () => {
    identityUploadRef.current.click();
  };

  const familyImgref = useRef([]);

  const handleIdentityUpload = async e => {
    const token = localStorage.getItem('access-token');
    if (!e.target.files[0]) {
      setIdProofError('Please upload ID');
    } else {
      setIdProofError('');
    }
    const data = new FormData();
    data.append('identity', e.target.files[0]);
    const result = await axios.post(
      process.env.REACT_APP_DEV_URL + '/api/imgUplod/user/' + id,
      data,
      { headers: { 'x-auth-token': token } }
    );
    console.log(result);
    setIdentityProofFile(e.target.files[0]);
    setUserIdProof(e.target.files[0].name);
  };


  profile.family.map((fam, i) => {
    // const famRefs = [];
  });

  const [familyImageArr, setFamilyImageArr] = useState([]);
  // let newArr1 = [];
  const handleFamImgUpload = (e, i) => {
    let newArr = [...profile.family];
    newArr[i].family_member_img = e.target.files[0].name;
    setProfile(prev => ({ ...prev, family: newArr }));
    setFamilyImageArr(prev => [...prev, e.target.files[0]]);
  };

  return (
    <div className="">
      <UnregistererHeader />
      <div className="Create_Profile">
        <div className="step_class">
          <div className="steps">
            <img src={logo_ing} className="create_profile_logo" />
            <div
              style={{ display: 'flex', alignItems: 'center' }}
              className="step-single-class"
            >
              <span
                className={
                  nextStape >= 2 ? `profile_dots_active` : `profile_dots`
                }
              ></span>
              <p className="create_profile_step">Personal Information</p>
            </div>
            <div
              style={{ display: 'flex', alignItems: 'center' }}
              className="step-single-class"
            >
              <span
                className={
                  nextStape >= 2 ? `profile_dots_active` : `profile_dots`
                }
              ></span>
              <p className="create_profile_step">Property Details</p>
            </div>
            <div
              className="step-single-class"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <span
                className={
                  nextStape >= 3 ? `profile_dots_active` : `profile_dots`
                }
              ></span>
              <p className="create_profile_step">Famaly Members Details</p>
            </div>

            <div
              className="step-single-class"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <span
                className={
                  nextStape >= 3 ? `profile_dots_active` : `profile_dots`
                }
              ></span>
              <p className="create_profile_step">Complete</p>
            </div>
          </div>
        </div>
        <div className="step_lyout">
          <span className="create_profile_text">Create Your Profile</span>
          <br />
          <span className="create_profile_bottom_text">
            Welcome to Smiley Huts! Go ahead and fill in your profile details below.
          </span>
          <form>
            {nextStape == 1 ? (
              <>
                <div className="row step_1_row">
                  <div
                    style={{
                      //   width: '95%',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <DropzoneComponrnt
                      onChangeImage={handleProfileImageUplode}
                    />
                  </div>
                  <div
                    style={{ margin: '0 auto', display: 'flex', width: '100%' }}
                  >
                    {/* <div style={{ width: '49%' }}> */}
                    <input
                      className="form-control First_Name"
                      placeholder="First Name"
                      type="first_name"
                      name="first_name"
                      value={profile.first_name}
                      onChange={handleChange}
                    />
                    {fNameError !== '' ? (
                      <span className={`errMsg`}>{fNameError}</span>
                    ) : null}
                    {/* </div> */}
                    {/* <div style={{ width: '49%' }}> */}
                    <input
                      className="form-control Last_Name"
                      placeholder="Last Name"
                      type="last_name"
                      name="last_name"
                      value={profile.last_name}
                      onChange={handleChange}
                    />
                    {lNameError !== '' ? (
                      <span className={`errMsg`}>{lNameError}</span>
                    ) : null}
                    {/* </div> */}
                  </div>

                  <div>
                    <input
                      className="form-control Contact_Number"
                      placeholder="Contact Number"
                      type="contact_number"
                      name="contact_number"
                      value={profile.contact_number}
                      onChange={handleChange}
                    />
                    {contactNoError !== '' ? (
                      <span className={`errMsg`}>{contactNoError}</span>
                    ) : null}
                  </div>
                  <div className="col-12">
                    <p style={{ marginTop: '20px', marginBottom: '10px' }}>
                      Identity Proof
                    </p>
                    <input
                      type="file"
                      onChange={e => handleIdentityUpload(e)}
                      // style={{ visibility: 'hidden' }}
                      ref={identityUploadRef}
                      name="identityProof"
                    />
                    {idProofError !== '' ? (
                      <span className={`errMsg`}>{idProofError}</span>
                    ) : null}
                  </div>
                </div>
              </>
            ) : nextStape == 2 ? (
              <>
                <div className="row Step_2_row">
                  <div className="col-12" style={{ padding: 0 }}>
                    <select
                      className="form-select Property_Type"
                      aria-label="Default select example"
                      value={propertyData.prop_type}
                      onChange={e =>
                        setPropertyData(prev => ({
                          ...prev,
                          prop_type: e.target.value,
                        }))
                      }
                    >
                      <option value="" selected disabled>
                        Property Type
                      </option>
                      <option value="1BHK">1 Bedroom Kitchen</option>
                      <option value="2BHK">2 Bedroom Kitchen</option>
                    </select>
                    {propTypeError !== '' ? (
                      <span className={`errMsg`}>{propTypeError}</span>
                    ) : null}
                  </div>

                  <Autocomplete
                    className="form-control Property_Address"
                    apiKey={'AIzaSyDCiGmEpsQEF8o0RXZtvqTNdTcSekVh7jw'}
                    onPlaceSelected={place => {
                      setPropertyData(prev => ({
                        ...prev,
                        prop_address: place.formatted_address,
                      }));
                      console.log(place);
                      // console.log("Places---------------", place);
                      setuserAddress(place.formatted_address);

                      setPropertyData(prev => ({
                        ...prev,
                        lat: place.geometry.location.lat(),
                      }));
                      setPropertyData(prev => ({
                        ...prev,
                        lon: place.geometry.location.lng(),
                      }));
                    }}
                    options={{
                      // types: ["(regions)"],
                      types: ['geocode', 'establishment'],
                      componentRestrictions: { country: ['ca', 'us'] },
                    }}
                  />
                  {locationError !== '' ? (
                    <span className={`errMsg`}>{locationError}</span>
                  ) : null}
                  {/* </div> */}
                  {/* <div className="col-6" style={{ padding: 0 }}> */}

                  {streetNameError !== '' ? (
                    <span className={`errMsg`}>{streetNameError}</span>
                  ) : null}
                  {/* </div> */}
                  <div style={{ display: 'flex', padding: 0, width: '100%' }}>
                    <div style={{ width: '100%' }}>
                      <input
                        className="form-control Street_Name"
                        type="text"
                        placeholder="Address Line 2"
                        value={propertyData.street_name}
                        onChange={e => {
                          console.log('Places---------------', street);
                          setPropertyData(prev => ({
                            ...prev,
                            street_name: e.target.value,
                          }));
                          // setStreet(st);
                        }}
                      />
                    </div>
                    <div style={{ width: '100%' }}>
                      <input
                        className="form-control Pincode"
                        placeholder="Pincode"
                        type="pincode"
                        name="pincode"
                        value={propertyData.pincode}
                        onChange={handleChange}
                      />
                      {pinCodeError !== '' ? (
                        <span className={`errMsg`}>{pinCodeError}</span>
                      ) : null}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: "row", padding: 0, width: '100%' }}>
                    <div style={{ width: "50%" }}>
                      <input
                        className="form-control Landmark"
                        placeholder="Landmark"
                        type="landmark"
                        name="landmark"
                        value={propertyData.landmark}
                        onChange={handleChange}
                      />
                      {landmarkError !== '' ? (
                        <span className={`errMsg`}>{landmarkError}</span>
                      ) : null}
                    </div>
                    <div style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItem: "center",
                      marginTop: "15px",
                      marginLeft: "10px",
                      width: "50%"
                    }}>
                      <FormControl component="fieldset">
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={isHosted}
                                onChange={handleIsHost}
                                name="gilad"
                              />
                            }
                          />
                        </FormGroup>
                        <span style={{ color: "red", fontSize: "12px" }}>Note: You are currently not hosting the property. You need to pay a flat fee for every booking. Also your membership is subject to availability.
                          Switch On Text: Great. Thank you for hosting. You can now book your stays for free!</span>
                      </FormControl>
                    </div>
                  </div>
                  <div className="prop_img_div">
                    {propertyInputs.map((propertyInput, key) => {
                      return (
                        <div key={propertyInput.id} style={{ padding: 0 }}>
                          <Dropzone
                            name={'input' + key}
                            onChangeImage={handlePropertyImageUplode}
                          />
                          <button
                            onClick={e => {
                              e.preventDefault();
                              // profile.pro_img.splice(key, 1);
                              let newArr = [...propertyInputs];
                              if (newArr.length === 1) {
                                return;
                              } else {
                                newArr.splice(key, 1);
                                setPropertyInputs(newArr);
                                let newArr1 = [...propertyImagesArr];
                                newArr1.splice(key, 1);
                                setPropertyImagesArr(newArr1);
                              }
                            }}
                          >
                            remove
                          </button>
                          {propertyImageError !== '' ? (
                            <span className={`errMsg`}>
                              {propertyImageError}
                            </span>
                          ) : null}
                        </div>
                      );
                    })}
                    &nbsp; &nbsp;
                    <button
                      className="add_img"
                      type="button"
                      onClick={handlePropertyInput}
                    >
                      add img
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="row Step_3_row">
                  <div className="col-12">
                    <select
                      className="form-select Property_Type"
                      aria-label="Default select example"
                      onChange={e =>
                        setProfile(prev => ({
                          ...prev,
                          having_pet: e.target.value,
                        }))
                      }
                      value={profile.having_pet}
                    >
                      <option value="" selected disabled>
                        Do You Have Pet At The Property
                      </option>
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </select>
                    {petError !== '' ? (
                      <span className={`errMsg`}>{petError}</span>
                    ) : null}
                  </div>
                  <div className="col-12">
                    <input
                      className="form-control Property_Address"
                      placeholder="Numbers Of Famaly Members?"
                      type="famalyMember_count"
                      name="famalyMember_count"
                      value={profile.famalyMember_count}
                      onChange={handleChange}
                    />

                    {console.log(
                      'profile.famalyMember_count=========',
                      profile.famalyMember_count
                    )}
                    {/* {noOfMembersError !== '' ? (
                      <span className={`errMsg`}>{noOfMembersError}</span>
                    ) : null} */}
                  </div>
                  {profile.famalyMember_count > 0 ? (
                    <div className="add_members">
                      {profile.family.map((playerNameInput, key) => {
                        console.log('playerNameInputis==============', key);
                        return (
                          <div key={key} className="player-input-container">
                            {/* <div className="fam-name"> */}
                            <input
                              className="form-control Relation_name"
                              placeholder="Family Name"
                              type="member_name"
                              name="member_name"
                              onChange={e => {
                                let newArr = [...profile.family];
                                newArr[key].member_name = e.target.value;
                                setProfile(prev => ({
                                  ...prev,
                                  family: newArr,
                                }));
                              }}
                              value={playerNameInput.member_name}
                            />
                            {/* </div> */}
                            {/* <div className="fam-rel"> */}
                            <input
                              className="form-control Relation_name"
                              placeholder="Relation"
                              type="member_relation"
                              name="member_relation"
                              // data-id={`member_relation-${playerNameInput[key].id}`}
                              onChange={e => {
                                let newArr = [...profile.family];
                                newArr[key].member_relation = e.target.value;
                                setProfile(prev => ({
                                  ...prev,
                                  family: newArr,
                                }));
                              }}
                              value={playerNameInput.member_relation}
                            />
                            {/* </div> */}
                            {/* <div> */}

                            <input
                              style={{ display: 'none' }}
                              className={`Add_img ${key}`}
                              type="file"
                              data-index={key}
                              onChange={e => handleFamImgUpload(e, key)}
                              ref={el => (familyImgref.current[key] = el)}
                            />

                            <button
                              style={{
                                width: '150px',
                                height: '50px',
                                marginTop: '25px',
                              }}
                              onClick={e => {
                                e.preventDefault();
                                familyImgref.current[key].click();
                              }}
                            >
                              {profile.family[key].family_member_img
                                ? profile.family[key].family_member_img
                                : 'Upload'}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  ) : null}

                  {/* {familyMembersError !== '' ? (
                    <span className={`errMsg`}>{familyMembersError}</span>
                  ) : null} */}
                  <div className="col-12">
                    {/* <button className='btn btn-light Add_members'  onClick={(e) => handleAddPlayerInput}>+ Add Members</button> */}
                    <button
                      className="btn btn-light Add_members"
                      onClick={addFamilyMembers}
                    >
                      + Add Family Member
                    </button>
                  </div>
                </div>
              </>
            )}

            <div className="btn_class_create_profile ">
              {nextStape != 1 ? (
                <button
                  className="btn btn-lignt"
                  type="button"
                  onClick={() => backStape()}
                >
                  Back Button
                </button>
              ) : null}
              {nextStape == 3 ? (
                <button
                  className="btn btn-success"
                  type="button"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              ) : (
                <button
                  className="btn btn-dark"
                  type="button"
                  onClick={() => changeNextStape()}
                >
                  {nextStape}/3 Next
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create_Profile;
