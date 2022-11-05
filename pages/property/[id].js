import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';
import { FaMapMarker } from 'react-icons/fa';
import Link from 'next/link';
import { BiBed, BiBath, BiArea, BiCheckCircle } from 'react-icons/bi';
import { MdArrowBackIosNew, MdFavoriteBorder } from 'react-icons/md';
import { AiOutlineShareAlt } from 'react-icons/ai';
import Navbar from '../../components/Navbar';
import { useRouter } from 'next/router';
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY

const GOOGLE_GEOCODE_API = `https://maps.googleapis.com/maps/api/geocode/json?key=${API_KEY}`;

const Marker = (props) => {
  return <div className="SuperAwesomePin">pin</div>;
};

const AnyReactComponent = ({ text }) => (
  <div className="font-bold text-3xl z-20">
    <FaMapMarker color="red" size={30} />
  </div>
);

const Property = ({ property }) => {
  const router = useRouter();

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
    // <div>
    //   <Link href={`/`}>go back</Link>
    //   <div style={{ height: '500px', width: '500px' }}>
    //     <GoogleMapReact
    //       bootstrapURLKeys={{ key: 'AIzaSyC9WeMRFmFpLH4ED2zp4LG0PfPsI5r1aj0' }}
    //       defaultCenter={defaultProps.center}
    //       defaultZoom={defaultProps.zoom}
    //     >
    //       <AnyReactComponent
    //         lat={newCurrentLat}
    //         lng={newCurrentLng}
    //         //   text="My Marker"
    //       />
    //     </GoogleMapReact>
    //   </div>
    //   <div>
    //     <h1>{numberWithCommas(property.price)} naira</h1>
    //     <small>
    //       {property.bedroom} bd | {property.bathroom} ba | {property.sqft} sqft
    //     </small>
    //   </div>
    //   <div>
    //     <p>{property.address.name}</p>
    //   </div>
    //   <div>
    //     <button>Contact agent</button>
    //   </div>
    // </div>
    <>
      <Navbar />
      <div className="sm:px-20 px-5 mb-10">
        {/* <Li/nk href="/"> */}
        <p
          onClick={() => router.back()}
          className="flex items-center font-semibold cursor-pointer"
        >
          <MdArrowBackIosNew />{' '}
          <span className="text-sm">Back to listings</span>
        </p>
        {/* </Link> */}
      </div>

      <div className="flex w-full justify-between sm:px-20 px-5 mb-10">
        <div>
          <h2 className="text-3xl font-semibold">St. Crystal</h2>
          <p className="text-base font-normal">{property.address.name}</p>
        </div>
        <div className="flex items-end space-x-4">
          <button className="flex items-center space-x-2 px-8 py-2 bg-neutral-300 border border-neutral-900 rounded-md capitalize font-medium text-sm">
            <AiOutlineShareAlt />
            <span>share</span>
          </button>
          <button className="flex items-center space-x-2 px-8 py-2 bg-neutral-300 border border-neutral-900 rounded-md capitalize font-medium text-sm">
            <MdFavoriteBorder />
            <span>favourite</span>
          </button>
        </div>
      </div>

      <div className="flex sm:flex-row flex-col w-full space-x-10 sm:px-20 px-5">
        <div className="flex-1">
          <img
            className="rounded-xl"
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2075&q=80"
            alt=""
          />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold">
            $ {numberWithCommas(property.price)}
          </h3>

          <div className="flex border-t border-b py-4 space-x-10 my-5">
            <div>
              <p className="font-semibold text-sm">Bedrooms</p>
              <p className="flex items-center space-x-2">
                {' '}
                <BiBed /> <span className="text-sm">{property.bedroom}</span>
              </p>
            </div>
            <div>
              <p className="font-semibold text-sm">Bathrooms</p>
              <p className="flex items-center space-x-2">
                {' '}
                <BiBath /> <span className="text-sm">{property.bathroom}</span>
              </p>
            </div>
            <div>
              <p className="font-semibold text-sm">Square Area</p>
              <p className="flex items-center space-x-2">
                {' '}
                <BiArea /> <span className="text-sm">{property.sqft}</span>
              </p>
            </div>
            <div>
              <p className="font-semibold text-sm">Status</p>
              <p className="flex items-center space-x-2">
                {' '}
                <BiCheckCircle /> <span className="text-sm">Active</span>
              </p>
            </div>
          </div>

          <div className="">
            <h3 className="text-xl font-bold">Overview</h3>
            <p className="text-base tracking-wide">{property.description}</p>
          </div>
          <hr />
          <div>Listed by:</div>

          <div className='items-end'>
            <h4 className="text-xl font-bold">Contact agent</h4>
            <p className="text-sm">Sam McDee - Sales Representative</p>
            <a className="text-sm" href="tel:+2349055936918">2349055936918</a>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async ({ params }) => {
  let property;
  // get pro on build
  const { data } = await axios.get(
    `https://geolocate-backend-production-15ee.up.railway.app/api/get-property/${params.id}`
    // `http://localhost:4000/api/get-property/${params.id}`
  );
  property = data;

  // console.log(property);
  // Pass post data to the page via props
  return { props: { property } };
};
export default Property;
