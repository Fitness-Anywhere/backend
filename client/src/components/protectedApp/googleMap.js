import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { GiPositionMarker } from "react-icons/gi";
import axios from "axios";

const AnyReactComponent = ({ text }) => <div className="icon">{text}</div>;

const googleKey = process.env.REACT_APP_API_KEY_GOOGLE;
console.log(googleKey)

const GoogleMap = ({ location }) => {
  const [center, setCenter] = useState({ lat: 59.95, lng: 30.33 });
  const [zoom] = useState(14);

  useEffect(() => {
    axios
      .get(`https://maps.googleapis.com/maps/api/geocode/json?`, {
        params: {
          address: location,
          key: googleKey,
        },
      })
      .then((res) => {
        const values = res.data.results[0].geometry.location;
        setCenter(values);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [location]);

  return (
    <div style={{ height: "60vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: googleKey }}
        center={center}
        center={center}
        defaultZoom={zoom}
      >
        <AnyReactComponent
          lat={center.lat}
          lng={center.lng}
          text={<GiPositionMarker />}
        />
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMap;
