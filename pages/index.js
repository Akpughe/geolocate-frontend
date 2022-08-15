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

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

  console.log('placeId', currentPlaceId);

  useEffect(() => {
    // getFromGoogle();
    // setPredictions(placePredictions);
  }, []);

  return (
    <>
      <main>
        <div className="flex">
          <form onSubmit={(e) => handleSearch(e)}>
            <label htmlFor="">
              Search
              <input
                placeholder="Search property"
                value={value}
                // onChange={(e) => setValue(e.target.value)}
                // loading={isPlacePredictionsLoading}
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
            </label>
            <button type="submit">search</button>
          </form>
          <Link href="/create-property">
            <div>+ add property</div>
          </Link>
          {show &&
            placePredictions.map((item) => {
              console.log(item);
              return (
                <ul>
                  <li onClick={() => handleSelect(item)}>
                    {item?.structured_formatting?.main_text}
                  </li>
                </ul>
              );
            })}
        </div>
        {products.length > 0 ? <h1>{value} Real Estate {'&'} Homes For Sale</h1>:''  }
        {products.length == 0 ? (
          <p>No result</p>
        ) : (
          products?.map((item) => {
            console.log(item);
            let id = item._id
            // let firstWord = item.structured_formatting.main_text.split(' ')[0];
            console.log(value);
            return (
              <Link href={`/property/${id}`}>
                <ul className='cursor-pointer' key={item._id}>
                  <li className="font-bold text-xl">{numberWithCommas(item?.price)} naira</li>
                  <li>
                    <small>{item?.address?.name}</small>
                  </li>
                  <li>
                    <small>{Math.round(item?.distance)} miles away from you</small>
                  </li>
                </ul>
              </Link>
            );
          })

        )}
      </main>
    </>
  );
}
