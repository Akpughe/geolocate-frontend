import { useState, useEffect } from 'react';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';

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

  const getCoordinate = (options) => {

    getLocationFromGoogle({
      params: {
        place_id: currentPlaceId,
      },
    });
    // console.log('coord', data);

  };

  const handleSearch = async (e) => {
    e.preventDefault();

    // router.push({
    //   pathname: '/',
    //   query: {
    //     q: value,
    //   },
    // });

    const res = await axios.get(
      `http://localhost:4000/api/search-property?q=${value}`
    );

    setProducts(res.data);
    console.log(res.data);
  };

  const handleSelect = (place) => {
    setCurrentPlaceId(place.place_id);

    getCoordinate();
  };

  console.log('placeId', currentPlaceId);

  // useEffect(() => {
  //   getFromGoogle();
  // }, []);

  return (
    <>
      <main>
        <form onSubmit={(e) => handleSearch(e)}>
          <label htmlFor="">
            Search
            <input
              placeholder="Search property"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              // loading={isPlacePredictionsLoading}
            />
          </label>
          <label htmlFor="">
            What location are you looking at?
            <input
              placeholder="Enter location"
              value={location}
              // onChange={(e) => setLocation(e.target.location)}
              onChange={(evt) => {
                getPlacePredictions({
                  input: evt.target.value,
                  componentRestrictions: { country: 'ng' },
                });
                setLocation(evt.target.location);
              }}
              loading={isPlacePredictionsLoading}
            />
            {placePredictions.map((item) => {
              // console.log(item);
              return (
                <ul>
                  <li onClick={() => handleSelect(item)}>
                    {item?.structured_formatting?.main_text}
                  </li>
                </ul>
              );
            })}
          </label>
          <button type="submit">search</button>
        </form>
        <Link href="/create-property">
          <div>+ add property</div>
        </Link>
        {products.length == 0 ? (
          <p>No result</p>
        ) : (
          products?.map((item) => {
            console.log(item);
            return (
              <ul key={item._id}>
                <li>{item?.title}</li>
                <small>{item?.address?.name}</small>
              </ul>
            );
          })
        )}
      </main>
    </>
  );
}
