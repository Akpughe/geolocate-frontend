import { useState, useEffect } from 'react';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Search from '../components/Search';
import PropertyCard from '../components/PropertyCard';

const GOOGLE_GEOCODE_API = `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyC9WeMRFmFpLH4ED2zp4LG0PfPsI5r1aj0`;

export default function Home() {
  const router = useRouter();
  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesService({
    apiKey: 'AIzaSyC9WeMRFmFpLH4ED2zp4LG0PfPsI5r1aj0',
  });
  const [value, setValue] = useState('');
  const [location, setLocation] = useState('');
  const [products, setProducts] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState('');
  const [currentData, setCurrentData] = useState();
  const [show, setShow] = useState(false);

  const getLocationFromGoogle = async (props) => {
    const { params, onFinish } = props;
    const { data } = await axios.get(
      `${GOOGLE_GEOCODE_API}&${new URLSearchParams(params).toString()}`
    );

    if (typeof onFinish == 'function') {
      onFinish(data);
    }
  };

  const getFromGoogle = () => {
    let longitude;
    let latitude;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        longitude = position.coords.longitude;
        latitude = position.coords.latitude;

        getLocationFromGoogle({
          params: {
            latlng: `${latitude},${longitude}`,
            // place_id: placeId,
          },

          onFinish: (data) => {
            let postalCode;
            let postalCodeComponent = data?.results?.filter(
              (addressComponents) => {
                if (addressComponents.types.includes('postal_code'))
                  return addressComponents;
              }
            )[0];

            if (
              postalCodeComponent &&
              postalCodeComponent?.address_components[0]?.long_name
            ) {
              postalCode = Number(
                postalCodeComponent?.address_components[0]?.long_name
              );
            }

            let locationObject = {
              postalCode: postalCode,
              coordinates: {
                latitude: latitude,
                longitude: longitude,
              },
            };

            console.log('locationObject', locationObject);
            // geocodeDispatch({
            //   type: SET_LOCATION,
            //   payload: locationObject,
            // });
          },
        });
      });
    }
  };

  const getCoordinate = (placeId) => {
    getLocationFromGoogle({
      params: {
        place_id: placeId,
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

  const handleSearch = async (e) => {
    e.preventDefault();
    setShow(false);
    router.push({
      pathname: '/',
      query: {
        q: value,
        longitude: currentLng,
        latitude: currentLat,
      },
    });

    const res = await axios.get(
      `http://localhost:4000/api/search-property?q=${value}&longitude=${currentLng}&latitude=${currentLat}`
    );

    setProducts(res.data);
    console.log(res.data);
  };

  const handleSelect = (place) => {
    setCurrentPlaceId(place.place_id);
    setValue(place.structured_formatting.main_text);
    getCoordinate(place.place_id);
    setShow(false);
  };

  console.log('placeId', currentPlaceId);

  useEffect(() => {
    // getFromGoogle();
    // setPredictions(placePredictions);
  }, []);
  const optionsWrapperClassName =
    'absolute top-14 overflow-auto bg-white rounded-md shadow-dropdown max-h-60 focus:outline-none divide-y divide-secondary divide-opacity-10 w-[16.5375rem]';

  return (
    <>
      <Navbar />
      <div className="relative w-full">
        <Search
          handleSearch={(e) => handleSearch(e)}
          value={value}
          onChange={(evt) => {
            setShow(true);
            getPlacePredictions({
              input: evt.target.value,
              componentRestrictions: { country: 'ng' },
            });
            setValue(evt.target.value);
          }}
          loading={isPlacePredictionsLoading}
        />
        <div className="sm:px-10 px-5">
          <div className={`${optionsWrapperClassName} z-30 bg-gray-100 `}>
            {show &&
              placePredictions.map((item) => {
                console.log(item);
                return (
                  <ul className="py-2 px-3 hover:bg-gray-50">
                    <li
                      onClick={() => handleSelect(item)}
                      className=" cursor-pointer"
                    >
                      {item?.structured_formatting?.main_text}
                    </li>
                  </ul>
                );
              })}
          </div>
        </div>
      </div>

      <div className="sm:px-10 px-5 py-10 w-full">
        <div class="flex w-full space-x-10">
          <div class="card_container sm:m-0 m-auto">
            {/* card here */}
            <div>
              {products.length > 0 ? (
                <h1 className="text-3xl font-bold mb-8">
                  {value} Real Estate {'&'} Homes For Sale
                </h1>
              ) : (
                ''
              )}
              {products.length == 0 ? (
                <p className="text-3xl font-bold">No result </p>
              ) : (
                products?.map((item) => {
                  console.log(item);
                  let id = item._id;
                  // console.log(value);
                  return (
                    <PropertyCard
                      key={item._id}
                      {...products}
                      product={item}
                      id={item._id}
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
