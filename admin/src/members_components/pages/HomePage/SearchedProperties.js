import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import bannerImg from '../../layout/images/SMILEY HUTS USER SIDE ICONS AND IMAGES/Group 4773.png';
import Search from '../../layout/images/SMILEY HUTS USER SIDE ICONS AND IMAGES/Group 4796.png';
import calender from '../../layout/images/SMILEY HUTS USER SIDE ICONS AND IMAGES/calender.png';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import { Label } from '@material-ui/icons';
import { Avatar, Typography } from '@mui/material';
import '../../layout/css/homePage.css';
import HomeStayList from './HomeStayDetail';
import homeImg from '../../layout/images/homeImg.png';
import mapImg from '../../layout/images/SMILEY HUTS USER SIDE ICONS AND IMAGES/Group 4798.png';
import DummyImg from '../../layout/images/dummy_img.png';
import filter from '../../layout/images/SMILEY HUTS USER SIDE ICONS AND IMAGES/Group 4789.png';
import top_bottom_arow from '../../layout/images/SMILEY HUTS USER SIDE ICONS AND IMAGES/Group 4788.png';
import restimonial from '../../layout/images/SMILEY HUTS USER SIDE ICONS AND IMAGES/restimonial.png';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import MapLocationModal from './MapLocationModal';
import ReactStars from 'react-rating-stars-component';
// import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Autocomplete from 'react-google-autocomplete';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import HomeDetailsComponent from '../../HomeDetailsComponent';
import HomeDetailsSlider from '../../../components/HomeDetailsSlider';
// import story_img from "../layout/images/SMILEY HUTS USER SIDE ICONS AND IMAGES/restimonial.png"

const SearchedProperties = () => {
  // const navigate = useNavigate();
  // const location = useLocation();
  // const [properties, setProperties] = useState([]);
  // const [searchProperties, setSearchProperties] = useState([]);
  // const [mapModalProperties, setMapModalProperties] = useState([]);
  // const [openModal, setOpenModal] = useState(false);
  // const [searchText, setSearchText] = useState('');
  // const [propLat, setPropLat] = useState(0.0);
  // const [propLng, setPropLng] = useState(0.0);
  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(new Date());

  // const handleModalOpen = () => setOpenModal(true);
  // const handleModalClose = () => setOpenModal(false);

  // useEffect(() => {
  //   console.log(
  //     'Object.values=============',
  //     Object.values(location)[3]?.searchedProperties
  //   );
  //   if (Object.values(location)[3]?.searchedProperties) {
  //     setSearchProperties(Object.values(location)[3].searchedProperties);
  //   }
  //   // axios.get('http://api.smileyhuts.com/api/property/getAllProperty', { headers: {"x-auth-token" : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDAwMDIwNX0.SvPTaaSc2IRLVlg8OrurDPmqkaNtZnI4DXmn31SmMP8`} })
  //   // .then(res => {
  //   //     console.log("res=============",res.data.getAllprop)
  //   //     setProperties(res.data.getAllprop);
  //   //     setSearchProperties(res.data.getAllprop);
  //   // })
  //   // .catch((error) => {
  //   //     console.log(error)
  //   // });
  // }, []);

  // const handleSearchProperty = e => {
  //   setSearchText(e.target.value);
  // };

  // const itemData = [
  //   {
  //     img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
  //     title: 'Fern',
  //   },
  //   {
  //     img: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f',
  //     title: 'Snacks',
  //   },
  //   {
  //     img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
  //     title: 'Mushrooms',
  //   },
  //   {
  //     img: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383',
  //     title: 'Tower',
  //   },
  //   {
  //     img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
  //     title: 'Sea star',
  //   },
  //   {
  //     img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
  //     title: 'Honey',
  //   },
  //   // {
  //   //     img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
  //   //     title: 'Basketball',
  //   // }
  // ];

  // const handleSeeDetails = property => {
  //   console.log('property----------', property);
  //   navigate('/homeStayDetail', { state: property, replace: true });
  //   window.scrollTo(0, 0);
  // };

  // const handleAutocompleteSelection = place => {
  //   console.log('place----------', place);
  //   console.log('lat----------', place.geometry.location.lat());
  //   console.log('lng----------', place.geometry.location.lng());
  //   setPropLat(place.geometry.location.lat());
  //   setPropLng(place.geometry.location.lng());
  // };

  // const handleSearchPropertySubmit = async () => {
  //   let data = {
  //     lat: propLat,
  //     lon: propLng,
  //     userId: localStorage.getItem('user-id'),
  //     startDate: startDate,
  //     endDate: endDate,
  //   };
  //   const res = await axios.post(
  //     process.env.REACT_APP_DEV_URL + '/api/property/getSearchedProperties',
  //     data,
  //     { headers: { 'x-auth-token': `${localStorage.getItem('access-token')}` } }
  //   );
  //   // console.log('res-------------------------------',res.data);

  //   let myArray = res.data.searchedProperties;
  //   let toRemove = res.data.booked_properties;

  //   const difference = myArray.filter(x => !toRemove.includes(x.property_id));
  //   myArray = myArray.filter(
  //     ar => !toRemove.find(rm => rm.property_id === ar.id)
  //   );

  //   setSearchProperties(myArray);

  //   // const nearByProps = await axios.post('http://api.smileyhuts.com/api/property/getNearByProperties', data,
  //   //         { headers: {"x-auth-token" : `${localStorage.getItem('access-token')}`} })
  //   // console.log('res-------------------------------',nearByProps.data);
  // };

  // const handleShowPropertyOnMap = property => {
  //   console.log('Prop-----------', property);
  //   setMapModalProperties([property]);
  //   setOpenModal(true);
  // };

  // const handleStartDateChange = e => {
  //   setStartDate(e.target.value);
  // };

  // const handleEndDateChange = e => {
  //   setEndDate(e.target.value);
  // };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const property_types_arr = [
    'Propert Type',
    'flat',
    'bunglow',
    'Pet Friendly',
    'Yes',
    // { id: 1, prop_type: 'Flat', value: 'flat'},
    // { id: 2, prop_type: 'Bunglow', value: 'bunglow'},
  ];

  const location = useLocation();
  const propertie = location.state.searchedProperties;
  console.log("==================", location.state);

  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [searchProperties, setSearchProperties] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [propLat, setPropLat] = useState(0.0);
  const [propLng, setPropLng] = useState(0.0);
  const [searchPlaceObj, setSearchPlaceObj] = useState({});
  const [mapModalProperties, setMapModalProperties] = useState([]);
  const [filterValue, setFilterValue] = useState([]);
  const [filteredArr, setFilteredArr] = useState([]);

  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  console.log(searchProperties);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      localStorage.setItem('mylat', JSON.stringify(position.coords.latitude));
      localStorage.setItem('mylon', JSON.stringify(position.coords.longitude));
      // console.log("Latitude is :", position.coords.latitude);
      // console.log("Longitude is :", position.coords.longitude);
    });
  }, []);

  const seeAllPropsMapView = () => {
    // searchProperties.forEach(property => {
    setMapModalProperties(searchProperties);
    // });
    setOpenModal(true);
  };

  console.log('2222222222222222222222222222', location.state);
  // React.useEffect(() => {
  //   let filteredPropArr = properties.filter(function (item) {
  //     // console.log("item--------",item['google_address']);
  //     let propName = JSON.stringify(item['google_address']);
  //     return propName.toLowerCase().includes(searchText.toLowerCase());
  //   });

  //   setSearchProperties(filteredPropArr);
  // }, [searchText]);

  // const handleSearchProperty = e => {
  //   setSearchText(e.target.value);
  // };

  // const handleSeeDetails = property => {
  //   navigate('/homeStayDetail', { state: property, replace: true });
  //   window.scrollTo(0, 0);
  // };

  const handleAutocompleteSelection = place => {
    setPropLat(place.geometry.location.lat());
    setPropLng(place.geometry.location.lng());
    setSearchPlaceObj(place);
  };

  const handleSearchPropertySubmit = async () => {
    // let data = {'lat':propLat, 'lon':propLng }
    let data = {
      lat: propLat,
      lon: propLng,
      userId: localStorage.getItem('user-id'),
    };
    const res = await axios.post(
      process.env.REACT_APP_DEV_URL + '/api/property/getSearchedProperties',
      data,
      {
        headers: {
          'x-auth-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDAwMDIwNX0.SvPTaaSc2IRLVlg8OrurDPmqkaNtZnI4DXmn31SmMP8`,
        },
      }
    );
    console.log(res.data);
    setSearchProperties(res.data.searchedProperties);
    // navigate('/searchedProperties', {
    //   state: { searchedProperties: res.data.searchedProperties },
    // });
  };

  const handleShowPropertyOnMap = property => {
    setMapModalProperties([property]);
    setOpenModal(true);
  };

  const handleFilterChange = e => {
    const {
      target: { value },
    } = e;
    setFilterValue(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };
  console.log(filterValue);

  //FILTER
  const [allProperties, setAllProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);

  useEffect(() => {
    // setSearchProperties([...propertie]);
    const getFilteredProperties = async () => {
      const token = localStorage.getItem('access-token');
      const res = await axios.post(
        process.env.REACT_APP_DEV_URL + '/api/property/filterProperties',
        { userId: localStorage.getItem('user-id') },
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );
      setAllProperties(res.data);
    };
    getFilteredProperties();
  }, []);

  console.log(searchProperties);

  useEffect(() => {
    setSearchProperties([]);
    if (filterValue.length == 0) {
      setSearchProperties(propertie);
    } else {
      filterValue.map(val => {
        const filtered = searchProperties.filter(property => {
          return property.prop_type === val;
        });
        // console.log(filtered);
        setSearchProperties(prev => [...prev, ...filtered]);
        if (filterValue.includes('Yes')) {
          const petFriendly = searchProperties.filter(property => {
            return property.users.having_pet === true;
          });
          setSearchProperties(petFriendly);
        }
      });
    }
  }, [filterValue]);

  // console.log(searchProperties);

  const getNearbyProperties = async () => {
    const token = localStorage.getItem('access-token');
    const coordinates = {
      lat: localStorage.getItem('lat') ? localStorage.getItem('lat') : 45.4252,
      lon: localStorage.getItem('lon') ? localStorage.getItem('lon') : 75.6913,
    };
    const res = await axios.post(
      process.env.REACT_APP_DEV_URL + '/api/property/getNearByProperties',
      coordinates,
      {
        headers: {
          'x-auth-token': token,
        },
      }
    );
    setFilterValue([]);
    console.log(res);
    setSearchProperties(res.data.getNearByProp);
  };

  //PAGINATION
  const [pageNumber, setPageNumber] = useState(0);
  let propertiesPerPage = 6;
  let propertiesVisited = propertiesPerPage * pageNumber;

  let propertiesPageCount = Math.ceil(
    searchProperties.length / propertiesPerPage
  );

  const displayProperties = searchProperties
    .slice(propertiesVisited, propertiesVisited + propertiesPerPage)
    .map(property => {
      return <HomeDetailsComponent property={property} />;
    });

  const propertiesPageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="home_Page">
      <MapLocationModal
        show={openModal}
        onHide={handleModalClose}
        searchProperties={mapModalProperties}
      />
      <div className="card text-white banner_Img">
        <img src={bannerImg} className="card-img" alt="..." />
        <div className="card-img-overlay d-flex flex-column justify-center align-center">
          <div className="">
            <h1 className="card-title bannet_Title">
              Find Your Perfect Home Stay
            </h1>
          </div>
          <div className="Input_field">
            {/*<div className='col-5 input_field'>
                                <input className='form-control input_1' value={searchText} onChange={handleSearchProperty} placeholder='Location' />
                            </div>*/}
            {/*<Autocomplete
                                id="free-solo-demo"
                                freeSolo
                                options={searchProperties.map((option) => option.google_address)}
                                renderInput={(params) => <TextField {...params} label="freeSolo" />}
                              />*/}

            <Autocomplete
              apiKey={'AIzaSyDCiGmEpsQEF8o0RXZtvqTNdTcSekVh7jw'}
              style={{ width: '40%' }}
              onPlaceSelected={place => {
                handleAutocompleteSelection(place);
              }}
              options={{
                types: ['geocode', 'establishment'],
                // types: ['(regions)'],
                componentRestrictions: { country: ['ca', 'us'] },
              }}
              className="form-control input_2"
            />
            {/*<Autocomplete
                                freeSolo
                                id="free-solo-2-demo"
                                disableClearable
                                options={searchProperties.map((option) => option.google_address)}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label={searchText=== "" ? "Location": ""}
                                    InputLabelProps={{shrink: false}}
                                    variant="outlined"
                                    InputProps={{
                                      ...params.InputProps,
                                      type: 'Location',
                                    }}
                                    value={searchText}
                                    onChange={handleSearchProperty}
                                    style={{ backgroundColor:'#fff', borderRadius:'5px'}}
                                  />
                                )}
                              />*/}

            <input
              type="date"
              className="form-control input_2"
              placeholder="Start Date"
            />
            {/*<img src={calender} className="input_2_calender" />*/}

            <input
              type="date"
              className="form-control input_3"
              placeholder="End Date"
            />
            {/*<img src={calender} className="input_3_calender" />*/}
            {/* <div className="col-1 input_field d-flex justify-center"> */}
            <button
              className="search-property"
              onClick={handleSearchPropertySubmit}
            >
              <img src={Search} />
            </button>
          </div>
        </div>
      </div>

      {/* <div className="d-flex flex-column justify-center align-center homestay-listing-outer-div w-100 pb-2"> */}
      <div className="spacer-1"></div>
      <div
        style={{ width: '100%' }}
        className="d-flex flex-column justify-center align-center homestay-listing-outer-div"
      >
        <div className="spacer-1"></div>
        <div className="home_stay_list" style={{ width: '100%' }}>
          <div className="d-flex space-between align-center home-filters-cont mb-1">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <p className="home_stay_list_title">Search Result</p>
              <span style={{ marginLeft: '10px' }}>See map view</span>
              <img
                src={mapImg}
                onClick={seeAllPropsMapView}
                className="map_img pointer"
              />
            </div>

            <div className="home-filters" style={{ display: 'flex' }}>
              <FormControl style={{ minWidth: 150 }}>
                <InputLabel className="home-input" id="multi-filter-label">
                  Filter
                </InputLabel>
                <Select
                  labelId="multi-filter-label"
                  id="multi-filter"
                  multiple
                  value={filterValue}
                  onChange={handleFilterChange}
                  input={<OutlinedInput label="Name" />}
                  MenuProps={MenuProps}
                  style={{ display: 'flex' }}
                >
                  {property_types_arr.map(property => (
                    <MenuItem
                      key={property}
                      value={property}
                      disabled={
                        property == 'Propert Type' || property == 'Pet Friendly'
                          ? true
                          : false
                      }
                    // style={getStyles(property, personName, theme)}
                    >
                      {property == 'Propert Type' ||
                        property == 'Pet Friendly' ? (
                        <h4>{property}</h4>
                      ) : (
                        <div style={{ display: 'flex' }}>
                          <ListItemText primary={property} />
                        </div>
                      )}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/*<button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                  }}
                  className="btn btn-dark filter_button"
                >
                  <img src={filter} style={{ height: '10px' }} />
                  <span>Filter</span>
                </button>*/}
              <button
                onClick={getNearbyProperties}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                }}
                className="btn btn-outline-dark near_to_me"
              >
                <img style={{ height: '10px' }} src={top_bottom_arow} />
                Near To Me
              </button>
            </div>
          </div>

          <div className="homeStayList_card">
            {displayProperties}
            {/* {searchProperties.length > 0 ? (
                searchProperties.map((property, key) => (
                  <HomeDetailsComponent property={property} />
                ))
              ) : (
                <span className="font-size-1_5">No properties found</span>
              )} */}
          </div>
          <ReactPaginate
            previousLabel={'Prev'}
            nextLabel={'Next'}
            pageCount={propertiesPageCount}
            onPageChange={propertiesPageChange}
            containerClassName={'paginationBttns'}
            previousLinkClassName={'previousButton'}
            nextLinkClassName={'nextButton'}
            activeClassName={'paginationActive'}
          />
        </div>
        <div className="spacer-1"></div>
      </div>
      <div className="spacer-1"></div>
      {/* </div> */}

      {/* <div className="min-width">
        <p className="home_stay_list_title">Nearby Homestays</p>
        <HomeDetailsSlider
          nearBy={{
            lat: 45.4252,
            // ? localStorage.getItem('lat')
            // : 45.4252,
            lon: 79.6913,
            // ? localStorage.getItem('lon')
            // : 75.6913,
          }}
        />
      </div> */}
      <div className="home-slider-main" style={{ width: '100%' }}>
        <h1>NearBy Homestays</h1>
        <HomeDetailsSlider
          nearBy={{
            lat: location.state.searchedLat,
            // ? localStorage.getItem('lat')
            // : 45.4252,
            lon: location.state.searchedLon,
            // ? localStorage.getItem('lon')
            // : 75.6913,
          }}
        />
      </div>
    </div>
  );
};

export default SearchedProperties;
