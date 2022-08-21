import React, { useEffect, useState } from 'react';
import DropzoneComponent from '../../../layout/DropzoneComponent';
import homeImg from '../../../layout/images/homeImg.png';
import { useRef } from 'react';
import Autocomplete from 'react-google-autocomplete';
import Dropzone from '../PropertyDropzone.js';
import axios from 'axios';

const Property = ({
  property,
  setProperty,
  morePropertyImages,
  setMorePropertyImages,
}) => {
  const fileRef = useRef();
  const [unapprovedImages, setUnapprovedImages] = useState([]);


  useEffect(() => {
    const token = localStorage.getItem('access-token');
    const getUnapprovedPropertyImages = async () => {
      const res = await axios.post(
        process.env.REACT_APP_DEV_URL + '/api/property/getUnApprovedImages',
        { prop_id: property.id },
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );
      console.log(res);
      setUnapprovedImages(res.data);
    };
    getUnapprovedPropertyImages();
  }, []);

  const [propertyInputs, setPropertyInputs] = useState([{ value: '' }]);
  const [propertyImagesArr, setPropertyImagesArr] = useState([]);
  const addNewInput = e => {
    e.preventDefault();
    // let newInputId = newPropertyImg[newPropertyImg.length - 1].id + 1;
    // newPropertyImg.push({ value: '' });
    setPropertyInputs(prev => [...prev, { value: '' }]);
  };
  console.log("propertyInputs", propertyInputs)

  const handleNewPropertyImageUplode = async imgData => {
    const token = localStorage.getItem('access-token');
    // const data = new FormData();
    // data.append('property', imgData[0]);
    // setProfile(prev => ({
    //   ...prev,
    //   pro_img: [...profile.pro_img, imgData[0]],
    // }));

    // propertyImagesArr.push(imgData[0])
    // console.log('============================================', imgData);
    // setPropertyImagesArr(prev => ({...prev, imgData}))
    setMorePropertyImages(oldArr => [...oldArr, imgData[0]]);
    // if (result && result.data && result.data.path) {
    //   setProImages(result.data.path);
    // }
  };


  let arr = [];
  unapprovedImages.forEach(img => {
    JSON.parse(img.prop_img).map(i => {
      arr.push(i);
    });
  });

  console.log("unapprovedImages", unapprovedImages)

  let removeArr = [];

  // useEffect(() => {
  //   unapprovedImages.forEach(img => {
  //     JSON.parse(img.prop_img).map(i => {
  //       setRemoveProperty(prev => [...prev, img])
  //     });
  //   });
  // }, [unapprovedImages])


  const token = localStorage.getItem('access-token')
  const removeImage = () => {
    axios.delete(process.env.REACT_APP_DEV_URL
      + '/api/imgUplod/updateProperty/' + localStorage.getItem('user-id'),

      {
        headers: {
          'x-auth-token': token,
        },
      })
  }



  // let arr2 = JSON.parse(property.pro_img);
  // const totalImages = [...arr, ...arr2];



  return (
    <div>
      <div className="property-main-div ">
        <div className="image-input">
          <div className="display-property-images">

          </div>
          <span>Approve Property Image:-</span>
          <span className="display-property-images">
            {property &&
              JSON.parse(property.pro_img).map(img => {
                return (
                  <img
                    style={{ height: '70px', width: '70px' }}
                    src={
                      process.env.REACT_APP_DEV_URL + '/property_images/' + img
                    }
                    alt=""
                  />
                );
              })}
          </span>
        </div>
        <span>Unapproved Property Images:-</span>
        <span className="pro_images">
          {
            unapprovedImages && arr.map((img) => {
              return (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <img
                    style={{ height: '100%', width: '100%', padding: "10px" }}
                    src={
                      process.env.REACT_APP_DEV_URL +
                      '/new_property_images/' +
                      img
                    }
                    alt=""
                  />
                  <button
                    onClick={e => {
                      // e.preventDefault();
                      // // profile.pro_img.splice(key, 1);
                      // let newArr = [...propertyInputs];
                      // if (newArr.length === 1) {
                      //   return;
                      // } else {
                      //   newArr.splice(key, 1);
                      //   setPropertyInputs(newArr);
                      //   let newArr1 = [...propertyImagesArr];
                      //   newArr1.splice(key, 1);
                      //   setPropertyImagesArr(newArr1);
                      // }
                    }}
                  >
                    remove
                  </button>
                </div>
              )
            })
          }
        </span>
        &nbsp;
        <span className="pro_images">
          {propertyInputs.map((input, index) => {
            return <Dropzone onChangeImage={handleNewPropertyImageUplode} />;
          })}
          <button className="add_img" type="button" onClick={addNewInput}>
            add img
          </button>
        </span>
        <div className="property-imputs col-12">
          {/* <input
            value={property.prop_type}
            onChange={e =>
              setProperty(prev => ({ ...prev, prop_type: e.target.value }))
            }
            // className="form-control property_type"
            placeholder="Property Type"
          /> */}
          <select
            className="form-select Property_Type"
            aria-label="Default select example"
            value={property?.prop_type}
            onChange={e =>
              setProperty(prev => ({ ...prev, prop_type: e.target.value }))
            }
          >
            <option value="" selected disabled>
              Property Type
            </option>
            <option value="1BHK">1 Bedroom</option>
            <option value="2BHK">2 Bedroom</option>
          </select>
        </div>
        <div className="property-imputs col-12">
          {/* <textarea
            // className="form-control property_address_Cslaa"
            value={property.prop_address}
            onChange={e =>
              setProperty(prev => ({
                ...prev,
                prop_address: e.target.value,
              }))
            }
            rows="3"
            cols="50"
            placeholder="Residential Address"
          /> */}
          <Autocomplete
            className="form-control Property_Address"
            apiKey={'AIzaSyDCiGmEpsQEF8o0RXZtvqTNdTcSekVh7jw'}
            defaultValue={property.prop_address}
            onPlaceSelected={place => {
              setProperty(prev => ({
                ...prev,
                prop_address: place.formatted_address,
              }));
              console.log(place);
              // console.log("Places---------------", place);
              // setuserAddress(place.formatted_address);
              setProperty(prev => ({
                ...prev,
                lat: place.geometry.location.lat(),
              }));
              setProperty(prev => ({
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
        </div>
        <div className="property-imputs property-imputs-pin">
          <input
            value={property.street_name}
            onChange={e =>
              setProperty(prev => ({
                ...prev,
                street_name: e.target.value,
              }))
            }
            // className="form-control street_name"
            placeholder="Street name"
          />

          <input
            value={property.pincode}
            onChange={e =>
              setProperty(prev => ({
                ...prev,
                pincode: e.target.value,
              }))
            }
            className="form-control pin_code"
            placeholder="Pin Code"
          />
        </div>
        <div className="property-imputs col-12">
          <input
            value={property.landmark}
            onChange={e =>
              setProperty(prev => ({ ...prev, landmark: e.target.value }))
            }
            // className="form-control property_type"
            placeholder="Land Mark"
          />
        </div>
      </div>
    </div>
  );
};

export default Property;
