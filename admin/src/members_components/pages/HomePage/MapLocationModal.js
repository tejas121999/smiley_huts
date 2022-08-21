import React, { useState, useEffect, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindow,
} from '@react-google-maps/api';

// import './map.css'
// AIzaSyDCiGmEpsQEF8o0RXZtvqTNdTcSekVh7jw

// const center = {
//   lat: 18.572941, lng: 73.883854
// };

const MapLocationModal = props => {
  // const center = { lat: -34.397, lng: 150.644 };
  const zoom = 4;

  const [center, setCenter] = useState({
    lat: localStorage.getItem('lat')
      ? JSON.parse(localStorage.getItem('lat'))
      : 45.424721,
    lng: localStorage.getItem('lat')
      ? JSON.parse(localStorage.getItem('lon'))
      : -75.695,
  });

  useEffect(() => {
    console.log('MapModalPropssss-------------', props);
    // setCenter({ lat: 18.597297, lng: 73.906378 })
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDCiGmEpsQEF8o0RXZtvqTNdTcSekVh7jw',
  });

  const [map, setMap] = React.useState(null);

  const onMarkerLoad = marker => {
    console.log('marker---------------: ', marker);
  };

  const onLoad = React.useCallback(function callback(map) {
    console.log('Map-------', map);
    const bounds = new window.google.maps.LatLngBounds(center);
    map.setZoom(16);
    // map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div>
          <div className="d-flex flex-column">
            <div className="w-100 d-flex justify-end">
              <span onClick={props.onHide} className="pointer mb-1">
                x
              </span>
            </div>

            <div>
              <div>
                {isLoaded ? (
                  <GoogleMap
                    // mapContainerStyle={containerStyle}
                    center={center}
                    // center={{lat: 18.572941, lng: 73.883854}}
                    // center={ props.searchProperties.length > 0 ? {lat: parseFloat(props?.searchProperties[0]?.lat), lng: parseFloat(props?.searchProperties[0]?.lon)} : {lat: 18.572941, lng: 73.883854}}
                    zoom={18}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    id="google_map"
                  >
                    {/*<InfoWindow
 											      position={position}
 											      style={{  }}
 											    >
 											      <div style={{ padding:'0px' }}>
 											        <span style={{ fontSize:'13px',  }}>₹2000</span>
 											      </div>
 											    </InfoWindow>*/}
                    {props.searchProperties?.map((val, idx) => (
                      <InfoWindow
                        // onLoad={onLoad}
                        key={idx}
                        position={{
                          lat: parseFloat(val.lat),
                          lng: parseFloat(val.lon),
                        }}
                        style={{}}
                      >
                        <div style={{ padding: '0px' }}>
                          {/*<span style={{ fontSize:'13px',  }}>₹2000</span>*/}
                        </div>
                      </InfoWindow>
                    ))}

                    {/*<MarkerF
						            position={position}
						          />*/}

                    {/* Child components, such as markers, info windows, etc. */}
                  </GoogleMap>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default MapLocationModal;

{
  /*<MarkerF
// onLoad={onMarkerLoad}
// icon={{
//   path:
//     "M8 12l-4.7023 2.4721.898-5.236L.3916 5.5279l5.2574-.764L8 0l2.3511 4.764 5.2574.7639-3.8043 3.7082.898 5.236z",
//   fillColor: "yellow",
//   fillOpacity: 0.9,
//   scale: 2,
//   strokeColor: "gold",
//   strokeWeight: 2,
// }}
position={{lat: 18.573941, lng: 73.884854}}
/>*/
}
