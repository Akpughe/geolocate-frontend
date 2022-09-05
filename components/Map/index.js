import React, { useState, useRef, useEffect } from 'react';
// import GoogleMapReact from 'google-map-react';
import { FaMapMarker } from 'react-icons/fa';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import Map, { GeolocateControl, Marker } from 'react-map-gl';

mapboxgl.accessToken =
  'pk.eyJ1IjoiZGF2YWsiLCJhIjoiY2w3cGFkcDduMTZ5MTN2cDl2enNiemNqdSJ9.Skp5pb_l37fqZInSFPBZdg';
// const GOOGLE_GEOCODE_API = `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyC9WeMRFmFpLH4ED2zp4LG0PfPsI5r1aj0`;
const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1IjoiZGF2YWsiLCJhIjoiY2w3cGFkcDduMTZ5MTN2cDl2enNiemNqdSJ9.Skp5pb_l37fqZInSFPBZdg';

const TheMap = ({ property }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  const [viewport, setViewport] = useState({});
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setViewport({
        ...viewport,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        zoom: 8.5,
      });
    });
  }, []);

  // console.log('in map', property);
  return (
    <div className="map-container">
      {viewport.latitude && viewport.longitude && (
        <div className="w-full h-[600px]">
          <Map
            mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
            initialViewState={viewport}
            mapStyle="mapbox://styles/mapbox/streets-v11"
          >
            {property?.properties?.map((item) => {
              console.log('in map', item);

              return (
                <>
                  <Marker
                    longitude={item.location.coordinates[0]}
                    latitude={item.location.coordinates[1]}
                    // longitude={viewport.longitude}
                    // latitude={viewport.latitude}
                  />
                </>
              );
            })}
            <GeolocateControl
              positionOptions={{ enableHighAccuracy: true }}
              trackUserLocation={true}
            />
          </Map>
        </div>
      )}
    </div>
  );
};

export default TheMap;
