import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, useLocation } from "react-router-dom";

const MapMarker = (props) => {
  const [marker, setMarker] = React.useState();

  React.useEffect(() => {
    if (!marker) {
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  React.useEffect(() => {
    if (marker) {
      marker.setOptions(props);
    }
  }, [marker, props]);
  
  return null;
};