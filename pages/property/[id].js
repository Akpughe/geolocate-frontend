import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';
import { FaMapMarker } from 'react-icons/fa';
import Link from 'next/link';

const GOOGLE_GEOCODE_API = `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyC9WeMRFmFpLH4ED2zp4LG0PfPsI5r1aj0`;

const Marker = (props) => {
  return <div className="SuperAwesomePin">pin</div>;
};

const AnyReactComponent = ({ text }) => (
  <div className="font-bold text-3xl z-20">
    <FaMapMarker color="red" size={30} />
  </div>
);

const Property = ({ property }) => {
  console.log(property);
  console.log(
    'lat',
    property.location.coordinates[0],
    'lng',
    property.location.coordinates[1]
  );

  const [currentData, setCurrentData] = useState();
  const [zoom, setZoom] = useState(3); // initial zoom
  const [center, setCenter] = useState({
    lat: 0,
    lng: 0,
  });

  const { lat, lng } = center;

  useEffect(() => {
    getCoordinate();
  }, []);

  const getLocationFromGoogle = async (props) => {
    const { params, onFinish } = props;
    const { data } = await axios.get(
      `${GOOGLE_GEOCODE_API}&${new URLSearchParams(params).toString()}`
    );

    if (typeof onFinish == 'function') {
      onFinish(data);
    }
  };

  const getCoordinate = (placeId) => {
    getLocationFromGoogle({
      params: {
        place_id: property?.address?.placeId,
      },
      onFinish: (data) => {
        // if (onFinish) onFinish(data);
        setCurrentData(data);
        // console.log(currentData)
      },
    });
    console.log('coord', currentData);
  };

  let currentLng = currentData?.results[0]?.geometry?.location?.lng;
  let currentLat = currentData?.results[0]?.geometry?.location?.lat;

  let newCurrentLng = property.location.coordinates[0];
  let newCurrentLat = property.location.coordinates[1];

  console.log(currentLng, currentLat);

  const defaultProps = {
    center: {
      lat: newCurrentLat,
      lng: newCurrentLng,
    },
    zoom: 15,
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  return (
    <div>
      <Link href={`/`}>go back</Link>
      <div style={{ height: '500px', width: '500px' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyC9WeMRFmFpLH4ED2zp4LG0PfPsI5r1aj0' }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <AnyReactComponent
            lat={newCurrentLat}
            lng={newCurrentLng}
            //   text="My Marker"
          />
        </GoogleMapReact>
      </div>
      <div>
        <h1>{numberWithCommas(property.price)} naira</h1>
        <small>
          {property.bedroom} bd | {property.bathroom} ba | {property.sqft} sqft
        </small>
      </div>
      <div>
        <p>{property.address.name}</p>
      </div>
      <div>
        <button>Contact agent</button>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  let property;
  // get pro on build
  const { data } = await axios.get(
    `https://geolocate-backend-production.up.railway.app/api/get-property/${params.id}`
  );
  property = data;

  // console.log(property);
  // Pass post data to the page via props
  return { props: { property } };
};
export default Property;
